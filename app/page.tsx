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
  Gamepad2,
  Database,
  Users,
  BookOpen,
  Trophy,
  Clock,
  Star,
  Search,
  SlidersHorizontal,
  X,
  ChevronDown,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GameAPI } from "@/services/api"
import type { GameData } from "@/lib/types"

export default function Page() {
  // --- State for Game Data ---
  const [games, setGames] = useState<GameData[]>([])
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [currentSlide, setCurrentSlide] = useState(0) // For carousel buttons

  // --- State for Filters ---
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedHardware, setSelectedHardware] = useState<string>("all")

  // --- Data Fetching ---
  useEffect(() => {
    async function fetchGames() {
      try {
        // The response from GameAPI.getAllGames() is now already in the correct GameData[] format
        const response: GameData[] = await GameAPI.getAllGames()

        if (Array.isArray(response)) {
          // No mapping needed. Just slice the response and set it.
          setGames(response.slice(0, 12))
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching games:", error)
        setLoading(false)
      }
    }

    fetchGames()
  }, [])
  
  // --- Filter Logic ---
  const categories = ["all", ...Array.from(new Set(games.map((g) => g.Genre).filter(Boolean)))]
  const years = ["all", ...Array.from(new Set(games.map((g) => g.Year).filter(Boolean))).sort().reverse()]
  const hardwareOptions = ["all", ...Array.from(new Set(games.map((g) => g.Hardware.split(",")[0].trim()).filter(Boolean)))]

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.Genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.Hardware.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.Developers.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || game.Genre.includes(selectedCategory)
    const matchesYear = selectedYear === "all" || game.Year === selectedYear
    const matchesHardware = selectedHardware === "all" || game.Hardware.includes(selectedHardware)
    return matchesSearch && matchesCategory && matchesYear && matchesHardware
  })

  const activeFiltersCount = [selectedCategory, selectedYear, selectedHardware].filter((f) => f !== "all").length

  const resetFilters = () => {
    setSelectedCategory("all")
    setSelectedYear("all")
    setSelectedHardware("all")
    setSearchQuery("")
  }

  // --- Helper Functions ---
  const getFirstImage = (pictures: string | undefined) => {
    if (!pictures) return "/placeholder.jpg"
    const imageUrls = pictures.split(",").map((url) => url.trim())
    return imageUrls[0] || "/placeholder.jpg"
  }

  const openGameModal = (game: GameData) => {
    setSelectedGame(game)
    setIsModalOpen(true)
  }

  const scrollToSlide = (direction: "prev" | "next") => {
    const container = carouselRef.current
    if (!container) return

    // Calculate scroll amount based on 4 items + gap
    const slideWidth = container.scrollWidth / games.length
    const scrollAmount = slideWidth * 1 // Scroll one item at a time

    if (direction === "prev") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      setCurrentSlide((prev) => Math.max(0, prev - 1))
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      // This logic assumes 4 items are visible
      setCurrentSlide((prev) => Math.min(games.length - 4, prev + 1))
    }
  }

  // --- Mock Data for Research Section ---
  const researchArticles = [
    {
      title: "The Evolution of Mobile Gaming Interfaces: 1975-1990",
      description: "An in-depth analysis of how mobile gaming interfaces evolved from simple LED displays to early LCD screens...",
      category: "Interface Design",
      image: "/mobile-gaming-interface.jpg",
      featured: true, // You can adjust which ones are featured
      readTime: "10 min" // You can adjust read time
    },
    {
      title: "Nokia's Impact on Mobile Gaming Culture",
      description: "Exploring how Nokia's pre-installed games like Snake became cultural phenomena...",
      category: "Cultural Studies",
      image: "/nokia-snake-game.jpg",
      featured: false,
      readTime: "7 min"
    },
    {
      title: "Game Boy: Revolutionizing Portable Entertainment",
      description: "A comprehensive study of the Game Boy's technical innovations and its lasting influence...",
      category: "Hardware",
      image: "/game-boy-tetris.jpg",
      featured: false,
      readTime: "8 min"
    },
    {
      title: "Preservation Challenges in Early Mobile Gaming",
      description: "Addressing the unique challenges of preserving early mobile games, including hardware degradation...",
      category: "Preservation",
      image: "/preservation-archiving.jpg",
      featured: false,
      readTime: "6 min"
    },
    {
      title: "The Social Dynamics of Multiplayer Mobile Games",
      description: "Investigating how early multiplayer mobile games fostered social connections and competitive play...",
      category: "Social Studies",
      image: "/multiplayer-games.jpg",
      featured: true, // You can adjust which ones are featured
      readTime: "9 min"
    },
    {
      title: "Audio Design in Constrained Mobile Environments",
      description: "Examining the creative approaches developers used to create memorable audio experiences...",
      category: "Audio Design",
      image: "/audio-design-gaming.jpg",
      featured: false,
      readTime: "5 min"
    },
  ]

  // Mock Data for Discover Section
  const discoverItems = [
    {
      title: "Device of the Week",
      description: "Explore the iconic Nokia N-Gage and its revolutionary features.",
      category: "Featured",
      icon: Trophy,
      image: "/game-boy-tetris.jpg",
    },
    {
      title: "Latest Publications",
      description: "Fresh research on the impact of Java games on mobile gaming.",
      category: "New",
      icon: Clock,
      image: "/gaming-historian.jpg",
    },
    {
      title: "Ongoing Work",
      description: "Currently digitizing Game Boy Advance classics and preserving source code.",
      category: "Active",
      icon: Star,
      image: "/data-manager.jpg",
    },
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      {/* This <style> tag adds the "text-glow" class to make the red text pop */}
      <style jsx>{`
        .text-glow {
          text-shadow: 0 0 15px rgba(239, 68, 68, 0.6), 0 0 5px rgba(239, 68, 68, 0.5);
        }
      `}</style>

      {/* The Parallax Container */}
      <div className="parallax-container h-screen overflow-y-auto overflow-x-hidden">
        <Header />

        {/* --- SECTION 1: VIDEO HERO --- */}
        <section className="parallax-section h-screen min-h-[700px] flex items-center justify-center p-8 relative z-0">
          {/* Background Video */}
          <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
            <iframe
              className="absolute top-1/2 left-1/2 w-full h-full min-w-full min-h-full -translate-x-1/2 -translate-y-1/2 scale-150"
              src="https://www.youtube.com/embed/DyXNJzSwR0o?si=0OaG0MtM4wZCgGNH&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&loop=1&playlist=DyXNJzSwR0o&autoplay=1&mute=1"
              title="Retro Mobile Gaming History"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-black/70 z-10"></div>
          </div>
          {/* Hero Text */}
          <div className="text-center z-10 animate-in fade-in slide-in-from-bottom-10 duration-700">
            <h1 className="text-6xl md:text-9xl font-black tracking-tighter uppercase">
              Retro Mobile
            </h1>
            <h2 className="text-6xl md:text-9xl font-black tracking-tighter uppercase text-red-600 ">
              Gaming Project
            </h2>
            <p className="text-xl md:text-2xl text-neutral-400 mt-6 max-w-2xl mx-auto">
              Preserving the history of portable play from 1975 to 2008.
            </p>
          </div>
        </section>

        {/* --- SECTION 2: ABOUT (MODIFIED per Screenshot) --- */}
        <section className="parallax-section relative py-16 px-8 z-10 bg-white text-black -mt-8 rounded-t-3xl">
          {/* Content */}
          <div className="max-w-[100rem] mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24 items-center relative z-10">
            
            {/* Image Column */}
            <div className="relative w-full h-96 md:h-[500px] rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-left-10 duration-700">
              <Image
                src="/retro-gaming-collection.jpg"
                alt="Retro Gaming Collection"
                fill
                className="object-cover"
              />
            </div>
            
            {/* Text Column */}
            <div className="animate-in fade-in slide-in-from-right-10 duration-700">
              <span className="text-sm font-bold text-neutral-500 uppercase">About RMGP</span>
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter text-neutral-900 mt-4">
                Preserving
                <br />
                Gaming's
                <br />
                <span className="text-red-600">Mobile Legacy</span>
              </h2>
              <p className="text-lg text-neutral-700 mt-6">
                The Retro Mobile Gaming Project (RMGP) is a comprehensive digital preservation initiative
                documenting the evolution of mobile gaming from 1975 to 2008.
              </p>
              <p className="text-lg text-neutral-700 mt-4">
                Our searchable database provides detailed information about games that shaped the mobile gaming
                industry. We preserve the rich history of mobile gaming technology, design principles, and cultural
                significance for research and education.
              </p>
              <Button
                asChild
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-lg text-lg shadow-lg hover:shadow-xl hover:shadow-red-600/20 transition-all mt-10"
              >
                <Link href="/about">
                  Learn More <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        {/* --- END OF MODIFIED SECTION --- */}


        {/* --- SECTION 3: BROWSE GAMES (Red Block) --- */}
        <section 
          className="parallax-section relative py-16 px-8 z-20 text-white -mt-8 rounded-t-3xl"
          style={{ background: "linear-gradient(to bottom right, #ef4444, #000000)" }}
        >
          <div className="max-w-[100rem] mx-auto">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-center">
              From The <span className="text-red-100">Archive</span>
            </h2>
            <p className="text-lg text-red-100 text-center max-w-3xl mx-auto mt-6">
              A selection of preserved games, devices, and hardware from our collection.
            </p>
          </div>

          {/* --- Search and Filter --- */}
          <div className="max-w-[100rem] mx-auto mt-16">
            <div className="bg-black/20 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-red-100/70 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search games..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-6 bg-white/10 border-white/20 text-white placeholder:text-red-100/70 rounded-xl focus:border-white/50 focus:ring-red-500"
                  />
                </div>

                <Button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-white/90 backdrop-blur-sm text-red-600 font-bold px-6 py-6 rounded-xl hover:bg-white transition-all flex items-center gap-2 w-full md:w-auto"
                >
                  <SlidersHorizontal className="h-5 w-5" />
                  <span>Filter</span>
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                  <ChevronDown className={`h-5 w-5 ml-2 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                </Button>
              </div>

              {/* Expandable Filters */}
              {isFilterOpen && (
                <div className="mt-6 pt-6 border-t border-white/20 animate-in fade-in duration-300">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Genre Filter */}
                    <div>
                      <label className="text-red-100 font-semibold mb-2 block">Genre</label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat} className="bg-black text-white">
                            {cat === "all" ? "All Genres" : cat}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Year Filter */}
                    <div>
                      <label className="text-red-100 font-semibold mb-2 block">Year</label>
                      <select
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        {years.map((year) => (
                          <option key={year} value={year} className="bg-black text-white">
                            {year === "all" ? "All Years" : year}
                          </option>
                        ))}
                      </select>
                    </div>
                    {/* Hardware Filter */}
                    <div>
                      <label className="text-red-100 font-semibold mb-2 block">Hardware</label>
                      <select
                        value={selectedHardware}
                        onChange={(e) => setSelectedHardware(e.target.value)}
                        className="w-full bg-white/10 border border-white/20 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-white/50"
                      >
                        {hardwareOptions.map((hw) => (
                          <option key={hw} value={hw} className="bg-black text-white">
                            {hw === "all" ? "All Hardware" : hw}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {activeFiltersCount > 0 && (
                     <Button
                      onClick={resetFilters}
                      variant="ghost"
                      className="text-white hover:text-red-100 hover:bg-white/10 mt-4"
                    >
                      <X className="h-4 w-4 mr-2" />
                      Reset All Filters
                    </Button>
                  )}
                </div>
              )}
            </div>
          </div>
          {/* --- End Search and Filter --- */}


          <div className="relative mt-16 max-w-[100rem] mx-auto w-full">
            {!loading && filteredGames.length > 4 && (
              <button
                onClick={() => scrollToSlide("prev")}
                className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/30 rounded-full p-3 shadow-xl hover:bg-black/50 disabled:opacity-30 -translate-x-12 border border-white/20"
                disabled={currentSlide === 0}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>
            )}

            <div
              ref={carouselRef}
              className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
              style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
              {loading
                ? [...Array(4)].map((_, i) => (
                    <div key={i} className="flex-none w-full sm:w-1/2 lg:w-[calc(25%-18px)]">
                      <div className="bg-white/80 rounded-lg overflow-hidden animate-pulse">
                        <div className="relative w-full h-64 bg-gray-300"></div>
                        <div className="p-4">
                          <div className="h-6 bg-gray-300 rounded w-3/4 mb-3"></div>
                          <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : filteredGames.map((game, index) => (
                    // --- NEW WHITE GAME CARD ---
                    <div
                      key={index}
                      className="flex-none w-full sm:w-1/2 lg:w-[calc(25%-18px)] group cursor-pointer"
                      onClick={() => openGameModal(game)}
                    >
                      <div className="bg-white text-black rounded-lg overflow-hidden h-full flex flex-col shadow-lg border-2 border-transparent transition-all duration-300 hover:bg-gradient-to-br from-black  to-red-600 hover:text-white hover:border-red-600 hover:shadow-2xl hover:shadow-red-900/40 transform hover:-translate-y-1">
                        {/* Image container */}
                        <div className="relative w-full h-64 overflow-hidden bg-gray-200">
                          <Image
                            src={getFirstImage(game.Pictures) || "/placeholder.jpg"}
                            alt={game.Title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.jpg"
                            }}
                          />
                          {/* Year badge */}
                          <div className="absolute top-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-xs font-bold backdrop-blur-sm">
                            {game.Year}
                          </div>
                        </div>
                        {/* Content container */}
                        <div className="p-5 flex-grow flex flex-col">
                          <h3 className="font-bold text-xl text-neutral-900 line-clamp-1 transition-colors group-hover:text-white">
                            {game.Title}
                          </h3>
                          <p className="text-sm text-neutral-600 mb-4 line-clamp-1 group-hover:text-red-100">{game.Developers}</p>
                          <div className="mt-auto flex justify-between items-center">
                            <span className="text-xs text-neutral-500 group-hover:text-red-200">{game.Hardware.split(",")[0]}</span>
                            <ArrowRight className="w-4 h-4 text-neutral-400 transform -translate-x-2 opacity-0 group-hover:opacity-100 group-hover:text-white group-hover:translate-x-0 transition-all" />
                          </div>
                        </div>
                      </div>
                    </div>
                    // --- END NEW WHITE GAME CARD ---
                  ))}
            </div>

            {!loading && filteredGames.length > 4 && (
              <button
                onClick={() => scrollToSlide("next")}
                className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/30 rounded-full p-3 shadow-xl hover:bg-black/50 disabled:opacity-30 translate-x-12 border border-white/20"
                disabled={currentSlide >= filteredGames.length - 4}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            )}
          </div>
        </section>

        {/* --- SECTION 4: DISCOVER & EXPLORE (Black Block) --- */}
        <section className="parallax-section relative py-16 px-8 z-30 bg-black text-white -mt-8 rounded-t-3xl">
          <div className="max-w-[100rem] mx-auto">
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter text-center">
              Discover & <span className="text-red-600 text-glow">Explore</span>
            </h2>
            <p className="text-lg text-neutral-400 text-center max-w-3xl mx-auto mt-6">
              Dive into our curated collections and stay updated with the latest in retro mobile gaming preservation.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              {discoverItems.map((item, index) => {
                const Icon = item.icon
                return (
                  <Link
                    href="#"
                    key={index}
                    className="block border border-neutral-800 rounded-lg overflow-hidden transition-all duration-300 hover:border-red-600 hover:shadow-xl hover:shadow-red-600/10 group animate-in fade-in slide-in-from-bottom-10 duration-700"
                    style={{ animationDelay: `${index * 150}ms` }}
                  >
                    <div className="relative h-56 w-full overflow-hidden bg-neutral-900 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500 opacity-80 group-hover:opacity-100"
                      />
                    </div>
                    <div className="p-6">
                      <span className="inline-flex items-center gap-2 text-sm font-bold text-red-600 uppercase tracking-wider">
                        <Icon className="w-4 h-4" />
                        {item.category}
                      </span>
                      <h3 className="text-2xl font-bold text-white mt-2 group-hover:text-red-600 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-neutral-400 mt-2 line-clamp-2">{item.description}</p>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>

        {/* --- SECTION 5: LATEST RESEARCH (White Block) --- */}
        <section
          className="parallax-section relative py-16 px-8 z-40 text-black bg-white -mt-8 rounded-t-3xl"
        >
          <div className="max-w-[100rem] mx-auto w-full">
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                <BookOpen className="w-4 h-4" />
                Research & Publications
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-neutral-900 mb-4">Latest Research</h2>
              <p className="text-neutral-600 text-lg max-w-3xl mx-auto">
                Explore our academic papers, case studies, and in-depth analyses of mobile gaming history
              </p>
            </div>

            {/* --- Uniform 3-Column Grid --- */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {researchArticles.map((article, index) => (
                <Link
                  href="/publications"
                  key={index}
                  className="group transform transition-all duration-300 hover:-translate-y-2 cursor-pointer animate-in fade-in slide-in-from-bottom-10 duration-700"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="bg-gradient-to-br from-red-200 to-black/30  border border-transparent hover:border-red-500 rounded-2xl shadow-lg hover:shadow-red-500/10 transition-colors h-full flex flex-col overflow-hidden">
                    {/* Image Container */}
                    <div className="relative w-full overflow-hidden h-56">
                      <Image
                        src={article.image || "/placeholder.jpg"}
                        alt={article.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.jpg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                      <span className="absolute top-4 left-4 bg-white/10 text-white px-3 py-1 rounded-full font-semibold border border-white/20 text-xs backdrop-blur-sm">
                        {article.category}
                      </span>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 text-white flex-grow flex flex-col">
                      <h3
                        className="font-bold text-xl text-red-600 group-hover:text-red-900 mb-3 transition-colors line-clamp-3"
                      >
                        {article.title}
                      </h3>
                      <p className="text-neutral-600/90 text-sm line-clamp-3 flex-grow">
                        {article.description}
                      </p>
                      <div className="mt-5 flex items-center justify-between text-red-700">
                         <span className="flex items-center gap-1.5 text-xs">
                            <Clock className="w-3 h-3" />
                            {article.readTime} read
                          </span>
                        <span className="flex items-center gap-1 text-sm font-semibold group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
                className="bg-red-600 hover:bg-red-700 text-white font-bold px-10 py-6 rounded-2xl text-lg shadow-lg hover:shadow-2xl hover:shadow-red-500/20 transition-all transform hover:scale-105"
              >
                <Link href="/publications">
                  View All Research <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* --- SECTION 6: FOOTER --- */}
        <section className="parallax-section relative z-50  rounded-t-3xl">
          <Footer />
        </section>
      </div>

     

      <GameModal game={selectedGame} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}