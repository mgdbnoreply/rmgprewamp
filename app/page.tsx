"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GameModal } from "@/components/game-modal"
import { DonationButton } from "@/components/donation-button"
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Trophy,
  Clock,
  Star,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
  Gamepad2,
  Zap,
  Shield,
} from "lucide-react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GameAPI } from "@/services/api"
import type { GameData } from "@/lib/types"
import { publicationsData } from "@/lib/publications-data"
import { cn } from "@/lib/utils"

// Constants
const AUTOPLAY_DELAY = 50
const INTRO_DURATION = 4000
const GAMES_PER_PAGE = 12
const CAROUSEL_SCROLL_ITEMS = 1

// Custom hooks
const useVideoAutoplay = (videoRef: React.RefObject<HTMLVideoElement | null> | React.MutableRefObject<HTMLVideoElement | null>) => {
  const [isVideoReady, setIsVideoReady] = useState(false)
  
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const attemptPlay = async () => {
      video.muted = true
      video.defaultMuted = true
      video.setAttribute('muted', '')
      video.setAttribute('playsinline', '')
      
      try {
        const playPromise = video.play()
        if (playPromise !== undefined) {
          await playPromise
          setIsVideoReady(true)
        }
      } catch (error) {
        console.warn("Video autoplay failed, user interaction may be required:", error)
        // Fallback: Play on first user interaction
        const playOnInteraction = () => {
          video.play().catch(() => {})
          document.removeEventListener('click', playOnInteraction)
          document.removeEventListener('touchstart', playOnInteraction)
        }
        document.addEventListener('click', playOnInteraction, { once: true })
        document.addEventListener('touchstart', playOnInteraction, { once: true })
      }
    }

    const timer = setTimeout(attemptPlay, AUTOPLAY_DELAY)
    return () => clearTimeout(timer)
  }, [videoRef])
  
  return isVideoReady
}

const useIntersectionObserver = (threshold = 0.1) => {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => setIsIntersecting(entry.isIntersecting),
      { threshold }
    )

    observer.observe(element)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, isIntersecting }
}

// Utility functions
const getFirstImage = (pictures: string | undefined): string => {
  if (!pictures) return "/placeholder.jpg"
  const imageUrls = pictures.split(",").map((url) => url.trim())
  return imageUrls[0] || "/placeholder.jpg"
}

const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => func(...args), delay)
  }
}

export default function Page() {
  // State management
  const [games, setGames] = useState<GameData[]>([])
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedHardware, setSelectedHardware] = useState<string>("all")
  const [showIntro, setShowIntro] = useState(true)
  
  // Refs
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  
  // Custom hooks
  const isVideoReady = useVideoAutoplay(videoRef)
  const { ref: aboutRef, isIntersecting: aboutVisible } = useIntersectionObserver(0.3)
  const { ref: gamesRef, isIntersecting: gamesVisible } = useIntersectionObserver(0.2)
  const { ref: discoverRef, isIntersecting: discoverVisible } = useIntersectionObserver(0.2)
  const { ref: researchRef, isIntersecting: researchVisible } = useIntersectionObserver(0.2)

  // Hide intro after delay
  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), INTRO_DURATION)
    return () => clearTimeout(timer)
  }, [])

  // Fetch games data
  useEffect(() => {
    const fetchGames = async () => {
      try {
        setLoading(true)
        const response = await GameAPI.getAllGames()
        if (Array.isArray(response)) {
          setGames(response.slice(0, GAMES_PER_PAGE))
        }
      } catch (error) {
        console.error("Error fetching games:", error)
        // Could show error state to user
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  // Memoized filter options
  const filterOptions = useMemo(() => ({
    categories: ["all", ...Array.from(new Set(games.map(g => g.Genre).filter(Boolean)))],
    years: ["all", ...Array.from(new Set(games.map(g => g.Year).filter(Boolean))).sort((a, b) => b.localeCompare(a))],
    hardware: ["all", ...Array.from(new Set(games.flatMap(g => g.Hardware.split(",")[0].trim()).filter(Boolean)))]
  }), [games])

  // Memoized filtered games with debounced search
  const filteredGames = useMemo(() => {
    return games.filter(game => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = !searchQuery || 
        game.Title.toLowerCase().includes(searchLower) ||
        game.Genre?.toLowerCase().includes(searchLower) ||
        game.Hardware?.toLowerCase().includes(searchLower) ||
        game.Developers?.toLowerCase().includes(searchLower)
      
      const matchesCategory = selectedCategory === "all" || game.Genre?.includes(selectedCategory)
      const matchesYear = selectedYear === "all" || game.Year === selectedYear
      const matchesHardware = selectedHardware === "all" || game.Hardware?.includes(selectedHardware)
      
      return matchesSearch && matchesCategory && matchesYear && matchesHardware
    })
  }, [games, searchQuery, selectedCategory, selectedYear, selectedHardware])

  const activeFiltersCount = useMemo(() => 
    [selectedCategory, selectedYear, selectedHardware].filter(f => f !== "all").length,
    [selectedCategory, selectedYear, selectedHardware]
  )

  // Callbacks
  const resetFilters = useCallback(() => {
    setSelectedCategory("all")
    setSelectedYear("all")
    setSelectedHardware("all")
    setSearchQuery("")
  }, [])

  const openGameModal = useCallback((game: GameData) => {
    setSelectedGame(game)
    setIsModalOpen(true)
  }, [])

  const scrollToSlide = useCallback((direction: "prev" | "next") => {
    const container = carouselRef.current
    if (!container) return
    
    const slideWidth = container.querySelector('[data-carousel-item]')?.clientWidth || 0
    const gap = 24 // 6 * 4px (gap-6)
    const scrollAmount = (slideWidth + gap) * CAROUSEL_SCROLL_ITEMS
    
    if (direction === "prev") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      setCurrentSlide(prev => Math.max(0, prev - CAROUSEL_SCROLL_ITEMS))
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      setCurrentSlide(prev => Math.min(filteredGames.length - 4, prev + CAROUSEL_SCROLL_ITEMS))
    }
  }, [filteredGames.length])

  const debouncedSearch = useMemo(
    () => debounce((value: string) => setSearchQuery(value), 300),
    []
  )

  // Enhanced data
  const discoverItems = [
    { 
      title: "Device of the Week", 
      description: "Explore the iconic Nokia N-Gage and its revolutionary features.", 
      category: "Featured", 
      icon: Trophy, 
      image: "/deviceofweek.jpg",
      color: "from-yellow-500/20 to-orange-500/20",
      href: "/devices/featured"
    },
    { 
      title: "Latest Publications", 
      description: "Fresh research on the impact of Java games on mobile gaming.", 
      category: "New", 
      icon: Zap, 
      image: "/latestpublic.jpg",
      color: "from-blue-500/20 to-purple-500/20",
      href: "/publications/latest"
    },
    { 
      title: "Preservation Status", 
      description: "Currently digitizing Game Boy Advance classics and preserving source code.", 
      category: "Active", 
      icon: Shield, 
      image: "/ongoing.jpeg",
      color: "from-green-500/20 to-teal-500/20",
      href: "/preservation/status"
    },
  ]

  const researchArticles = publicationsData.slice(0, 6).map(pub => ({
    title: pub.title,
    description: pub.description,
    category: pub.topic || "Research",
    image: pub.thumbnail,
    featured: pub.id === 1,
    readTime: "5 min",
    href: `/publications/${pub.id}`
  }))

  return (
    <div className="min-h-screen bg-black text-white">
      <style jsx>{`
        .text-glow { 
          text-shadow: 0 0 20px rgba(239, 68, 68, 0.5), 
                      0 0 40px rgba(239, 68, 68, 0.3),
                      0 0 60px rgba(239, 68, 68, 0.2);
          animation: pulse-glow 2s ease-in-out infinite;
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.8; }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        /* Hide scrollbar for carousel */
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>

      <div className="relative min-h-screen">
        <Header />

        {/* HERO SECTION - Enhanced with better video handling */}
        <section className="h-screen min-h-[700px] flex items-center justify-center mt-20 p-8 relative z-0 overflow-hidden">
          <div className="absolute inset-0 w-full h-full bg-black">
            <video
              ref={videoRef}
              className={cn(
                "w-full h-full object-cover transition-opacity duration-1000",
                isVideoReady ? "opacity-90" : "opacity-0"
              )}
              src="/RMGP.mp4"
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster="/video-poster.jpg"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-transparent to-black/70" />
            {/* Animated overlay for intro */}
            <div className={cn(
              "absolute inset-0 bg-black z-10 transition-all duration-[2000ms] ease-in-out pointer-events-none",
              showIntro ? "opacity-80" : "opacity-0"
            )} />
          </div>
          
          <div className={cn(
            "relative z-20 text-center px-4 transition-all duration-[1500ms] ease-in-out",
            showIntro 
              ? "opacity-100 translate-y-0 scale-100" 
              : "opacity-0 translate-y-10 scale-95 pointer-events-none"
          )}>
            <div className="space-y-2">
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase animate-in fade-in slide-in-from-bottom-10 duration-1000">
                Retro Mobile
              </h1>
              <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase text-red-600 animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-300">
                Gaming Project
              </h2>
            </div>
            <p className="text-xl md:text-2xl text-neutral-300 mt-8 max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-10 duration-1000 delay-700 font-medium">
              Preserving the history of portable play from 1975 to 2008.
            </p>
            
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <ChevronDown className="w-8 h-8 text-white/50" />
          </div>
        </section>

        {/* ABOUT SECTION - Enhanced animations */}
        <section 
          ref={aboutRef as React.RefObject<HTMLElement>}
          className="relative py-20 px-8 z-10 bg-white text-black -mt-8  mb-8 rounded-t-[2rem] overflow-hidden"
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }} />
          </div>
          
          <div className="max-w-[100rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-center relative">
            <div className={cn(
              "relative w-full h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl transition-all duration-1000",
              aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            )}>
              <Image 
                src="/retro-gaming-collection.jpg" 
                alt="Retro Gaming Collection" 
                fill 
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              {/* Floating badge */}
              <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-lg animate-float">
                <span className="flex items-center gap-2 text-sm font-bold text-neutral-900">
                  <Gamepad2 className="w-4 h-4 text-red-600" />
                  10,000+ Games
                </span>
              </div>
            </div>
            
            <div className={cn(
              "transition-all duration-1000 delay-300",
              aboutVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            )}>
              <span className="text-sm font-bold text-neutral-500 uppercase tracking-wider">About RMGP</span>
              <h2 className="text-5xl lg:text-6xl font-black tracking-tighter text-neutral-900 mt-4">
                Preserving<br />Gaming's<br />
                <span className="text-red-600 relative">
                  Mobile Legacy
                  <svg className="absolute -bottom-2 left-0 w-full" height="8" viewBox="0 0 200 8">
                    <path d="M0 4 Q50 0 100 4 T200 4" stroke="#ef4444" strokeWidth="2" fill="none" />
                  </svg>
                </span>
              </h2>
              <p className="text-lg text-neutral-700 mt-6 leading-relaxed">
                The Retro Mobile Gaming Project (RMGP) is a comprehensive digital preservation 
                initiative documenting the evolution of mobile gaming from 1975 to 2008.
              </p>
              <div className="grid grid-cols-3 gap-6 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">33+</div>
                  <div className="text-sm text-neutral-600">Years Covered</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">500+</div>
                  <div className="text-sm text-neutral-600">Devices</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-red-600">10K+</div>
                  <div className="text-sm text-neutral-600">Games</div>
                </div>
              </div>
              <Button 
                asChild 
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-xl text-lg shadow-lg mt-10 group"
              >
                <Link href="/about">
                  Learn More 
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* BROWSE GAMES SECTION - Enhanced filters and animations */}
        <section 
          ref={gamesRef as React.RefObject<HTMLElement>}
          className="relative py-20 px-8 z-20 text-white -mt-8 mb-8 rounded-t-[2rem]" 
          style={{ 
            background: "linear-gradient(135deg, #ef4444 0%, #991b1b 50%, #000000 100%)" 
          }}
        >
          <div className="max-w-[100rem] mx-auto">
            <div className={cn(
              "text-center transition-all duration-1000",
              gamesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                From The <span className="text-red-100">Archive</span>
              </h2>
              <p className="text-lg text-red-100 max-w-3xl mx-auto mt-6">
                A selection of preserved games, devices, and hardware from our collection.
              </p>
            </div>

            {/* Enhanced filter UI */}
            <div className="mt-16">
              <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl">
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-red-100/70 h-5 w-5" />
                    <Input 
                      type="text" 
                      placeholder="Search games, developers, hardware..." 
                      onChange={(e) => debouncedSearch(e.target.value)}
                      className="pl-12 pr-4 py-6 bg-white/10 border-white/20 text-white placeholder:text-red-100/50 rounded-xl focus:border-white/50 focus:ring-2 focus:ring-red-500/50 transition-all"
                      aria-label="Search games"
                    />
                  </div>
                  <Button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)} 
                    className={cn(
                      "bg-white/90 backdrop-blur-sm text-red-600 font-bold px-6 py-6 rounded-xl hover:bg-white transition-all flex items-center gap-2 w-full lg:w-auto",
                      isFilterOpen && "ring-2 ring-white/50"
                    )}
                    aria-expanded={isFilterOpen}
                    aria-controls="filter-panel"
                  >
                    <SlidersHorizontal className="h-5 w-5" />
                    <span>Filter</span>
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                        {activeFiltersCount}
                      </span>
                    )}
                    <ChevronDown className={cn(
                      "h-5 w-5 ml-2 transition-transform",
                      isFilterOpen && "rotate-180"
                    )} />
                  </Button>
                </div>
                
                {/* Animated filter panel */}
                <div 
                  id="filter-panel"
                  className={cn(
                    "grid grid-cols-1 lg:grid-cols-3 gap-4 transition-all duration-500 overflow-hidden",
                    isFilterOpen ? "mt-6 pt-6 border-t border-white/20 max-h-96 opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div>
                    <label className="text-red-100 font-semibold mb-2 block">Genre</label>
                    <select 
                      value={selectedCategory} 
                      onChange={(e) => setSelectedCategory(e.target.value)} 
                      className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                      aria-label="Filter by genre"
                    >
                      {filterOptions.categories.map(cat => (
                        <option key={cat} value={cat} className="bg-black text-white">
                          {cat === "all" ? "All Genres" : cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-red-100 font-semibold mb-2 block">Year</label>
                    <select 
                      value={selectedYear} 
                      onChange={(e) => setSelectedYear(e.target.value)} 
                      className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                      aria-label="Filter by year"
                    >
                      {filterOptions.years.map(year => (
                        <option key={year} value={year} className="bg-black text-white">
                          {year === "all" ? "All Years" : year}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="text-red-100 font-semibold mb-2 block">Hardware</label>
                    <select 
                      value={selectedHardware} 
                      onChange={(e) => setSelectedHardware(e.target.value)} 
                      className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
                      aria-label="Filter by hardware"
                    >
                      {filterOptions.hardware.map(hw => (
                        <option key={hw} value={hw} className="bg-black text-white">
                          {hw === "all" ? "All Hardware" : hw}
                        </option>
                      ))}
                    </select>
                  </div>
                  {activeFiltersCount > 0 && (
                    <div className="lg:col-span-3">
                      <Button 
                        onClick={resetFilters} 
                        variant="ghost" 
                        className="text-white hover:text-red-100 hover:bg-white/10"
                      >
                        <X className="h-4 w-4 mr-2" /> 
                        Clear All Filters
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Games carousel with better controls */}
            <div className="relative mt-16 max-w-[100rem] mx-auto">
              {!loading && filteredGames.length > 4 && (
                <button 
                  onClick={() => scrollToSlide("prev")} 
                  className={cn(
                    "absolute left-0 top-1/2 -translate-y-1/2 z-20",
                    "bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-xl",
                    "hover:bg-white/30 disabled:opacity-30 -translate-x-4 lg:-translate-x-12",
                    "border border-white/20 transition-all duration-300",
                    "hover:scale-110 active:scale-95"
                  )}
                  disabled={currentSlide === 0}
                  aria-label="Previous games"
                >
                  <ChevronLeft className="h-6 w-6 text-white" />
                </button>
              )}
              
              <div 
                ref={carouselRef} 
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
                role="region"
                aria-label="Games carousel"
              >
                {loading ? (
                  // Skeleton loaders with animation
                  [...Array(4)].map((_, i) => (
                    <div 
                      key={i} 
                      className="flex-none w-full sm:w-1/2 lg:w-[calc(25%-18px)]"
                      data-carousel-item
                    >
                      <div className="bg-white/20 backdrop-blur-sm rounded-xl overflow-hidden h-[400px]">
                        <div className="h-64 bg-gradient-to-br from-white/10 to-white/5 animate-pulse" />
                        <div className="p-5 space-y-3">
                          <div className="h-6 bg-white/10 rounded animate-pulse" />
                          <div className="h-4 bg-white/10 rounded w-3/4 animate-pulse" />
                          <div className="h-8 bg-white/10 rounded w-1/2 animate-pulse" />
                        </div>
                      </div>
                    </div>
                  ))
                ) : filteredGames.length === 0 ? (
                  <div className="w-full text-center py-16">
                    <p className="text-white/70 text-lg">No games found matching your filters.</p>
                    <Button 
                      onClick={resetFilters}
                      variant="outline"
                      className="mt-4 border-white/20 text-white hover:bg-white/10"
                    >
                      Clear Filters
                    </Button>
                  </div>
                ) : (
                  filteredGames.map((game, index) => (
                    <div 
                      key={game.Title + index} 
                      className="flex-none w-full sm:w-1/2 lg:w-[calc(25%-18px)] group cursor-pointer"
                      onClick={() => openGameModal(game)}
                      data-carousel-item
                      role="article"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && openGameModal(game)}
                    >
                      <div className="bg-white text-black rounded-xl overflow-hidden h-full flex flex-col shadow-lg transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-red-500/20">
                        <div className="relative w-full h-64 overflow-hidden bg-gradient-to-br from-gray-200 to-gray-300">
                          <Image 
                            src={getFirstImage(game.Pictures)} 
                            alt={game.Title} 
                            fill 
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                            {game.Year}
                          </div>
                        </div>
                        <div className="p-5 flex-grow flex flex-col">
                          <h3 className="font-bold text-xl text-neutral-900 mb-1 line-clamp-2 group-hover:text-red-600 transition-colors">
                            {game.Title}
                          </h3>
                          <p className="text-sm text-neutral-600 mb-4 line-clamp-1">
                            {game.Developers}
                          </p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-xs text-neutral-600 font-medium px-3 py-1.5 bg-neutral-100 rounded-full">
                              {game.Hardware.split(",")[0].trim()}
                            </span>
                            <ArrowRight className="w-5 h-5 text-neutral-400 group-hover:text-red-600 transition-all duration-300 group-hover:translate-x-1" />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
              
              {!loading && filteredGames.length > 4 && (
                <button 
                  onClick={() => scrollToSlide("next")} 
                  className={cn(
                    "absolute right-0 top-1/2 -translate-y-1/2 z-20",
                    "bg-white/20 backdrop-blur-sm rounded-full p-3 shadow-xl",
                    "hover:bg-white/30 disabled:opacity-30 translate-x-4 lg:translate-x-12",
                    "border border-white/20 transition-all duration-300",
                    "hover:scale-110 active:scale-95"
                  )}
                  disabled={currentSlide >= filteredGames.length - 4}
                  aria-label="Next games"
                >
                  <ChevronRight className="h-6 w-6 text-white" />
                </button>
              )}
            </div>
            
            <div className="text-center mt-12">
              <Button 
                asChild 
                className="bg-white/90 text-red-600 hover:bg-white hover:scale-105 font-bold px-10 py-6 rounded-2xl shadow-lg transition-all group"
              >
                <Link href="/archive">
                  View Full Archive
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        
        {/* DISCOVER SECTION - Enhanced cards */}
        <section 
          ref={discoverRef as React.RefObject<HTMLElement>}
          className="relative py-20 px-8 z-30 bg-black text-white -mt-8 mb-8 rounded-t-[2rem]"
        >
          <div className="max-w-[100rem] mx-auto">
            <h2 className={cn(
              "text-5xl md:text-7xl font-black tracking-tighter text-center transition-all duration-1000",
              discoverVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              Discover & <span className="text-red-600 ">Explore</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {discoverItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link 
                    href={item.href}
                    key={index} 
                    className={cn(
                      "block border border-neutral-800 rounded-2xl overflow-hidden",
                      "transition-all duration-500 hover:border-red-600",
                      "hover:shadow-2xl hover:shadow-red-600/20 group relative",
                      "hover:-translate-y-2",
                      discoverVisible 
                        ? "opacity-100 translate-y-0" 
                        : "opacity-0 translate-y-10"
                    )}
                    style={{
                      transitionDelay: `${index * 100}ms`
                    }}
                  >
                    {/* Background gradient effect */}
                    <div className={cn(
                      "absolute inset-0 bg-gradient-to-br opacity-0 group-hover:opacity-20 transition-opacity duration-500 -z-10",
                      item.color
                    )} />
                    
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-900">
                      <Image 
                        src={item.image} 
                        alt={item.title} 
                        fill 
                        className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100"
                        sizes="(max-width: 768px) 100vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                      <div className="absolute bottom-4 left-4">
                        <span className="inline-flex items-center gap-2 text-sm font-bold text-white/90 uppercase tracking-wider bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
                          <Icon className="w-4 h-4" />
                          {item.category}
                        </span>
                      </div>
                    </div>
                    
                    <div className="p-6">
                      <h3 className="text-2xl font-bold text-white group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 mt-3 line-clamp-2">
                        {item.description}
                      </p>
                      <div className="mt-4 flex items-center text-red-600 font-semibold">
                        <span>Explore</span>
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* RESEARCH SECTION - Enhanced cards and layout */}
        <section 
          ref={researchRef as React.RefObject<HTMLElement>}
          className="relative py-20 px-8 z-40 text-black bg-white -mt-8 rounded-t-[2rem]"
        >
          <div className="max-w-[100rem] mx-auto">
            <div className={cn(
              "text-center mb-16 transition-all duration-1000",
              researchVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                Research & Publications
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">
                Latest Research
              </h2>
              <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
                Explore our academic papers, case studies, and in-depth analyses of mobile gaming history
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchArticles.map((article, index) => (
                <Link 
                  href={article.href}
                  key={index} 
                  className={cn(
                    "group transform transition-all duration-500",
                    "hover:-translate-y-3 hover:shadow-2xl cursor-pointer",
                    researchVisible 
                      ? "opacity-100 translate-y-0" 
                      : "opacity-0 translate-y-10"
                  )}
                  style={{
                    transitionDelay: `${index * 100}ms`
                  }}
                >
                  <div className="bg-white border border-neutral-200 hover:border-red-500 rounded-2xl shadow-lg hover:shadow-red-500/20 transition-all h-full flex flex-col overflow-hidden">
                    <div className="relative w-full overflow-hidden h-56 bg-gradient-to-br from-red-50 to-red-100">
                      <Image 
                        src={article.image || "/placeholder.jpg"} 
                        alt={article.title} 
                        fill 
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm text-red-600 px-3 py-1.5 rounded-full font-semibold text-xs shadow-lg">
                        {article.category}
                      </span>
                      {article.featured && (
                        <Star className="absolute top-4 right-4 w-6 h-6 text-yellow-500 fill-yellow-500" />
                      )}
                    </div>
                    
                    <div className="p-6 flex-grow flex flex-col">
                      <h3 className="font-bold text-xl text-neutral-900 group-hover:text-red-600 mb-3 transition-colors line-clamp-2">
                        {article.title}
                      </h3>
                      <p className="text-neutral-600 text-sm line-clamp-3 flex-grow">
                        {article.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between">
                        <span className="flex items-center gap-1.5 text-xs text-neutral-500">
                          <Clock className="w-3 h-3" />
                          {article.readTime} read
                        </span>
                        <span className="flex items-center gap-1 text-sm font-semibold text-red-600 group-hover:gap-3 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center mt-16">
              <Button 
                asChild 
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-6 rounded-2xl text-lg shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all transform hover:scale-105 group"
              >
                <Link href="/publications">
                  View All Research 
                  <ArrowRight className="ml-3 h-5 w-5 transition-transform group-hover:translate-x-2" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <GameModal 
        game={selectedGame} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
      {/* <DonationButton /> */}
    </div>
  )
}

