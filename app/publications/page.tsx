"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"
import { publicationsData } from "@/lib/publications-data" // Import real data

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 4
  // Dynamically get unique years and topics for filters
  const years = Array.from(new Set(publicationsData.map(p => p.year))).sort((a, b) => b - a)
  const topics = Array.from(new Set(publicationsData.map(p => p.topic))).sort()

  const filteredPublications = publicationsData.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesYear = !selectedYear || pub.year.toString() === selectedYear
    const matchesTopic = !selectedTopic || pub.topic === selectedTopic
    const matchesAuthor =
      !selectedAuthor || pub.authors.some((author) => author.toLowerCase().includes(selectedAuthor.toLowerCase()))
    return matchesSearch && matchesYear && matchesTopic && matchesAuthor
  })

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage)
  const paginatedPublications = filteredPublications.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10">
        <Header />

        {/* --- Full Width Hero Section --- */}
                <section className="relative w-full mt-16 py-24 md:py-32 overflow-hidden">
                  {/* Background Image & Overlay */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src="/page/publications.jpeg"
                      alt="Collection Background"
                      fill
                      className="object-cover grayscale opacity-40"
                      priority
                    />
                    {/* Changed white gradient to black gradient */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
                  </div>
        
                  {/* Content Container (Constrained width) */}
                  <div className="container relative z-10 mx-auto px-4">
                    <div className="max-w-8xl mx-auto text-center">
                      {/* Changed inner container background to white for contrast */}
                      <div className="bg-white/90 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/50 shadow-xl">
                        <div className="relative inline-flex items-center justify-center gap-5 group mb-8 p-6 bg-white/80 backdrop-blur-xl rounded-full border border-white/60 shadow-2xl">
                          <span className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                            Publications
                          </span>
                          <div className="relative w-8 h-8 flex-shrink-0 hidden sm:block">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left- top-1/2 -translate-y-1/2 z-0"></div>
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                          </div>
                          <span className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                            & Research
                          </span>
                        </div>
        
                        <p className="text-lg md:text-xl text-gray-800 font-semibold max-w-3xl mx-auto leading-relaxed">
                          Discover groundbreaking research in retro mobile gaming preservation and analysis
                        </p>
                      </div>
                    </div>
                  </div>
                </section>
        

        {/* Featured Publication */}
        {/* {paginatedPublications.length > 0 && (
          <section className="py-8 px-4 md:px-8 lg:px-16 bg-white">
            <div className="max-w-[100rem] mx-auto">
              <div className="rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-red-900/20 overflow-hidden shadow-2xl border border-red-700/30">
                <div className="relative h-64 md:h-96 bg-gradient-to-br from-red-600 to-black flex items-center justify-center">
                  <Image
                    src={paginatedPublications[0].thumbnail || "/placeholder.svg"}
                    alt="Featured publication"
                    fill
                    className="object-cover opacity-30"
                  />
                  <div className="relative z-10 text-center px-8 max-w-4xl">
                    <span className="inline-block px-4 py-1 mb-4 text-sm font-bold tracking-wider text-red-100 uppercase bg-white/10 rounded-full backdrop-blur-md border border-white/20">
                      Latest Research
                    </span>
                    <h2 className="text-2xl md:text-4xl font-bold text-white mb-4">{paginatedPublications[0].title}</h2>
                    <p className="text-white/90 text-lg max-w-2xl mx-auto line-clamp-2">
                      {paginatedPublications[0].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )} */}

        {/* Filter Section */}
        <section className="py-8 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-[100rem] mx-auto">
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Filter Papers</h2>

              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(0)
                  }}
                  className="pl-12 h-12 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-red-500"
                />
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-gray-700 font-medium">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => {
                      setSelectedYear(e.target.value)
                      setCurrentPage(0)
                    }}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-red-500 focus:outline-none"
                  >
                    <option value="">All</option>
                    {years.map(year => (
                      <option key={year} value={year}>{year}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 font-medium">Topic</label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => {
                      setSelectedTopic(e.target.value)
                      setCurrentPage(0)
                    }}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-red-500 focus:outline-none"
                  >
                    <option value="">All</option>
                    {topics.map(topic => (
                      <option key={topic} value={topic}>{topic}</option>
                    ))}
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 font-medium">Author</label>
                  <Input
                    type="text"
                    placeholder="Search author..."
                    value={selectedAuthor}
                    onChange={(e) => {
                      setSelectedAuthor(e.target.value)
                      setCurrentPage(0)
                    }}
                    className="w-48 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-red-500"
                  />
                </div>

                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedYear("")
                    setSelectedTopic("")
                    setSelectedAuthor("")
                    setCurrentPage(0)
                  }}
                  className="ml-auto bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 text-white"
                >
                  Reset Filters
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Publications List */}
        <section className="py-8 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-[100rem] mx-auto">
            <div className="space-y-6">
              {paginatedPublications.length === 0 ? (
                <div className="text-center py-10 text-gray-500">No publications found matching your criteria.</div>
              ) : (
                paginatedPublications.map((pub) => (
                  <div
                    key={pub.id}
                    className="rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-red-500 hover:shadow-lg transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">{pub.title}</h3>
                        <div className="text-gray-600 text-sm mb-1 italic">{pub.authors.join(", ")}</div>
                        <div className="text-gray-500 text-sm mb-4 font-semibold text-red-600">{pub.year}</div>
                        <p className="text-gray-700 mb-4 leading-relaxed text-sm">{pub.description}</p>
                        <div className="flex flex-wrap items-center gap-3">
                          {pub.categories.map((category, idx) => (
                            <span
                              key={idx}
                              className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-xs font-medium uppercase tracking-wide"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 shadow-md bg-gray-100">
                        <Image src={pub.thumbnail || "/placeholder.svg"} alt={pub.title} fill className="object-cover" />
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-8">
                <button
                  onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                  disabled={currentPage === 0}
                  className="p-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-900 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>

                <span className="text-sm text-gray-600 font-medium px-2">
                  Page {currentPage + 1} of {totalPages}
                </span>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                  disabled={currentPage === totalPages - 1}
                  className="p-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-900 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            )}
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}