"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, ChevronLeft, ChevronRight, Gamepad2, Filter } from "lucide-react"
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
import { Badge } from "@/components/ui/badge"

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [selectedYear, setSelectedYear] = useState<string>("")
  const [selectedHardware, setSelectedHardware] = useState<string>("")
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

  const categories = Array.from(new Set(games.map((g) => g.Genre?.split(",")[0]).filter(Boolean))).sort()
  const years = Array.from(new Set(games.map((g) => g.Year).filter(Boolean))).sort().reverse()
  const hardwareOptions = Array.from(new Set(games.map((g) => g.Hardware?.split(",")[0].trim()).filter(Boolean))).sort()

  const filteredGames = games.filter((game) => {
    const matchesSearch =
      game.Title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.Genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.Hardware.toLowerCase().includes(searchQuery.toLowerCase()) ||
      game.Developers.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesCategory = !selectedCategory || game.Genre.includes(selectedCategory)
    const matchesYear = !selectedYear || game.Year === selectedYear
    const matchesHardware = !selectedHardware || game.Hardware.includes(selectedHardware)
    
    return matchesSearch && matchesCategory && matchesYear && matchesHardware
  })

  const resetFilters = () => {
    setSelectedCategory("")
    setSelectedYear("")
    setSelectedHardware("")
    setSearchQuery("")
    setCurrentPage(1)
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
    <div className="min-h-screen bg-neutral-50 text-gray-900 font-sans">
      <Header />

      <main className="relative z-10 pb-0">
        
        {/* --- Hero Section --- */}
        <section className="relative w-full mt-20 py-24 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/database.jpg"
              alt="Database Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                Game Library
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                Explore the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Database
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Dive into our comprehensive collection of retro mobile gaming history, featuring thousands of games, technical specifications, and historical context.
              </p>
            </div>
          </div>
        </section>

        {/* --- Filter Section (Updated Style) --- */}
        <section className="container mx-auto px-4 -mt-16 relative z-20 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
              <div className="flex flex-col md:flex-row gap-6 items-center">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search games by title, genre, developer..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-12 h-14 bg-gray-50 border-gray-200 text-gray-900 rounded-xl focus:border-red-500 focus:ring-red-500/20 text-lg"
                  />
                </div>

                {/* Filter Controls */}
                <div className="flex flex-wrap gap-3 w-full md:w-auto">
                  {/* Genre Filter */}
                  <div className="relative">
                     <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 pointer-events-none" />
                     <select
                      value={selectedCategory}
                      onChange={(e) => {
                        setSelectedCategory(e.target.value)
                        setCurrentPage(1)
                      }}
                      className="h-14 pl-10 pr-8 bg-white border border-gray-200 text-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 cursor-pointer hover:bg-gray-50 transition-colors appearance-none min-w-[160px]"
                    >
                      <option value="">All Genres</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  {/* Year Filter */}
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedYear(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="h-14 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <option value="">All Years</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>

                  {/* Hardware Filter */}
                  <select
                    value={selectedHardware}
                    onChange={(e) => {
                      setSelectedHardware(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="h-14 px-4 bg-white border border-gray-200 text-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 cursor-pointer hover:bg-gray-50 transition-colors max-w-[160px]"
                  >
                    <option value="">All Hardware</option>
                    {hardwareOptions.map(hw => (
                      <option key={hw} value={hw}>{hw}</option>
                    ))}
                  </select>

                  <Button 
                    onClick={resetFilters}
                    variant="outline"
                    className="h-14 px-6 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl font-semibold"
                  >
                    Reset
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Game Grid Section --- */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-8xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {[...Array(12)].map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-2xl aspect-[4/5] animate-pulse"></div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {paginatedGames.map((game, index) => (
                  <div
                    key={index}
                    onClick={() => openGameModal(game)}
                    className="group cursor-pointer relative bg-gradient-to-br from-red-600 to-red-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-2 border border-red-500/20"
                  >
                    {/* Image */}
                    <div className="relative w-full aspect-square overflow-hidden bg-black/20">
                      <Image
                        src={getFirstImage(game.Pictures) || "/placeholder.svg"}
                        alt={game.Title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => {
                          ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                        }}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                      
                      {/* Year Badge */}
                      <div className="absolute top-4 right-4">
                        <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10 shadow-sm">
                          {game.Year}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-white mb-2 line-clamp-1 group-hover:text-red-100 transition-colors">
                        {game.Title}
                      </h3>
                      <p className="text-red-100/80 text-sm mb-4 line-clamp-1">
                        {game.Developers}
                      </p>
                      
                      <div className="flex flex-wrap gap-2 mt-auto">
                        <Badge variant="secondary" className="bg-black/30 text-white hover:bg-black/40 border-0 backdrop-blur-sm">
                          {game.Genre ? game.Genre.split(",")[0] : "Game"}
                        </Badge>
                        <Badge variant="outline" className="text-red-100 border-red-400/30">
                          {game.Hardware ? game.Hardware.split(",")[0] : "Platform"}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {!loading && filteredGames.length === 0 && (
              <div className="text-center py-24 bg-white rounded-3xl border border-gray-100 shadow-sm">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-red-500" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">No games found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms.</p>
                <Button
                  onClick={resetFilters}
                  className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8"
                >
                  Clear Filters
                </Button>
              </div>
            )}

            {/* --- Pagination --- */}
            {!loading && totalPages > 1 && (
              <div className="mt-16">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        variant="ghost"
                        className="hover:bg-red-50 text-gray-600 hover:text-red-600"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
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
                            className={`rounded-lg w-10 h-10 ${
                              currentPage === page 
                                ? 'bg-red-600 text-white hover:bg-red-700 hover:text-white' 
                                : 'hover:bg-red-50 text-gray-600'
                            }`}
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
                        className="hover:bg-red-50 text-gray-600 hover:text-red-600"
                      >
                        Next <ChevronRight className="h-4 w-4 ml-2" />
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