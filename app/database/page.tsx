"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  ChevronLeft, 
  ChevronRight,
  Calendar,
  Gamepad2,
  Package,
  TrendingUp,
  Archive,
  Clock,
  Cpu,
  Globe
} from "lucide-react"
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
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

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
    setCurrentPage(1)
  }

  // --- Statistics ---
  const stats = {
    totalGames: games.length,
    totalGenres: Array.from(new Set(games.map((g) => g.Genre).filter(Boolean))).length,
    totalHardware: Array.from(new Set(games.map((g) => g.Hardware.split(",")[0].trim()).filter(Boolean))).length,
    yearRange: games.length > 0 ? `${Math.min(...games.map(g => parseInt(g.Year)).filter(y => !isNaN(y)))} - ${Math.max(...games.map(g => parseInt(g.Year)).filter(y => !isNaN(y)))}` : "N/A"
  }

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage)
  
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white text-gray-900">
      <Header />

      <main className="relative z-10">
        
        {/* --- Enhanced Hero Section with Red Gradient --- */}
        <section className="relative w-full mt-16 py-20 md:py-28 overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/database.jpg"
              alt="Database Background"
              fill
              className="object-cover"
              priority
            />
            {/* Red Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-900/90 via-red-800/80 to-black/90"></div>
          </div>

          {/* Subtle Pattern Overlay */}
          <div className="absolute inset-0 opacity-20 z-10">
            <div className="absolute inset-0" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }} />
          </div>

          {/* Content */}
          <div className="container relative z-20 mx-auto px-4">
            <div className="max-w-5xl mx-auto text-center">
              {/* Title with Design Similar to Reference */}
              <div className="mb-8">
                <div className="inline-flex items-center justify-center flex-wrap gap-4">
                  <span className="text-5xl md:text-7xl font-black uppercase tracking-tight">
                    <span className="bg-gradient-to-r from-red-500 to-red-700 bg-clip-text text-transparent">GAME</span>
                  </span>
                  <div className="relative">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-gray-400 to-gray-600"></div>
                    <div className="absolute inset-0 w-12 h-12 md:w-16 md:h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 opacity-60"></div>
                  </div>
                  <span className="text-5xl md:text-7xl font-black uppercase tracking-tight">
                    <span className="text-white">DATABASE</span>
                  </span>
                </div>
              </div>

              <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-red-600/30 to-red-500/30 backdrop-blur-sm rounded-full border border-red-400/40 mb-6">
                <Archive className="w-4 h-4 text-red-300" />
                <span className="text-sm font-medium text-red-200">Retro Mobile Gaming Archive</span>
              </div>
              
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto mb-8 leading-relaxed">
                Explore our comprehensive collection of retro mobile gaming history, featuring thousands of games from the golden era of handheld gaming.
              </p>

              {/* Statistics Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Gamepad2 className="w-5 h-5 text-red-300" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">{stats.totalGames}</div>
                  <div className="text-xs text-red-200">Total Games</div>
                </div>
                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Package className="w-5 h-5 text-red-300" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">{stats.totalGenres}</div>
                  <div className="text-xs text-red-200">Genres</div>
                </div>
                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Cpu className="w-5 h-5 text-red-300" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">{stats.totalHardware}</div>
                  <div className="text-xs text-red-200">Platforms</div>
                </div>
                <div className="bg-gradient-to-br from-red-600/20 to-red-800/20 backdrop-blur-sm rounded-xl p-4 border border-red-500/30">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <Calendar className="w-5 h-5 text-red-300" />
                  </div>
                  <div className="text-2xl font-bold bg-gradient-to-r from-white to-red-200 bg-clip-text text-transparent">{stats.yearRange}</div>
                  <div className="text-xs text-red-200">Year Range</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Filter Section */}
        <section className="container mx-auto px-4 py-8">
          <div className="max-w-7xl mx-auto">
            {/* Search and Filter Bar */}
            <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl shadow-lg border border-red-100 p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* Search Input */}
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-red-400" />
                  <Input
                    type="text"
                    placeholder="Search games, developers, genres..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-12 h-12 text-base border-red-200 focus:border-red-500 focus:ring-red-500/20 bg-white/80"
                  />
                </div>

                {/* Filter and View Controls */}
                <div className="flex gap-2">
                  <Button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    variant={isFilterOpen ? "default" : "outline"}
                    className={`h-12 px-6 ${isFilterOpen ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' : 'border-red-200 hover:bg-red-50 text-red-700'}`}
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    Filters
                    {activeFiltersCount > 0 && (
                      <span className="ml-2 bg-white/20 rounded-full px-2 py-0.5 text-xs font-medium">
                        {activeFiltersCount}
                      </span>
                    )}
                  </Button>
                  
                  {/* View Mode Toggle */}
                  <div className="hidden md:flex border border-red-200 rounded-lg overflow-hidden bg-white">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className={`rounded-none h-12 px-4 ${viewMode === "grid" ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' : 'hover:bg-red-50 text-red-700'}`}
                    >
                      Grid
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className={`rounded-none h-12 px-4 ${viewMode === "list" ? 'bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white' : 'hover:bg-red-50 text-red-700'}`}
                    >
                      List
                    </Button>
                  </div>
                </div>
              </div>

              {/* Results Count */}
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-red-700">
                  Showing <span className="font-semibold">{paginatedGames.length}</span> of{" "}
                  <span className="font-semibold">{filteredGames.length}</span> games
                </p>
                {activeFiltersCount > 0 && (
                  <Button
                    onClick={resetFilters}
                    variant="ghost"
                    size="sm"
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>

              {/* Expanded Filters */}
              {isFilterOpen && (
                <div className="mt-6 pt-6 border-t border-red-200">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-red-900 mb-2">
                        <Package className="inline w-4 h-4 mr-1" />
                        Genre
                      </label>
                      <select
                        value={selectedCategory}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="w-full h-10 px-3 bg-white border border-red-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>
                            {cat === "all" ? "All Genres" : cat}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-red-900 mb-2">
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Year
                      </label>
                      <select
                        value={selectedYear}
                        onChange={(e) => {
                          setSelectedYear(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="w-full h-10 px-3 bg-white border border-red-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      >
                        {years.map((year) => (
                          <option key={year} value={year}>
                            {year === "all" ? "All Years" : year}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-red-900 mb-2">
                        <Cpu className="inline w-4 h-4 mr-1" />
                        Hardware
                      </label>
                      <select
                        value={selectedHardware}
                        onChange={(e) => {
                          setSelectedHardware(e.target.value)
                          setCurrentPage(1)
                        }}
                        className="w-full h-10 px-3 bg-white border border-red-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500"
                      >
                        {hardwareOptions.map((hw) => (
                          <option key={hw} value={hw}>
                            {hw === "all" ? "All Hardware" : hw}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Active Filter Tags */}
                  {activeFiltersCount > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {selectedCategory !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-800 rounded-full text-sm">
                          {selectedCategory}
                          <button 
                            onClick={() => {setSelectedCategory("all"); setCurrentPage(1)}}
                            className="ml-1 hover:text-red-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedYear !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-800 rounded-full text-sm">
                          {selectedYear}
                          <button 
                            onClick={() => {setSelectedYear("all"); setCurrentPage(1)}}
                            className="ml-1 hover:text-red-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                      {selectedHardware !== "all" && (
                        <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-800 rounded-full text-sm">
                          {selectedHardware}
                          <button 
                            onClick={() => {setSelectedHardware("all"); setCurrentPage(1)}}
                            className="ml-1 hover:text-red-900"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Game Grid Section */}
        <section className="pb-16 px-4">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="animate-pulse">
                    <div className="bg-gray-200 rounded-xl aspect-[4/5] mb-3"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <div className={viewMode === "grid" 
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
              }>
                {paginatedGames.map((game, index) => (
                  viewMode === "grid" ? (
                    <div
                      key={index}
                      className="group cursor-pointer bg-white rounded-xl shadow-md border border-red-100 hover:shadow-xl hover:border-red-300 transition-all duration-300 overflow-hidden hover:scale-[1.02]"
                      onClick={() => openGameModal(game)}
                    >
                      {/* Game Image */}
                      <div className="relative overflow-hidden aspect-[4/5] bg-gradient-to-br from-red-100 to-gray-100">
                        <Image
                          src={getFirstImage(game.Pictures) || "/placeholder.svg"}
                          alt={game.Title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                          }}
                        />
                        {/* Year Badge */}
                        <div className="absolute top-3 right-3">
                          <span className="px-2 py-1 bg-gradient-to-r from-red-600 to-red-700 text-white text-xs font-medium rounded-md shadow-lg">
                            {game.Year}
                          </span>
                        </div>
                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-900/90 via-red-800/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <p className="text-sm font-medium mb-2 flex items-center">View Details <ChevronRight className="w-4 h-4 ml-1" /></p>
                          </div>
                        </div>
                      </div>

                      {/* Game Info */}
                      <div className="p-4 bg-gradient-to-b from-white to-red-50/30">
                        <h3 className="font-semibold text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                          {game.Title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-1 mt-1">{game.Developers}</p>
                        <div className="flex items-center gap-2 mt-3">
                          <span className="inline-block px-2 py-1 bg-gradient-to-r from-red-100 to-red-200 text-red-700 text-xs rounded-md font-medium">
                            {game.Genre ? game.Genre.split(",")[0] : "Unknown"}
                          </span>
                          <span className="inline-block px-2 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 text-xs rounded-md font-medium">
                            {game.Hardware ? game.Hardware.split(",")[0] : "Unknown"}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div
                      key={index}
                      className="group cursor-pointer bg-gradient-to-r from-white to-red-50/50 rounded-xl shadow-sm border border-red-100 hover:shadow-md hover:border-red-300 transition-all duration-300 p-4"
                      onClick={() => openGameModal(game)}
                    >
                      <div className="flex gap-4">
                        {/* Thumbnail */}
                        <div className="relative w-24 h-24 flex-shrink-0 overflow-hidden rounded-lg bg-gradient-to-br from-red-100 to-gray-100">
                          <Image
                            src={getFirstImage(game.Pictures) || "/placeholder.svg"}
                            alt={game.Title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                            }}
                          />
                        </div>
                        {/* Details */}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-900 group-hover:text-red-600 transition-colors">
                            {game.Title}
                          </h3>
                          <p className="text-sm text-gray-600 mt-1">{game.Developers}</p>
                          <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4 text-red-400" />
                              {game.Year}
                            </span>
                            <span className="flex items-center gap-1">
                              <Package className="w-4 h-4 text-red-400" />
                              {game.Genre ? game.Genre.split(",")[0] : "Unknown"}
                            </span>
                            <span className="flex items-center gap-1">
                              <Cpu className="w-4 h-4 text-red-400" />
                              {game.Hardware ? game.Hardware.split(",")[0] : "Unknown"}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                ))}
              </div>
            )}

            {!loading && filteredGames.length === 0 && (
              <div className="text-center py-20 px-4">
                <div className="max-w-sm mx-auto">
                  <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">No games found</h3>
                  <p className="text-gray-600 mb-6">Try adjusting your filters or search terms to find what you're looking for.</p>
                  <Button
                    onClick={resetFilters}
                    className="bg-red-600 hover:bg-red-700 text-white"
                  >
                    Clear all filters
                  </Button>
                </div>
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-12">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                      >
                        <ChevronLeft className="h-4 w-4 mr-1" />
                        Previous
                      </Button>
                    </PaginationItem>
                    
                    <div className="hidden md:flex items-center gap-1">
                      {getPageNumbers().map((page, index) => (
                        <PaginationItem key={index}>
                          {page === "..." ? (
                            <PaginationEllipsis className="w-9" />
                          ) : (
                            <PaginationLink
                              href="#"
                              onClick={(e) => {
                                e.preventDefault()
                                handlePageChange(page as number)
                              }}
                              isActive={currentPage === page}
                              className={`h-9 w-9 ${
                                currentPage === page 
                                  ? 'bg-red-600 text-white hover:bg-red-700 border-red-600' 
                                  : 'hover:bg-gray-50 border-gray-200'
                              }`}
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                    </div>

                    <div className="md:hidden flex items-center gap-2 px-3">
                      <span className="text-sm text-gray-600">
                        Page {currentPage} of {totalPages}
                      </span>
                    </div>

                    <PaginationItem>
                      <Button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        variant="outline"
                        size="sm"
                        className="h-9 px-3 border-gray-200 hover:bg-gray-50 disabled:opacity-50"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Button>
                    </PaginationItem>
                  </PaginationContent>
                </Pagination>
              </div>
            )}
          </div>
        </section>

        {/* Additional Information Section */}
        <section className="py-16 px-4 bg-gray-50 border-t border-gray-200">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Globe className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Global Collection</h3>
                <p className="text-sm text-gray-600">Games from developers worldwide, showcasing the diversity of mobile gaming history</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Clock className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Historical Archive</h3>
                <p className="text-sm text-gray-600">Preserving decades of mobile gaming innovation for research and education</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-6 h-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Growing Database</h3>
                <p className="text-sm text-gray-600">Continuously expanding with new discoveries and community contributions</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <GameModal game={selectedGame} isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}