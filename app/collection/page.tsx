"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { DonationButton } from "@/components/donation-button"
import { ChevronLeft, ChevronRight, Search } from "lucide-react"
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

// Filter tabs
const filters = [
  { id: "all", label: "All Devices" },
  { id: "console", label: "Consoles" },
  { id: "proprietary", label: "Proprietary" },
  { id: "phone", label: "Phones" },
]

// Badge color helper
const badgeColorClasses: { [key: string]: string } = {
  phone: "bg-green-800/50 text-green-200 border border-green-500/50",
  game: "bg-blue-800/50 text-blue-200 border border-blue-500/50",
  console: "bg-red-800/50 text-red-200 border border-red-500/50",
  proprietary: "bg-purple-800/50 text-purple-200 border border-purple-500/50",
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
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="relative z-10">
        {/* --- Full Width Hero Section --- */}
        <section className="relative w-full mt-16 py-24 md:py-32 overflow-hidden">
          {/* Background Image & Overlay */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/publications.jpg"
              alt="Collection Background"
              fill
              className="object-cover  opacity-100"
              priority
            />
            {/* Changed white gradient to black gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
          </div>

          {/* Content Container (Constrained width) */}
          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-8xl mx-auto text-center">
              {/* Changed inner container background to white for contrast */}
              <div className="bg-white/10 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/50 shadow-xl">
                <div className="relative inline-flex items-center justify-center gap-5 group mb-8 p-6 bg-white/80 backdrop-blur-xl rounded-full border border-white/60 shadow-2xl">
                  <span className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                    COLLECTION
                  </span>
                  <div className="relative w-8 h-8 flex-shrink-0 hidden sm:block">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left- top-1/2 -translate-y-1/2 z-0"></div>
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                  </div>
                  <span className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                    & EXPERIENCE
                  </span>
                </div>

                <p className="text-lg md:text-xl text-white font-semibold max-w-3xl mx-auto leading-relaxed">
                  Explore our comprehensive collection of retro mobile gaming devices from 1975 to 2008, including
                  handheld consoles, proprietary systems, and mobile phones that shaped the history of mobile gaming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Tabs + Search */}
        <section className="relative py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-gray-50/50">
          <div className="max-w-7xl mx-auto p-6 bg-white backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-xl">
            <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-4">
              <div className="relative flex-1 w-full md:w-auto">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                <Input
                  type="text"
                  placeholder="Search collection..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(1)
                  }}
                  className="pl-12 pr-4 py-6 h-16 bg-gray-50 border-gray-200 text-lg text-gray-900 placeholder:text-gray-500 rounded-xl focus:border-red-500 focus:ring-red-500"
                />
              </div>
              <div className="flex flex-wrap justify-center gap-3">
                {filters.map((filter) => (
                  <Button
                    key={filter.id}
                    onClick={() => {
                      setActiveFilter(filter.id)
                      setCurrentPage(1)
                    }}
                    className={`px-6 py-5 text-base font-bold rounded-xl transition-all shadow-md hover:shadow-lg ${
                      activeFilter === filter.id
                        ? "bg-red-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-100 border border-gray-200"
                    }`}
                  >
                    {filter.label}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Collection Grid */}
        <section className="relative py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-20">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-red-600 border-t-transparent"></div>
                <p className="mt-4 text-gray-600 text-lg">Loading collection...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {paginatedItems.length === 0 ? (
                  <div className="md:col-span-3 text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-300">
                    <p className="text-gray-500 text-lg">No items found. Try adjusting your search or filters.</p>
                  </div>
                ) : (
                  paginatedItems.map((item, index) => (
                    <div
                      key={item.id || index}
                      className="group relative bg-white rounded-2xl shadow-lg hover:shadow-red-500/20 transition-all duration-300 flex flex-col overflow-hidden border border-gray-100 hover:border-red-200 hover:-translate-y-1"
                    >
                      <div className="relative h-64 w-full bg-gray-50 p-6 flex items-center justify-center">
                        <Image
                          src={getImage(item.image)}
                          alt={item.name || "Collection item"}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
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
                      <div className="p-6 flex flex-col flex-grow">
                        <div className="flex items-center gap-2 mb-3">
                          {item.category && (
                            <span
                              className={cn(
                                "px-3 py-1 rounded-full font-semibold text-xs backdrop-blur-sm",
                                badgeColorClasses[item.category.toLowerCase()] ||
                                  "bg-gray-100 text-gray-600 border border-gray-200"
                              )}
                            >
                              {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                            </span>
                          )}
                          {item.maker && <span className="text-sm font-semibold text-red-600">{item.maker}</span>}
                        </div>
                        <h3 className="text-xl font-bold mb-2 text-gray-900 line-clamp-1">{item.name}</h3>
                        <p className="text-gray-500 text-sm leading-relaxed flex-grow line-clamp-3">
                          {item.description}
                        </p>
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
                        className="hover:bg-gray-100 text-gray-700"
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
                            className={`rounded-lg ${
                              currentPage === page
                                ? "bg-red-600 text-white hover:bg-red-700 hover:text-white"
                                : "hover:bg-gray-100 text-gray-700"
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
                        className="hover:bg-gray-100 text-gray-700"
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
      <DonationButton />
    </div>
  )
}