"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DonationButton } from "@/components/donation-button"
import { ChevronLeft, ChevronRight, Search, SlidersHorizontal, X, Smartphone, Gamepad, Monitor, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { GameAPI } from "@/services/api"
import type { CollectionData } from "@/lib/types"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Filter tabs
const filters = [
  { id: "all", label: "All Devices", icon: Gamepad },
  { id: "console", label: "Consoles", icon: Monitor },
  { id: "proprietary", label: "Proprietary", icon: Gamepad },
  { id: "phone", label: "Phones", icon: Smartphone },
]

// Badge color helper
const badgeColorClasses: { [key: string]: string } = {
  phone: "bg-green-100 text-green-700 border-green-200",
  game: "bg-blue-100 text-blue-700 border-blue-200",
  console: "bg-red-100 text-red-700 border-red-200",
  proprietary: "bg-purple-100 text-purple-700 border-purple-200",
}

export default function CollectionPage() {
  const [activeFilter, setActiveFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [loading, setLoading] = useState(true)

  // --- Pagination State ---
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 9

  // --- Fetch Data ---
  useEffect(() => {
    async function fetchCollections() {
      try {
        const response = await GameAPI.getCollections()
        if (Array.isArray(response)) {
          setCollections(response)
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching collections:", error)
        setLoading(false)
      }
    }
    fetchCollections()
  }, [])

  // --- Filtering Logic ---
  const filteredItems = collections.filter((item) => {
    const itemCategory = item.category ? item.category.toLowerCase() : ""
    const matchesFilter =
      activeFilter === "all" ||
      itemCategory === activeFilter ||
      activeFilter.includes(itemCategory) ||
      itemCategory.includes(activeFilter)

    const matchesSearch =
      (item.name && item.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.maker && item.maker.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()))

    return matchesFilter && matchesSearch
  })

  // --- Pagination Logic ---
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage)
  
  useEffect(() => {
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1)
    }
  }, [filteredItems.length, totalPages, currentPage])

  const paginatedItems = filteredItems.slice(
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

  const getImage = (url: string | undefined) => {
    if (!url) return "/placeholder.svg"
    return url
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 font-sans">
      <Header />

      <main className="relative z-10 pb-0">
        
        {/* --- Hero Section (New Design) --- */}
        <section className="relative w-full mt-20 py-24 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/collection.jpg"
              alt="Collection Background"
              fill
              className="object-cover opacity-50"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-7xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                Hardware Archive
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                Device & &nbsp;
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Console Collection
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Explore our comprehensive collection of retro mobile gaming devices from 1975 to 2008, including handheld consoles, proprietary systems, and mobile phones.
              </p>
            </div>
          </div>
        </section>

        {/* --- Filter & Search Section --- */}
        <section className="container mx-auto px-4 -mt-16 relative z-20 mb-12">
          <div className="max-w-7xl mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-6 md:p-8">
              
              <div className="flex flex-col lg:flex-row gap-6 items-center">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search collection..."
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value)
                      setCurrentPage(1)
                    }}
                    className="pl-12 h-14 bg-gray-50 border-gray-200 text-gray-900 rounded-xl focus:border-red-500 focus:ring-red-500/20 text-lg"
                  />
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2 w-full lg:w-auto justify-center">
                  {filters.map((filter) => {
                    const Icon = filter.icon
                    return (
                      <Button
                        key={filter.id}
                        onClick={() => {
                          setActiveFilter(filter.id)
                          setCurrentPage(1)
                        }}
                        variant={activeFilter === filter.id ? "default" : "outline"}
                        className={`h-12 px-6 rounded-xl font-semibold transition-all flex items-center gap-2 ${
                          activeFilter === filter.id
                            ? "bg-gray-900 text-white hover:bg-black border-transparent"
                            : "bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:text-gray-900 hover:border-gray-300"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                        {filter.label}
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Active Filter Summary */}
              <div className="mt-6 flex items-center justify-between border-t border-gray-100 pt-4">
                <p className="text-gray-500 text-sm font-medium">
                  {loading ? "Loading items..." : `Showing ${filteredItems.length} devices`}
                </p>
                {(activeFilter !== "all" || searchQuery) && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => { setActiveFilter("all"); setSearchQuery(""); }}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    Clear Filters <X className="ml-1 h-3 w-3" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* --- Collection Grid --- */}
        <section className="container mx-auto px-4 pb-24">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="bg-white rounded-2xl h-[400px] animate-pulse border border-gray-100 shadow-sm">
                    <div className="h-64 bg-gray-100 rounded-t-2xl"></div>
                    <div className="p-6 space-y-3">
                      <div className="h-6 bg-gray-100 rounded w-3/4"></div>
                      <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedItems.length === 0 ? (
                  <div className="col-span-full py-20 text-center bg-white rounded-3xl border border-gray-100 shadow-sm">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No items found</h3>
                    <p className="text-gray-500">Try adjusting your filters or search terms.</p>
                  </div>
                ) : (
                  paginatedItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 hover:border-red-100 transform hover:-translate-y-1"
                    >
                      {/* Image Area */}
                      <div className="relative h-72 w-full bg-gray-50 p-8 flex items-center justify-center group-hover:bg-white transition-colors">
                        <Image
                          src={getImage(item.image)}
                          alt={item.name || "Collection item"}
                          fill
                          className="object-contain p-4 group-hover:scale-110 transition-transform duration-500 drop-shadow-sm"
                          onError={(e) => {
                            ;(e.target as HTMLImageElement).src = "/placeholder.svg"
                          }}
                        />
                        {item.year && (
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full font-bold text-xs shadow-sm border border-gray-200">
                            {item.year}
                          </div>
                        )}
                      </div>

                      {/* Content Area */}
                      <div className="p-6 flex flex-col flex-grow border-t border-gray-50">
                        <div className="flex items-center gap-2 mb-3">
                          {item.category && (
                            <Badge variant="outline" className={cn(
                              "border-0 font-bold px-2.5 py-0.5",
                              badgeColorClasses[item.category.toLowerCase()] || "bg-gray-100 text-gray-600"
                            )}>
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </Badge>
                          )}
                          {item.maker && (
                            <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">
                              {item.maker}
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1 group-hover:text-red-600 transition-colors">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-sm leading-relaxed flex-grow line-clamp-3 mb-4">
                          {item.description}
                        </p>
                        
                        <div className="pt-4 border-t border-gray-100 mt-auto">
                           <span className="text-red-600 text-sm font-bold flex items-center gap-1 group-hover:gap-2 transition-all">
                             View Details <ArrowRight className="w-4 h-4" />
                           </span>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}

            {/* Pagination */}
            {!loading && totalPages > 1 && (
              <div className="mt-16">
                <Pagination>
                  <PaginationContent>
                    <PaginationItem>
                      <Button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        variant="ghost"
                        className="hover:bg-gray-100 text-gray-600"
                      >
                        <ChevronLeft className="h-4 w-4 mr-2" />
                        Previous
                      </Button>
                    </PaginationItem>

                    <div className="hidden md:flex items-center gap-1">
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
                              className={`rounded-lg ${
                                currentPage === page
                                  ? "bg-gray-900 text-white hover:bg-black hover:text-white"
                                  : "hover:bg-gray-100 text-gray-600"
                              }`}
                            >
                              {page}
                            </PaginationLink>
                          )}
                        </PaginationItem>
                      ))}
                    </div>

                    <PaginationItem>
                      <Button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        variant="ghost"
                        className="hover:bg-gray-100 text-gray-600"
                      >
                        Next
                        <ChevronRight className="h-4 w-4 ml-2" />
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
      <DonationButton />
    </div>
  )
}