"use client"

import { useState, useEffect, useMemo } from "react"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Search, SlidersHorizontal, X, ChevronLeft, ChevronRight, Gamepad2, Calendar, HardDrive, Wifi, Filter } from "lucide-react"
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

export default function DatabasePage() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Filter States
  const [yearRange, setYearRange] = useState<[number, number]>([1975, 2008])
  const [selectedGenres, setSelectedGenres] = useState<string[]>([])
  const [selectedHardware, setSelectedHardware] = useState<string>("all")
  const [selectedConnectivity, setSelectedConnectivity] = useState<string>("all")
  
  const [isFilterOpen, setIsFilterOpen] = useState(true) // Default open to show new controls
  const [games, setGames] = useState<GameData[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedGame, setSelectedGame] = useState<GameData | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Pagination
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  useEffect(() => {
    async function fetchGames() {
      try {
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
        setLoading(false)
      } catch (error) {
        console.error("Error fetching games:", error)
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  // Derive unique filter options
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

  // Filtering Logic
  const filteredGames = games.filter((game) => {
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

  const activeFiltersCount = (selectedGenres.length > 0 ? 1 : 0) + 
                             (selectedHardware !== "all" ? 1 : 0) + 
                             (selectedConnectivity !== "all" ? 1 : 0) +
                             (yearRange[0] !== minGameYear || yearRange[1] !== maxGameYear ? 1 : 0)

  const resetFilters = () => {
    setYearRange([minGameYear, maxGameYear])
    setSelectedGenres([])
    setSelectedHardware("all")
    setSelectedConnectivity("all")
    setSearchQuery("")
    setCurrentPage(1)
  }

  // Pagination Logic
  const totalPages = Math.ceil(filteredGames.length / itemsPerPage)
  const paginatedGames = filteredGames.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handleGenreChange = (genre: string, checked: boolean) => {
    setSelectedGenres(prev => 
      checked ? [...prev, genre] : prev.filter(g => g !== genre)
    )
    setCurrentPage(1)
  }

  // Helper to get first image
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
                Dive into our comprehensive collection of retro mobile gaming history. Use the advanced filters below to find games by year, genre, platform, and more.
              </p>
            </div>
          </div>
        </section>

        {/* --- Advanced Filter Section --- */}
        <section className="container mx-auto px-4 -mt-16 relative z-20 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
              
              {/* Top Bar: Search & Toggle */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-8">
                 <div className="relative w-full md:max-w-lg">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search by title or developer..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-12 h-12 bg-gray-50 border-gray-200 text-gray-900 rounded-xl focus:border-red-500 focus:ring-red-500/20 text-base"
                  />
                </div>
                
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <Button
                    onClick={() => setIsFilterOpen(!isFilterOpen)}
                    variant={isFilterOpen ? "secondary" : "outline"}
                    className="h-12 px-6 rounded-xl font-semibold border-gray-200"
                  >
                    <SlidersHorizontal className="h-4 w-4 mr-2" />
                    {isFilterOpen ? "Hide Filters" : "Show Filters"}
                    {activeFiltersCount > 0 && (
                      <Badge className="ml-2 bg-red-600 text-white h-5 w-5 p-0 flex items-center justify-center rounded-full">
                        {activeFiltersCount}
                      </Badge>
                    )}
                  </Button>
                  {activeFiltersCount > 0 && (
                     <Button onClick={resetFilters} variant="ghost" className="h-12 text-red-600 hover:text-red-700 hover:bg-red-50 rounded-xl">
                       Reset
                     </Button>
                  )}
                </div>
              </div>

              {/* Expanded Filter Controls */}
              {isFilterOpen && (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6 border-t border-gray-100 animate-in fade-in slide-in-from-top-2">
                  
                  {/* Left Column: Genre Checkboxes */}
                  <div className="lg:col-span-3 space-y-4">
                    <div className="flex items-center gap-2 text-gray-900 font-bold">
                      <Gamepad2 className="w-4 h-4 text-red-500" /> Genres
                    </div>
                    <ScrollArea className="h-[280px] w-full rounded-xl border border-gray-100 bg-gray-50 p-4">
                      <div className="space-y-3">
                        {allGenres.map((genre) => (
                          <div key={genre} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`genre-${genre}`} 
                              checked={selectedGenres.includes(genre)}
                              onCheckedChange={(checked) => handleGenreChange(genre, checked as boolean)}
                              className="data-[state=checked]:bg-red-600 data-[state=checked]:border-red-600"
                            />
                            <label
                              htmlFor={`genre-${genre}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer text-gray-700 hover:text-gray-900"
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
                    <div className="space-y-4 bg-gray-50 p-6 rounded-xl border border-gray-100">
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-2 text-gray-900 font-bold">
                            <Calendar className="w-4 h-4 text-red-500" /> Release Year
                         </div>
                         <span className="text-sm font-mono text-red-600 font-bold bg-white px-2 py-1 rounded border border-red-100">
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
                      <div className="flex justify-between text-xs text-gray-400">
                        <span>{minGameYear}</span>
                        <span>{maxGameYear}</span>
                      </div>
                    </div>

                     {/* Connectivity Select */}
                     <div className="space-y-2">
                       <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <Wifi className="w-4 h-4 text-red-500" /> Connectivity
                       </label>
                       <Select value={selectedConnectivity} onValueChange={(val) => {setSelectedConnectivity(val); setCurrentPage(1)}}>
                        <SelectTrigger className="w-full h-12 bg-white border-gray-200 rounded-xl">
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
                       <label className="text-sm font-bold text-gray-900 flex items-center gap-2">
                          <HardDrive className="w-4 h-4 text-red-500" /> Platform / Hardware
                       </label>
                       <Select value={selectedHardware} onValueChange={(val) => {setSelectedHardware(val); setCurrentPage(1)}}>
                        <SelectTrigger className="w-full h-12 bg-white border-gray-200 rounded-xl">
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
                    <div className="bg-red-50 rounded-xl p-6 border border-red-100 mt-6 text-center">
                      <p className="text-red-900 font-medium mb-1">Found</p>
                      <p className="text-4xl font-black text-red-600">{filteredGames.length}</p>
                      <p className="text-red-800/70 text-sm mt-1">Games matching criteria</p>
                    </div>
                  </div>

                </div>
              )}
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
                        onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                        disabled={currentPage === 1}
                        variant="ghost"
                        className="hover:bg-red-50 text-gray-600 hover:text-red-600"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" /> Previous
                      </Button>
                    </PaginationItem>
                    
                    <div className="hidden md:flex items-center gap-1">
                      <span className="text-sm font-medium text-gray-600 px-4">
                         Page {currentPage} of {totalPages}
                      </span>
                    </div>

                    <PaginationItem>
                      <Button
                        onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
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