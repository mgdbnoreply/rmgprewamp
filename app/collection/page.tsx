"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DonationButton } from "@/components/donation-button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Input } from "@/components/ui/input" // Import Input

// Import pagination components
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"

// Data for the collection grid, based on your screenshot and featured items
const collectionItems = [
  {
    category: 'phones',
    brand: 'Samsung',
    title: 'Samsung A107',
    year: '2010',
    description: 'Clamshell phone designed for basic calling and texting.',
    image: '/samsung-a107.jpg' // You will need to add this image to /public
  },
  {
    category: 'games',
    brand: 'N-Gage',
    title: 'Tiger Woods PGA Tour',
    year: '2004',
    description: 'Golf simulation game allowing character selection and 19-hole play.',
    image: '/tiger-woods-ngage.jpg' // You will need to add this image
  },
  {
    category: 'phones',
    brand: 'Nokia',
    title: 'Nokia 3310',
    year: '2000',
    description: 'Durable phone famous for its long battery life and pre-installed games.',
    image: '/nokia-3310.jpg' // You will need to add this image
  },
  {
    category: 'consoles',
    brand: 'Sega',
    title: 'Sega Game Gear',
    year: '1991',
    description: 'Handheld game console with a color screen requiring cartridges.',
    image: '/sega-game-gear.jpg' // You will need to add this image
  },
  {
    category: 'proprietary',
    brand: 'Tiger Electronics',
    title: 'Gigapet',
    year: '1997',
    description: 'Digital pet simulator with various animal themes including the "Digital Doggie" shown here.',
    image: '/gigapet.jpg' // You will need to add this image
  },
  {
    category: 'consoles',
    brand: 'Nintendo',
    title: 'Nintendo DSi XL',
    year: '2009/2010',
    description: 'Larger version of the DSi with dual screens and touch capability.',
    image: '/nintendo-dsi-xl.jpg' // You will need to add this image
  },
  {
    category: 'consoles',
    brand: 'Nintendo',
    title: 'Game & Watch Multiscreen',
    year: '1982',
    description: 'Innovative dual-screen clamshell design, a precursor to the Nintendo DS.',
    image: '/nintendo-game-and-watch-multiscreen-donkey-kong.jpg',
  },
  {
    category: 'proprietary',
    brand: 'Bandai',
    title: 'Tamagotchi',
    year: '1996',
    description: 'The original virtual pet that became a worldwide phenomenon.',
    image: '/original-tamagotchi-virtual-pet-1996.jpg',
  },
  {
    category: 'proprietary',
    brand: 'Mattel',
    title: 'Mattel Football',
    year: '1977',
    description: 'One of the earliest handheld electronic games.',
    image: '/mattel-football-handheld-electronic-game-1977.jpg',
  },
  {
    category: 'consoles',
    brand: 'Nintendo',
    title: 'Game Boy',
    year: '1989',
    description: 'The iconic 8-bit handheld that revolutionized portable gaming.',
    image: '/game-boy.jpg' // You will need to add this image
  },
  {
    category: 'phones',
    brand: 'Nokia',
    title: 'Nokia N-Gage',
    year: '2003',
    description: 'An early smartphone/handheld game system hybrid.',
    image: '/nokia-n-gage.jpg' // You will need to add this image
  },
  {
    category: 'games',
    brand: 'Nokia',
    title: 'Snake',
    year: '1997',
    description: 'The classic game pre-installed on countless Nokia phones.',
    image: '/nokia-snake-game.jpg' // You will need to add this image
  },
]

// Filter tabs from your screenshot
const filters = [
  { id: "all", label: "All Devices" },
  { id: "consoles", label: "Consoles" },
  { id: "proprietary", label: "Proprietary" },
  { id: "games", label: "Games" },
  { id: "phones", label: "Phones" },
]

// Badge color helper for new gradient cards
const badgeColorClasses: { [key: string]: string } = {
  phones: "bg-green-800/50 text-green-200 border border-green-500/50",
  games: "bg-blue-800/50 text-blue-200 border border-blue-500/50",
  consoles: "bg-red-800/50 text-red-200 border border-red-500/50",
  proprietary: "bg-purple-800/50 text-purple-200 border border-purple-500/50",
}

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9 // 3x3 grid

  // --- Filtering Logic ---
  const filteredItems = collectionItems.filter(item => {
    const matchesFilter = activeFilter === 'all' || item.category === activeFilter;
    const matchesSearch = 
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  })

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  )

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top on page change
  }

  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Helper to generate page numbers for pagination
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
        start = Math.max(end - maxPagesToShow + 1, 1);
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

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="relative z-10">
        
        {/* Hero Section (New Glass Design) */}
        <section className="container mx-auto px-4 mt-16 py-8 md:py-12">
          <div className="max-w-8xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 md:p-12 border border-red-200 shadow-lg">
              
              {/* Logo text updated with gradient and font size */}
              <div className="relative inline-flex items-center justify-center gap-5 group mb-8 p-6 bg-white/50 backdrop-blur-lg rounded-full border border-gray-200/50 shadow-2xl">
                <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  COLLECTION
                </span>
                <div className="relative w-8 h-8 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left- top-1/2 -translate-y-1/2 z-0"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  & EXPERIENCE
                </span>
              </div>

              
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                
Explore our comprehensive collection of retro mobile gaming devices from 1975 to 2008, including handheld
              consoles, proprietary systems, games, and mobile phones that shaped the history of mobile gaming.              </p>
            </div>
          </div>
        </section>


        {/* Filter Tabs + Search (NEW DESIGN) */}
        <section className="relative py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto p-6 bg-white/50 backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-2xl">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-4">
              {/* Search Bar */}
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search collection..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1) // Reset page on search
                  }}
                  className="pl-12 pr-4 py-6 h-16 bg-white/80 border-gray-300 text-lg text-gray-900 placeholder:text-gray-500 rounded-xl focus:border-red-500 focus:ring-red-500"
                />
              </div>
              {/* Filter Tabs */}
              <div className="flex flex-wrap justify-center gap-3">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    onClick={() => {
                      setActiveFilter(filter.id)
                      setCurrentPage(1) // Reset page on filter change
                    }}
                    className={`px-6 py-5 text-base font-bold rounded-xl transition-all shadow-md hover:shadow-lg ${
                      activeFilter === filter.id
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* New Collection Grid (Gradient Glass Cards) */}
        <section className="relative py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {paginatedItems.length === 0 ? (
                <div className="md:col-span-3 text-center py-20">
                  <p className="text-gray-600 text-lg">No items found. Try adjusting your search or filters.</p>
                </div>
              ) : (
                paginatedItems.map((item, index) => (
                  <div
                    key={index}
                    className="group relative bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-red-500/40 transition-shadow flex flex-col overflow-hidden border border-red-700/30"
                  >
                    <div className="relative h-64 w-full bg-white/10 p-4">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-contain p-4 group-hover:scale-105 transition-transform duration-500" // Use contain
                      />
                      <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm text-white px-3 py-1 rounded-full font-bold text-xs shadow-md">
                        {item.year}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow text-white">
                      <div className="flex items-center gap-2 mb-2">
                        <span className={cn(
                          "px-3 py-1 rounded-full font-semibold text-xs backdrop-blur-sm",
                          badgeColorClasses[item.category] || "bg-gray-800/50 text-gray-200 border border-gray-500/50"
                        )}>
                          {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                        </span>
                        <span className="text-sm font-semibold text-red-100">{item.brand}</span>
                      </div>
                      <h3 className="text-2xl font-bold mb-2 text-white">{item.title}</h3>
                      <p className="text-red-50/90 leading-relaxed flex-grow">{item.description}</p>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* --- Pagination Component --- */}
            {totalPages > 1 && (
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

        {/* Donation Section (Red-Tinted Glass) */}
        <section className="relative py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <div className="bg-gradient-to-br from-red-600/90 to-black/90 backdrop-blur-lg border border-red-700/30 rounded-3xl p-8 md:p-12 shadow-2xl text-white">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-6 text-center">
                Help Preserve the History of Mobile Gaming!
              </h2>
              <p className="text-xl text-white/90 mb-8 text-center">
                The Retro Mobile Gaming Collection, soon to be hosted at Northeastern University, is now accepting
                donations!
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">We're seeking donations of:</h3>
                  <ul className="space-y-3 text-white/90">
                    <li className="flex items-start gap-3">
                      <span className="font-bold">•</span>
                      <span>Vintage handheld gaming devices (Game Boy, Game Gear, PSP, etc.)</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold">•</span>
                      <span>Early mobile phones with gaming capabilities</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold">•</span>
                      <span>Cartridges, memory cards, and gaming accessories</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold">•</span>
                      <span>Original packaging, manuals, and promotional materials</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="font-bold">•</span>
                      <span>Development documentation and design materials</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <h3 className="text-2xl font-bold text-white mb-4">Your Impact:</h3>
                  <p className="text-white/90 leading-relaxed mb-6">
                    Your contributions will support our mission to document, preserve, and showcase the technological
                    innovation, artistic design, and cultural significance of mobile gaming.
                  </p>
                  <div className="bg-white/10 rounded-xl p-4 border border-white/20">
                    <p className="text-sm text-white/80">
                      <strong>Please note:</strong> These donations are NOT tax-deductible as the items are being
                      donated to a research project.
                    </p>
                  </div>
                </div>
              </div>

              <div className="text-center">
                <p className="text-white/90 mb-6">
                  Should you have any questions or would like to connect about donating items, please contact us:
                </p>
                <Button className="bg-white hover:bg-gray-100 text-red-600 px-8 py-6 text-lg font-bold rounded-full shadow-lg transition-all">
                  TransformativeMedia@northeastern.edu
                </Button>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      <DonationButton />
      {/* Note: Modal functionality is not included in this static page build,
          but can be re-added by importing GameModal and its state */}
    </div>
  )
}