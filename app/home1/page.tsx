"use client"

import Image from "next/image"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { GameModal } from "@/components/game-modal"
import { DonationButton } from "@/components/donation-button"
import {
  Search,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Gamepad2,
  Database,
  Users,
  BookOpen,
  ExternalLink,
  Sparkles,
  Clock,
  Trophy,
  Star,
  SlidersHorizontal,
  X,
} from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { GameAPI } from "@/services/api"
import type { GameData } from "@/lib/types"

export default function NewPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [games, setGames] = useState<GameData[]>([])
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [loading, setLoading] = useState(true)
  const [currentSlide, setCurrentSlide] = useState(0)
  const carouselRef = useRef<HTMLDivElement>(null)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await GameAPI.getAllGames()

        if (Array.isArray(response)) {
          const getString = (obj: any): string => {
            if (!obj) return ""
            if (typeof obj === "string") return obj
            if (obj.S) return obj.S
            if (obj.SS) return obj.SS.join(", ")
            return ""
          }

          const mappedGames: GameData[] = response.slice(0, 12).map((game: any) => ({
            Title: getString(game.GameTitle),
            Year: getString(game.YearDeveloped),
            Developers: getString(game.Developer),
            City: getString(game.City) || "",
            Country: getString(game.DeveloperLocation),
            URL: getString(game.GameWebsite),
            Description: getString(game.GameDescription),
            Pictures: getString(game.Photos),
            Documentation: getString(game.Videos),
            Articles: getString(game.Articles),
            Purpose: getString(game.Purpose),
            "Open Source": getString(game.OpenSource),
            "# Players": getString(game.Players),
            Location: getString(game.SiteSpecific),
            Genre: getString(game.Genre),
            Hardware: getString(game.HardwareFeatures),
            Connectivity: getString(game.Connectivity),
            Contact: getString(game.Contact) || "N/A",
          }))

          setGames(mappedGames)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching games:", error)
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

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

    const slideWidth = container.clientWidth / 4
    const gap = 24
    const scrollAmount = slideWidth + gap

    if (direction === "prev") {
      container.scrollBy({ left: -scrollAmount, behavior: "smooth" })
      setCurrentSlide(Math.max(0, currentSlide - 1))
    } else {
      container.scrollBy({ left: scrollAmount, behavior: "smooth" })
      setCurrentSlide(Math.min(games.length - 4, currentSlide + 1))
    }
  }

  const researchArticles = [
    {
      title: "The Evolution of Handheld Gaming",
      description: "Exploring the technological advancements that shaped portable gaming.",
      category: "Technology",
      readTime: "5 min",
      featured: true,
      image: "/mobile-gaming-interface.jpg",
    },
    {
      title: "Impact of Early Mobile Games on Modern Design",
      description: "How retro mobile games influenced today's game design principles.",
      category: "Design",
      readTime: "8 min",
      image: "/nokia-snake-game.jpg",
    },
    {
      title: "Preserving Gaming History: A Digital Approach",
      description: "Modern methods for archiving and preserving classic mobile games.",
      category: "Preservation",
      readTime: "6 min",
      image: "/preservation-archiving.jpg",
    },
    {
      title: "Iconic Devices That Defined an Era",
      description: "The hardware innovations that revolutionized mobile gaming.",
      category: "Hardware",
      readTime: "7 min",
      featured: true,
      image: "/audio-design-gaming.jpg",
    },
    {
      title: "The Rise of Mobile Multiplayer Gaming",
      description: "From local link cables to early wireless connectivity.",
      category: "Multiplayer",
      readTime: "10 min",
      image: "/multiplayer-games.jpg",
    },
    {
      title: "From Pixels to Polygons: A Visual History",
      description: "The artistic evolution of mobile game graphics.",
      category: "Graphics",
      readTime: "4 min",
      image: "/educator.png",
    },
  ]

  // Base class for the new liquid glass panels
  const glassPanelClass =
    "bg-neutral-800/30 backdrop-blur-lg rounded-[2.5rem] shadow-2xl border-t border-l border-white/20 border-b border-r border-white/5 transition-all duration-300 hover:bg-neutral-800/50 hover:border-t-white/30 hover:border-l-white/30"

  // Base class for the new liquid glass cards
  const glassCardClass =
    "bg-neutral-900/50 backdrop-blur-md rounded-2xl shadow-lg border-t border-l border-white/10 border-b border-r border-white/5 transition-all duration-300 group-hover:bg-neutral-900/70 group-hover:border-t-white/20 group-hover:border-l-white/20"

  return (
    <div className="min-h-screen bg-black">
      {/* Main scrolling container. Removed snap-scroll classes. */}
      <div className="h-screen overflow-y-scroll pt-20">
        <Header />

        <section
          className="min-h-screen flex items-center relative w-full shadow-[inset_0_-30px_100px_rgba(0,0,0,0.6)] animate-in fade-in duration-700"
          style={{ animationDelay: "0.1s" }}
        >
          <div
            className={`relative w-full pb-[56.25%] overflow-hidden rounded-3xl mx-4 md:mx-8 shadow-2xl ${glassPanelClass} p-0`} // Added p-0 to fix padding
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60 z-10 rounded-[2.5rem]"></div>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-[2.5rem]" // Match border radius
              src="https://www.youtube.com/embed/DyXNJzSwR0o?si=0OaG0MtM4wZCgGNH&rel=0&modestbranding=1&autohide=1&showinfo=0&controls=0&loop=1&playlist=DyXNJzSwR0o&autoplay=1&mute=1"
              title="Retro Mobile Gaming History"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>

        <section
          className="min-h-screen flex items-center py-20 px-4 animate-in fade-in slide-in-from-bottom-10 duration-700"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="max-w-[100rem] mx-auto w-full">
            <div className={`${glassPanelClass} overflow-hidden`}>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                <div className="p-12 md:p-16 flex flex-col justify-center">
                  <div className="mb-8">
                    <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-6">
                      <Gamepad2 className="w-4 h-4" />
                      About RMGP
                    </span>
                    <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
                      Preserving Gaming's
                      <span className="block text-red-600 mt-2">Mobile Legacy</span>
                    </h2>
                  </div>

                  <p className="text-lg text-gray-300 leading-relaxed mb-6">
                    The Retro Mobile Gaming Project (RMGP) is a comprehensive digital preservation initiative
                    documenting the evolution of mobile gaming from 1975 to 2008. Our searchable database provides
                    detailed information about games that shaped the mobile gaming industry.
                  </p>

                  <p className="text-lg text-gray-300 leading-relaxed mb-8">
                    We preserve the rich history of mobile gaming technology, design principles, and cultural
                    significance for research and education.
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <Link href="/about">
                      <Button className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-2xl text-lg shadow-lg hover:shadow-xl transition-all">
                        Learn More <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                    <Link href="/contribute">
                      <Button className="bg-white hover:bg-gray-100 text-gray-900 font-bold px-8 py-6 rounded-2xl text-lg border-2 border-white shadow-lg hover:shadow-xl transition-all">
                        Contribute <ExternalLink className="ml-2 h-5 w-5" />
                      </Button>
                    </Link>
                  </div>
                </div>

                <div className="relative h-96 lg:h-full min-h-[400px]">
                  <Image
                    src="/retro-gaming-collection.jpg"
                    alt="Nintendo Game & Watch Collection"
                    fill
                    className="object-cover opacity-90 lg:rounded-r-[2.5rem]" // Match rounding
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:rounded-r-[2.5rem]"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          className="min-h-screen flex items-center py-20 px-4 animate-in fade-in slide-in-from-bottom-10 duration-700"
          style={{ animationDelay: "0.4s" }}
        >
          <div className="max-w-[100rem] mx-auto w-full">
            <div className={`${glassPanelClass} p-10 md:p-14`}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6">
                <div>
                  <span className="inline-flex items-center gap-2 bg-red-100 text-red-600 px-4 py-2 rounded-full text-sm font-semibold mb-4">
                    <Gamepad2 className="w-4 h-4" />
                    Game Collection
                  </span>
                  <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Browse Games</h2>
                  <p className="text-gray-300 text-lg">Discover classics from the golden age of mobile gaming</p>
                </div>

                <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-500 rounded-2xl blur-xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative">
                      <Search className="absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                      <Input
                        type="text"
                        placeholder="Search games..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-14 pr-6 py-6 text-base rounded-2xl border-2 border-neutral-700 bg-neutral-900/80 text-white shadow-lg hover:shadow-xl focus:shadow-xl hover:border-red-600/50 focus:border-red-600 transition-all placeholder:text-gray-400 w-full sm:w-80 backdrop-blur-sm"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Game Carousel - 4 cards visible */}
              <div className="relative">
                {!loading && games.length > 4 && (
                  <button
                    onClick={() => scrollToSlide("prev")}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-neutral-800/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-neutral-700 hover:scale-110 transition-all disabled:opacity-50 -translate-x-6 border border-neutral-700"
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
                          <Card className={`${glassCardClass} animate-pulse`}>
                            <div className="relative w-full h-64 bg-neutral-800 rounded-t-2xl"></div>
                            <CardContent className="p-6">
                              <div className="h-6 bg-neutral-800 rounded w-3/4 mb-3"></div>
                              <div className="h-4 bg-neutral-800 rounded w-1/2 mb-4"></div>
                              <div className="h-8 bg-neutral-800 rounded w-full"></div>
                            </CardContent>
                          </Card>
                        </div>
                      ))
                    : games.map((game, index) => (
                        <div
                          key={index}
                          className="flex-none w-full sm:w-1/2 lg:w-[calc(25%-18px)] group transform transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                          onClick={() => openGameModal(game)}
                        >
                          <div className={`${glassCardClass} h-full flex flex-col`}>
                            {/* Image Container with Overlay */}
                            <div className="relative w-full h-64 overflow-hidden bg-neutral-800 rounded-t-2xl">
                              <Image
                                src={getFirstImage(game.Pictures) || "/placeholder.jpg"}
                                alt={game.Title}
                                fill
                                className="object-cover group-hover:scale-110 transition-transform duration-700"
                                onError={(e) => {
                                  ;(e.target as HTMLImageElement).src = "/placeholder.jpg"
                                }}
                              />

                              {/* Gradient Overlay */}
                              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-2xl"></div>

                              {/* Year Badge */}
                              <div className="absolute top-4 right-4">
                                <span className="bg-black/80 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                                  {game.Year}
                                </span>
                              </div>

                              {/* Genre Badge (if available) */}
                              {game.Genre && (
                                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                  <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                                    {game.Genre.split(",")[0]}
                                  </span>
                                </div>
                              )}

                              {/* Play Button Overlay */}
                              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-0 group-hover:scale-100 transition-transform duration-300">
                                  <Gamepad2 className="w-8 h-8 text-red-600" />
                                </div>
                              </div>
                            </div>

                            {/* Card Content */}
                            <div className="p-6 flex-grow flex flex-col">
                              <div className="flex items-start justify-between mb-2">
                                <h3 className="font-bold text-xl text-white line-clamp-1 group-hover:text-red-500 transition-colors flex-1">
                                  {game.Title}
                                </h3>
                                <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-red-500 transition-all transform group-hover:translate-x-1 flex-shrink-0 ml-2" />
                              </div>
                              <p className="text-sm text-gray-300 mb-4 line-clamp-1">{game.Developers}</p>

                              {/* Additional Info */}
                              <div className="flex items-center gap-4 text-xs text-gray-400 mt-auto">
                                {game["# Players"] && (
                                  <span className="flex items-center gap-1">
                                    <Users className="w-3 h-3" />
                                    {game["# Players"]}
                                  </span>
                                )}
                                {game.Hardware && (
                                  <span className="flex items-center gap-1">
                                    <Database className="w-3 h-3" />
                                    {game.Hardware.split(",")[0]}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                </div>

                {!loading && games.length > 4 && (
                  <button
                    onClick={() => scrollToSlide("next")}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-neutral-800/90 backdrop-blur-sm rounded-full p-3 shadow-xl hover:bg-neutral-700 hover:scale-110 transition-all disabled:opacity-50 translate-x-6 border border-neutral-700"
                    disabled={currentSlide >= games.length - 4}
                  >
                    <ChevronRight className="h-6 w-6 text-white" />
                  </button>
                )}
              </div>

              {/* View All Button */}
              <div className="text-center mt-14">
                <Link href="/games">
                  <Button className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-12 py-6 rounded-2xl text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105">
                    View All Games <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section
          className="min-h-screen flex items-center py-20 px-4 relative animate-in fade-in slide-in-from-bottom-10 duration-700"
          style={{ animationDelay: "0.2s" }}
        >
          <div className="relative max-w-[100rem] mx-auto w-full">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-black text-white mb-4">Discover & Explore</h2>
              <p className="text-gray-300 max-w-2xl mx-auto">
                Dive into our curated collections and stay updated with the latest in retro mobile gaming preservation.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Link href="#" className="group transform transition-all duration-300 hover:scale-105">
                <Card className={`relative overflow-hidden rounded-3xl h-full ${glassCardClass}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative w-full h-56 bg-neutral-900 border-b border-white/10 flex items-center justify-center overflow-hidden">
                    <Image src="/game-boy-tetris.jpg" alt="Device of the Week" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="w-5 h-5 text-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">Featured</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Device of the Week</h3>
                    <p className="text-gray-300 mb-4">
                      Explore the iconic Nokia N-Gage and its revolutionary gaming features.
                    </p>
                    <div className="flex items-center text-red-500 font-semibold group-hover:gap-3 transition-all">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="#" className="group transform transition-all duration-300 hover:scale-105">
                <Card className={`relative overflow-hidden rounded-3xl h-full ${glassCardClass}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative w-full h-56 bg-neutral-900 border-b border-white/10 flex items-center justify-center overflow-hidden">
                    <Image src="/gaming-historian.jpg" alt="Latest Publications" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Clock className="w-5 h-5 text-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">NEW</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Latest Publications</h3>
                    <p className="text-gray-300 mb-4">
                      Fresh research on the impact of Java games on mobile gaming evolution.
                    </p>
                    <div className="flex items-center text-red-500 font-semibold group-hover:gap-3 transition-all">
                      Read Now <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>

              <Link href="#" className="group transform transition-all duration-300 hover:scale-105">
                <Card className={`relative overflow-hidden rounded-3xl h-full ${glassCardClass}`}>
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-red-500/10 to-transparent rounded-full -mr-16 -mt-16"></div>
                  <div className="relative w-full h-56 bg-neutral-900 border-b border-white/10 flex items-center justify-center overflow-hidden">
                    <Image src="/data-manager.jpg" alt="Ongoing Work" fill className="object-cover group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-2 mb-3">
                      <Star className="w-5 h-5 text-red-500" />
                      <span className="text-xs font-bold text-red-500 uppercase tracking-wider">ACTIVE</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Ongoing Work</h3>
                    <p className="text-gray-300 mb-4">
                      Currently digitizing Game Boy Advance classics and preserving source code.
                    </p>
                    <div className="flex items-center text-red-500 font-semibold group-hover:gap-3 transition-all">
                      Explore <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          </div>
        </section>

        <section
          className="min-h-screen flex items-center py-20 px-4 animate-in fade-in slide-in-from-bottom-10 duration-700"
          style={{ animationDelay: "0.5s" }}
        >
          <div className="max-w-[100rem] mx-auto w-full">
            <div className="text-center mb-14">
              <span className="inline-flex items-center gap-2 bg-red-600/20 text-red-400 px-4 py-2 rounded-full text-sm font-semibold mb-6 border border-red-600/30">
                <BookOpen className="w-4 h-4" />
                Research & Publications
              </span>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">Latest Research</h2>
              <p className="text-gray-300 text-lg max-w-3xl mx-auto">
                Explore our academic papers, case studies, and in-depth analyses of mobile gaming history
              </p>
            </div>

            <div className={`${glassPanelClass} p-10 md:p-14`}>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {researchArticles.map((article, index) => (
                  <Link
                    href="#"
                    className={`group transform transition-all duration-300 hover:scale-105 ${
                      article.featured ? "lg:col-span-2 lg:row-span-2" : ""
                    }`}
                    key={index}
                  >
                    <div
                      className={`${glassCardClass} h-full flex flex-col overflow-hidden ${
                        article.featured ? "border-2 border-red-700/50" : ""
                      }`}
                    >
                      <div
                        className={`relative w-full ${
                          article.featured ? "h-64" : "h-48"
                        } bg-neutral-800 overflow-hidden rounded-t-2xl`}
                      >
                        {article.featured && (
                          <div className="absolute top-4 left-4 z-10">
                            <span className="bg-red-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                              Featured
                            </span>
                          </div>
                        )}
                        <Image
                          src={article.image}
                          alt={article.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent rounded-t-2xl"></div>
                      </div>
                      <div className="p-6 flex-grow flex flex-col">
                        <div className="flex items-center gap-3 mb-3 text-xs">
                          <span className="bg-neutral-700/50 text-neutral-300 px-3 py-1 rounded-full font-semibold border border-neutral-600/50">
                            {article.category}
                          </span>
                          <span className="text-neutral-400 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {article.readTime}
                          </span>
                        </div>
                        <h3
                          className={`font-bold ${
                            article.featured ? "text-xl" : "text-lg"
                          } text-white group-hover:text-red-400 mb-2 transition-colors`}
                        >
                          {article.title}
                        </h3>
                        <p className="text-gray-300 text-sm line-clamp-2 flex-grow">{article.description}</p>
                        <div className="mt-4 flex items-center text-red-400 font-semibold text-sm group-hover:gap-3 transition-all">
                          Read Article <ArrowRight className="ml-2 h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              <div className="text-center mt-14">
                <Link href="/research">
                  <Button className="bg-transparent hover:bg-white/10 text-white font-bold px-10 py-6 rounded-2xl text-lg border-2 border-white/20 hover:border-white/40 shadow-lg hover:shadow-xl transition-all transform hover:scale-105">
                    View All Research <ArrowRight className="ml-3 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </div>

      <DonationButton />

      <GameModal game={selectedGame} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}