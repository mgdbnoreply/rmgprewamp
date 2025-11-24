"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight } from "lucide-react"
import { GameAPI } from "@/services/api"
import type { GameData } from "@/lib/types"
import { GameModal } from "@/components/game-modal"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [selectedYear, setSelectedYear] = useState<string>("all")
  const [selectedHardware, setSelectedHardware] = useState<string>("all")
  const [games, setGames] = useState<GameData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await GameAPI.getAllGames()

        if (Array.isArray(response)) {
          setGames(response)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching games:", error)
        setLoading(false)
      }
    }

    fetchGames()
  }, [])

  const categories = ["all", ...Array.from(new Set(games.map((g) => g.Genre).filter(Boolean)))]
  const years = [
    "all",
    ...Array.from(new Set(games.map((g) => g.Year).filter(Boolean)))
      .sort()
      .reverse(),
  ]
  const hardwareOptions = [
    "all",
    ...Array.from(new Set(games.map((g) => g.Hardware.split(",")[0].trim()).filter(Boolean))),
  ]

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
    setCurrentPage(1) // Reset to page 1 on filter reset
  }

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage)
  
  // Ensure current page is valid if filters reduce total pages
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [filteredGames.length, totalPages, currentPage])

  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5
    const half = Math.floor(maxPagesToShow / 2)

    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      let start = Math.max(currentPage - half, 1)
      let end = Math.min(start + maxPagesToShow - 1, totalPages)

      if (end - start < maxPagesToShow - 1) {
        start = Math.max(end - maxPagesToShow + 1, 1)
      }
      
      if (start > 1) {
        pages.push(1)
        if (start > 2) pages.push("...")
      }

      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      if (end < totalPages) {
        if (end < totalPages - 1) pages.push("...")
        pages.push(totalPages)
      }
    }
    return pages
  }

  const getFirstImage = (pictures: string | undefined) => {
    if (!pictures) return "/placeholder.svg"
    const imageUrls = pictures.split(",").map((url) => url.trim())
    return imageUrls[0] || "/placeholder.svg"
  }

  const openGameModal = (game: GameData) => {
    setSelectedGame(game)
    setIsModalOpen(true)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="relative z-10">
        
        {/* --- Full Width Hero Section --- */}
        <section className="relative w-full mt-16 py-24 md:py-32 overflow-hidden">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/database.jpg"
              alt="Collection Background"
              fill
              className="object-cover grayscale opacity-80"
              priority
            />
            {/* Black Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          </div>

          {/* Content Container (Constrained width) */}
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-8xl mx-auto text-center">
              {/* Changed inner container background to white for contrast */}
              <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/50 shadow-xl">
                <div className="relative inline-flex items-center justify-center gap-5 group mb-8 p-6 bg-white/80 backdrop-blur-xl rounded-full border border-white/60 shadow-2xl">
                  <span className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                    DATABASE
                  </span>
                  <div className="relative w-8 h-8 flex-shrink-0 hidden sm:block">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left-0 top-1/2 -translate-y-1/2 z-0"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                  </div>
                  <span className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                    & GAMES
                  </span>
                </div>

                <p className="text-lg md:text-xl text-gray-800 font-semibold max-w-3xl mx-auto leading-relaxed">
                  Explore our comprehensive collection of retro mobile gaming devices from 1975 to 2008, including
                  handheld consoles, proprietary systems, and mobile phones that shaped the history of mobile gaming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="container mx-auto px-4 mt-16 py-8 md:py-12">
          <div className="max-w-8xl mx-auto">
            <div className="bg-white/50 backdrop-blur-lg border border-gray-200/50 rounded-2xl p-6 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Filter Games</h2>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={resetFilters}
                    variant="ghost"
                    className="text-red-600 hover:text-red-700 hover:bg-red-100/50"
                  >
                    Reset All Filters
                  </Button>
                )}
              </div>

              {/* Search Bar */}
              <div className="relative mb-4">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500" />
                <Input
                  type="text"
                  placeholder="Search games by title, genre, developer..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1) // Reset page on search
                  }}
                  className="pl-12 bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 h-12 rounded-xl focus:border-red-500"
                />
              </div>

              {/* Filter Toggle Button */}
              <div className="flex items-center gap-3">
                <Button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl px-6 h-12 font-semibold"
                >
                  <SlidersHorizontal className="h-5 w-5 mr-2" />
                  Filters
                  {activeFiltersCount > 0 && (
                    <span className="ml-2 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold">
                      {activeFiltersCount}
                    </span>
                  )}
                </Button>
                <span className="text-gray-600 text-sm">
                  {loading
                    ? "Loading..."
                    : `${filteredGames.length} ${filteredGames.length === 1 ? "game" : "games"} found`}
                </span>
              </div>

              {/* Expandable Filters */}
              {isFilterOpen && (
                <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 p-6 bg-red-50/30 backdrop-blur-sm rounded-xl border border-red-200/50">
                  {/* Genre Filter */}
                  <div>
                    <label className="text-gray-900 font-semibold mb-2 block">Genre</label>
                    <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full bg-white/80 border border-gray-300 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {categories.map((cat) => (
                        <option key={cat} value={cat} className="bg-white text-gray-900">
                          {cat === "all" ? "All Genres" : cat}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <div>
                    <label className="text-gray-900 font-semibold mb-2 block">Year</label>
                    <select
                      value={selectedYear}
                      onChange={(e) => {
                        setSelectedYear(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full bg-white/80 border border-gray-300 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {years.map((year) => (
                        <option key={year} value={year} className="bg-white text-gray-900">
                          {year === "all" ? "All Years" : year}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Hardware Filter */}
                  <div>
                    <label className="text-gray-900 font-semibold mb-2 block">Hardware</label>
                    <select
                      value={selectedHardware}
                      onChange={(e) => {
                        setSelectedHardware(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="w-full bg-white/80 border border-gray-300 text-gray-900 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-red-500"
                    >
                      {hardwareOptions.map((hw) => (
                        <option key={hw} value={hw} className="bg-white text-gray-900">
                          {hw === "all" ? "All Hardware" : hw}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              {/* Active Filters Display */}
              {activeFiltersCount > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedCategory !== "all" && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {selectedCategory}
                      <button onClick={() => {setSelectedCategory("all"); setCurrentPage(1)}} className="hover:text-red-900">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {selectedYear !== "all" && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {selectedYear}
                      <button onClick={() => {setSelectedYear("all"); setCurrentPage(1)}} className="hover:text-red-900">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {selectedHardware !== "all" && (
                    <div className="bg-red-100 border border-red-300 text-red-700 px-3 py-1 rounded-full text-sm flex items-center gap-2">
                      {selectedHardware}
                      <button onClick={() => {setSelectedHardware("all"); setCurrentPage(1)}} className="hover:text-red-900">
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Game Grid */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
          
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-2xl aspect-square mb-4"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {paginatedGames.map((game, index) => (
                  <div
                    key={index}
                    className="group cursor-pointer bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg border border-red-700/30 rounded-2xl shadow-lg hover:shadow-red-500/40 transition-shadow flex flex-col overflow-hidden"
                    onClick={() => openGameModal(game)}
                  >
                    {/* Game Image Container */}
                    <div className="relative overflow-hidden w-full aspect-square bg-black/20">
                      <Image
                        src={getFirstImage(game.Pictures) || "/placeholder.svg"}
                        alt={game.Title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                        }}
                      />
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                          {game.Year}
                        </span>
                      </div>
                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Button className="bg-white text-red-600 hover:bg-gray-200 font-bold">View Details</Button>
                      </div>
                    </div>

                    {/* Game Info */}
                    <div className="p-6 space-y-1 text-white">
                      <h3 className="font-bold text-xl line-clamp-1 group-hover:text-red-100 transition-colors">
                        {game.Title}
                      </h3>
                      <p className="text-red-50/90 text-sm line-clamp-1">{game.Developers}</p>
                      <div className="flex items-center justify-between pt-2">
                        <p className="text-red-100/80 text-sm line-clamp-1">{game.Genre ? game.Genre.split(",")[0] : "Unknown Genre"}</p>
                        <p className="text-red-100/80 text-sm">{game.Hardware ? game.Hardware.split(",")[0] : "Unknown"}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredGames.length === 0 && (
              <div className="text-center py-20">
                <p className="text-gray-600 text-lg">No games found matching your filters.</p>
                <Button
                  onClick={resetFilters}
                  className="mt-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white"
                >
                  Reset Filters
                </Button>
              </div>
            )}

            {/* --- Pagination Controls --- */}
            {!loading && totalPages > 1 && (
              <div className="mt-16">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        variant="ghost"
                        className="hover:bg-red-50"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        <span className="ml-2">Previous</span>
                      </Button>
                    </PaginationItem>
                    
                    {getPageNumbers().map((page, index) => (
                      <PaginationItem key={index}>
                        {page === "..." ? (
                          <PaginationEllipsis />
                        ) : (
                          <PaginationLink
                            href="#"
                            onClick={(e) => {
                              e.preventDefault()
                              handlePageChange(page as number)
                            }}
                            isActive={currentPage === page}
                            className={`rounded-lg ${currentPage === page ? 'bg-red-600 text-white hover:bg-red-700 hover:text-white' : 'hover:bg-red-50'}`}
                          >
                            {page}
                          </PaginationLink>
                        )}
                      </PaginationItem>
                    ))}

                    <PaginationItem>
                      <Button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        variant="ghost"
                        className="hover:bg-red-50"
                      >
                        <span className="mr-2">Next</span>
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />

      <GameModal game={selectedGame} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}