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
  Calendar,
  HardDrive,
  Wifi,
  Filter,
} from "lucide-react"
import { useState, useEffect, useRef, useCallback, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GameAPI } from "@/services/api"
import type { GameData } from "@/lib/types"
import { publicationsData } from "@/lib/publications-data"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ScrollArea } from "@/components/ui/scroll-area"

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

export default function Page() {
  // State management
  const [games, setGames] = useState<GameData[]>([])
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(true)
  
  // Advanced filter states (matching database page)
  const [yearRange, setYearRange] = useState<[number, number]>([1975, 2008])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedHardware, setSelectedHardware] = useState<string>("all")
  const [selectedConnectivity, setSelectedConnectivity] = useState<string>("all")
  
  const [showIntro, setShowIntro] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12
  
  // Refs
  const carouselRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const aboutSectionRef = useRef<HTMLElement>(null)
  
  // Custom hooks
  const isVideoReady = useVideoAutoplay(videoRef)
  const { ref: aboutRef, isIntersecting: aboutVisible } = useIntersectionObserver(0.3)
  const { ref: gamesRef, isIntersecting: gamesVisible } = useIntersectionObserver(0.2)
  const { ref: discoverRef, isIntersecting: discoverVisible } = useIntersectionObserver(0.2)

  const scrollToAbout = useCallback(() => {
    aboutRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [])

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
          setGames(response)
          // Initialize year range based on data
          const years = response.map(g => parseInt(g.Year)).filter(y => !isNaN(y))
          if (years.length > 0) {
            const minYear = Math.min(...years)
            const maxYear = Math.max(...years)
            setYearRange([minYear, maxYear])
          }
        }
      } catch (error) {
        console.error("Error fetching games:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  // Derive unique filter options (matching database page)
  const allGenres = useMemo(() => 
    Array.from(new Set(games.flatMap(g => g.Genre?.split(",").map(s => s.trim()) || []))).filter(Boolean).sort(),
    [games]
  )

  const hardwareOptions = useMemo(() => 
    Array.from(new Set(games.map(g => g.Hardware?.split(",")[0].trim()).filter(Boolean))).sort(),
    [games]
  )

  const connectivityOptions = useMemo(() => 
    Array.from(new Set(games.map(g => g.Connectivity?.trim()).filter(Boolean))).sort(),
    [games]
  )

  const minGameYear = useMemo(() => {
    const years = games.map(g => parseInt(g.Year)).filter(y => !isNaN(y))
    return years.length ? Math.min(...years) : 1975
  }, [games])

  const maxGameYear = useMemo(() => {
    const years = games.map(g => parseInt(g.Year)).filter(y => !isNaN(y))
    return years.length ? Math.max(...years) : 2008
  }, [games])

  // Filtering Logic (matching database page)
  const filteredGames = useMemo(() => {
    return games.filter((game) => {
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch =
        game.Title.toLowerCase().includes(searchLower) ||
        game.Developers.toLowerCase().includes(searchLower)
      
      const gameYear = parseInt(game.Year)
      const matchesYear = !isNaN(gameYear) ? (gameYear >= yearRange[0] && gameYear <= yearRange[1]) : true
      
      const matchesGenre = selectedGenres.length === 0 || 
        selectedGenres.some(genre => game.Genre?.includes(genre))

      const matchesHardware = selectedHardware === "all" || game.Hardware.includes(selectedHardware)
      
      const matchesConnectivity = selectedConnectivity === "all" || game.Connectivity?.includes(selectedConnectivity)
      
      return matchesSearch && matchesYear && matchesGenre && matchesHardware && matchesConnectivity
    })
  }, [games, searchQuery, yearRange, selectedGenres, selectedHardware, selectedConnectivity])

  const activeFiltersCount = useMemo(() => (
    (selectedGenres.length > 0 ? 1 : 0) + 
    (selectedHardware !== "all" ? 1 : 0) + 
    (selectedConnectivity !== "all" ? 1 : 0) +
    (yearRange[0] !== minGameYear || yearRange[1] !== maxGameYear ? 1 : 0)
  ), [selectedGenres, selectedHardware, selectedConnectivity, yearRange, minGameYear, maxGameYear])

  // Memoized filter options
  const filterOptions = useMemo(() => ({
    categories: ["all", ...Array.from(new Set(games.map(g => g.Genre).filter(Boolean)))],
    years: ["all", ...Array.from(new Set(games.map(g => g.Year).filter(Boolean))).sort((a, b) => b.localeCompare(a))],
    hardware: ["all", ...Array.from(new Set(games.flatMap(g => g.Hardware.split(",")[0].trim()).filter(Boolean)))]
  }), [games])

  // Callbacks
  const resetFilters = useCallback(() => {
    setYearRange([minGameYear, maxGameYear])
    setSelectedGenres([])
    setSelectedHardware("all")
    setSelectedConnectivity("all")
    setSearchQuery("")
    setCurrentPage(1)
  }, [minGameYear, maxGameYear])

  const openGameModal = useCallback((game: GameData) => {
    setSelectedGame(game)
    setIsModalOpen(true)
  }, [])

  const handleGenreChange = (genre: string, checked: boolean) => {
    setSelectedGenres(prev => 
      checked ? [...prev, genre] : prev.filter(g => g !== genre)
    )
    setCurrentPage(1)
  }

  const scrollToSlide = useCallback((direction: "prev" | "next") => {
    // No longer needed with grid layout, but keeping for now
  }, [])

  // Enhanced data
  const discoverItems = [
    { 
      title: "Device of the Week", 
      description: "Featured rotating hardware with detailed specs and historical context.", 
      category: "Featured", 
      icon: Trophy, 
      image: "/deviceofweek.jpg",
      color: "from-yellow-500/20 to-orange-500/20",
      href: "/device-of-week"
    },
    { 
      title: "Latest Publications", 
      description: "Fresh research on the impact of Java games on mobile gaming.", 
      category: "New", 
      icon: Zap, 
      image: "/latestpublic.jpg",
      color: "from-blue-500/20 to-purple-500/20",
      href: "/publications#latest"
    },
    { 
      title: "Ongoing Work", 
      description: "Currently digitizing Game Boy Advance classics and preserving source code.", 
      category: "Active", 
      icon: Shield, 
      image: "/ongoing.jpeg",
      color: "from-green-500/20 to-teal-500/20",
      href: "/coming-soon"
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
        <section className="h-screen min-h-[700px] flex items-center justify-center  p-8 relative z-0 overflow-hidden">
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
          <button 
            onClick={scrollToAbout}
            className="absolute bottom-15 left-1/2 -translate-x-1/2 animate-bounce hover:scale-110 transition-transform cursor-pointer"
            aria-label="Scroll down"
          >
            <ChevronDown className="w-10 h-10 text-white/90" />
          </button>
        </section>

        {/* ABOUT SECTION - Enhanced animations */}
        <section 
          ref={aboutRef as React.RefObject<HTMLElement>}
          className="relative py-20 px-8 z-10 bg-white text-black -mt-8   rounded-t-[2rem] overflow-hidden"
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

        {/* FULL DATABASE SECTION - Complete search and filtering */}
        <section 
          ref={gamesRef as React.RefObject<HTMLElement>}
          className="relative py-20 px-8 z-20 text-white -mt-8 rounded-t-[2rem]"
          style={{ 
            background: "linear-gradient(135deg, #ef4444 0%, #991b1b 50%, #000000 100%)" 
          }}
        >
          <div className="max-w-[100rem] mx-auto">
            <div className={cn(
              "text-center transition-all duration-1000 mb-16",
              gamesVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            )}>
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter">
                From The <span className="text-red-100">Archive</span>
              </h2>
              <p className="text-lg text-red-100 max-w-3xl mx-auto mt-6">
                Explore our comprehensive collection of preserved games, devices, and hardware. Use the filters below to search by year, genre, platform, and connectivity.
              </p>
            </div>

            {/* Advanced filter UI - matching database page */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl border border-white/20 rounded-3xl p-6 md:p-10 mb-12 shadow-2xl">
              
              {/* Top Bar: Search & Toggle */}
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between mb-8">
                <div className="relative w-full lg:flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-200/60" />
                  <Input 
                    type="text" 
                    placeholder="Search by title or developer..." 
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-12 pr-4 h-12 bg-white/15 border border-white/30 text-white placeholder:text-red-100/60 rounded-xl focus:border-white/60 focus:ring-2 focus:ring-white/40 transition-all hover:bg-white/20"
                    aria-label="Search games"
                  />
                </div>
                
                <div className="flex items-center gap-3 w-full lg:w-auto">
                  <Button 
                    onClick={() => setIsFilterOpen(!isFilterOpen)} 
                    className={cn(
                      "bg-white/20 backdrop-blur-sm text-white font-bold px-6 py-3 rounded-xl hover:bg-white/30 transition-all flex items-center gap-2 h-12 border border-white/30",
                      isFilterOpen && "bg-white/30 ring-2 ring-white/50"
                    )}
                    aria-expanded={isFilterOpen}
                    aria-controls="filter-panel"
                  >
                    <SlidersHorizontal className="h-4 w-4" />
                    <span className="hidden sm:inline">{isFilterOpen ? "Hide Filters" : "Show Filters"}</span>
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 bg-red-500/80 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                  {activeFiltersCount > 0 && (
                    <Button 
                      onClick={resetFilters} 
                      variant="ghost" 
                      className="text-white hover:text-red-200 hover:bg-white/20 h-12 px-4 rounded-xl border border-white/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>

              {/* Expanded Filter Controls */}
              {isFilterOpen && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-white/20 animate-in fade-in slide-in-from-top-2">
                  
                  {/* Left Column: Genre Checkboxes */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center gap-2 text-white font-bold">
                      <Gamepad2 className="w-4 h-4 text-red-300" /> Genres
                    </div>
                    <ScrollArea className="h-[280px] w-full rounded-xl border border-white/30 bg-white/10 p-4">
                      <div className="space-y-3">
                        {allGenres.map((genre) => (
                          <div key={genre} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`genre-${genre}`} 
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                              className="data-[state=checked]:bg-red-400 data-[state=checked]:border-red-400 border-white/40 rounded"
                            />
                            <label
                              htmlFor={`genre-${genre}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-white hover:text-red-200"
                            >
                              {genre}
                            </label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Middle Column: Year Slider & Connectivity */}
                  <div className="lg:col-span-5 space-y-8 px-0 lg:px-4">
                    {/* Year Slider */}
                    <div className="space-y-4 bg-white/10 p-6 rounded-xl border border-white/30">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-white font-bold">
                            <Calendar className="w-4 h-4 text-red-300" /> Release Year
                         </div>
                         <span className="text-sm font-mono text-red-200 font-bold bg-white/10 px-2 py-1 rounded border border-red-300/30">
                           {yearRange[0]} - {yearRange[1]}
                         </span>
                      </div>
                      <Slider
                        defaultValue={[minGameYear, maxGameYear]}
                        value={[yearRange[0], yearRange[1]]}
                        min={minGameYear}
                        max={maxGameYear}
                        step={1}
                        minStepsBetweenThumbs={1}
                        onValueChange={(value) => {
                          setYearRange(value as [number, number])
                          setCurrentPage(1)
                        }}
                        className="py-4"
                      />
                      <div className="flex justify-between text-xs text-white/60">
                        <span>{minGameYear}</span>
                        <span>{maxGameYear}</span>
                      </div>
                    </div>

                     {/* Connectivity Select */}
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-white flex items-center gap-2">
                          <Wifi className="w-4 h-4 text-red-300" /> Connectivity
                       </label>
                       <Select value={selectedConnectivity} onValueChange={(val) => {setSelectedConnectivity(val); setCurrentPage(1)}}>
                        <SelectTrigger className="w-full h-12 bg-white/10 border-white/30 text-white rounded-xl">
                          <SelectValue placeholder="Select Connectivity" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Connectivity Types</SelectItem>
                          {connectivityOptions.map((conn) => (
                            <SelectItem key={conn} value={conn}>{conn}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Right Column: Hardware */}
                  <div className="lg:col-span-4 space-y-4">
                    <div className="space-y-2">
                       <label className="text-sm font-bold text-white flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-red-300" /> Platform / Hardware
                       </label>
                       <Select value={selectedHardware} onValueChange={(val) => {setSelectedHardware(val); setCurrentPage(1)}}>
                        <SelectTrigger className="w-full h-12 bg-white/10 border-white/30 text-white rounded-xl">
                          <SelectValue placeholder="Select Hardware" />
                        </SelectTrigger>
                        <SelectContent className="max-h-[300px]">
                          <SelectItem value="all">All Platforms</SelectItem>
                          {hardwareOptions.map((hw) => (
                            <SelectItem key={hw} value={hw}>{hw}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    {/* Results Summary Box */}
                    <div className="bg-white/15 rounded-xl p-6 border border-white/30 mt-6 text-center">
                      <p className="text-white/70 font-medium mb-1">Found</p>
                      <p className="text-4xl font-black text-red-300">{filteredGames.length}</p>
                      <p className="text-white/60 text-sm mt-1">Games matching criteria</p>
                    </div>
                  </div>

                </div>
              )}
            </div>

            {/* Games grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
              {loading ? (
                [...Array(12)].map((_, i) => (
                  <div 
                    key={i} 
                    className="bg-white/10 rounded-2xl aspect-[4/5] animate-pulse"
                  />
                ))
              ) : filteredGames.length === 0 ? (
                <div className="col-span-full text-center py-16">
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
                filteredGames.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((game, index) => (
                  <div
                    key={game.Title + index}
                    onClick={() => openGameModal(game)}
                    className="group cursor-pointer relative bg-gradient-to-br from-red-600 to-red-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-2 border border-red-500/20"
                    role="article"
                    tabIndex={0}
                    onKeyDown={(e) => e.key === 'Enter' && openGameModal(game)}
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-square overflow-hidden bg-black/20">
                      <Image 
                        src={getFirstImage(game.Pictures)} 
                        alt={game.Title} 
                        fill 
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10">
                          {game.Year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-2 group-hover:text-red-100 transition-colors">
                        {game.Title}
                      </h3>
                      <p className="text-red-100/80 text-sm mb-4 line-clamp-1">
                        {game.Developers}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-xs font-medium px-3 py-1.5 bg-white/20 text-white rounded-full">
                          {game.Hardware.split(",")[0].trim()}
                        </span>
                        <ArrowRight className="w-4 h-4 text-red-100 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {!loading && filteredGames.length > 0 && (
              <div className="mt-16 flex flex-col items-center gap-8">
                {/* Pagination Controls */}
                <div className="flex flex-wrap justify-center gap-2">
                  {Array.from({ length: Math.ceil(filteredGames.length / itemsPerPage) }, (_, i) => i + 1).map((page) => (
                    <button
                      key={page}
                      onClick={() => {
                        setCurrentPage(page)
                        window.scrollTo({ top: 0, behavior: 'smooth' })
                      }}
                      className={cn(
                        "px-4 py-2 rounded-lg font-semibold transition-all",
                        currentPage === page
                          ? "bg-white text-red-600"
                          : "bg-white/10 text-white hover:bg-white/20 border border-white/20"
                      )}
                    >
                      {page}
                    </button>
                  ))}
                </div>
                
                <p className="text-white/70 text-sm">
                  Showing {(currentPage - 1) * itemsPerPage + 1}-{Math.min(currentPage * itemsPerPage, filteredGames.length)} of {filteredGames.length} games
                </p>
              </div>
            )}
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

