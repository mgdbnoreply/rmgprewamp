"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronRight, ChevronLeft } from "lucide-react"
import Image from "next/image"

interface Publication {
  id: number
  title: string
  authors: string[]
  year: number
  description: string
  thumbnail: string
  categories: string[]
  topic: string
}

const mockPublications: Publication[] = [
  {
    id: 1,
    title: "The Evolution of Mobile Gaming Interfaces: 1975-1990",
    authors: ["Dr. Sarah Chen", "Prof. Michael Roberts"],
    year: 2023,
    description:
      "An in-depth analysis of how mobile gaming interfaces evolved from simple LED displays to early LCD screens, examining the technological constraints and creative solutions of early developers.",
    thumbnail: "/mobile-gaming-interface.jpg",
    categories: ["Interface Design", "Historical Analysis", "Technology"],
    topic: "Interface Design",
  },
  {
    id: 2,
    title: "Nokia's Impact on Mobile Gaming Culture",
    authors: ["Dr. Emma Wilson"],
    year: 2022,
    description:
      "Exploring how Nokia's pre-installed games like Snake became cultural phenomena and shaped the mobile gaming landscape for decades to come.",
    thumbnail: "/nokia-snake-game.jpg",
    categories: ["Cultural Studies", "Industry Analysis", "Nokia"],
    topic: "Cultural Studies",
  },
  {
    id: 3,
    title: "Game Boy: Revolutionizing Portable Entertainment",
    authors: ["Prof. James Anderson", "Dr. Lisa Park"],
    year: 2023,
    description:
      "A comprehensive study of the Game Boy's technical innovations and its lasting influence on portable gaming design and user experience.",
    thumbnail: "/game-boy-tetris.jpg",
    categories: ["Hardware", "Game Boy", "Innovation"],
    topic: "Hardware",
  },
  {
    id: 4,
    title: "Preservation Challenges in Early Mobile Gaming",
    authors: ["Dr. Robert Kim"],
    year: 2021,
    description:
      "Addressing the unique challenges of preserving early mobile games, including hardware degradation, proprietary formats, and lost source code.",
    thumbnail: "/preservation-archiving.jpg",
    categories: ["Preservation", "Archiving", "Methodology"],
    topic: "Preservation",
  },
  {
    id: 5,
    title: "The Social Dynamics of Multiplayer Mobile Games",
    authors: ["Dr. Maria Garcia", "Prof. David Lee"],
    year: 2022,
    description:
      "Investigating how early multiplayer mobile games fostered social connections and competitive play despite technological limitations.",
    thumbnail: "/multiplayer-games.jpg",
    categories: ["Social Studies", "Multiplayer", "Community"],
    topic: "Social Studies",
  },
  {
    id: 6,
    title: "Audio Design in Constrained Mobile Environments",
    authors: ["Prof. Thomas Brown"],
    year: 2023,
    description:
      "Examining the creative approaches developers used to create memorable audio experiences within the severe memory and processing constraints of early mobile devices.",
    thumbnail: "/audio-design-gaming.jpg",
    categories: ["Audio Design", "Technical Analysis", "Creativity"],
    topic: "Audio Design",
  },
]

export default function PublicationsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedYear, setSelectedYear] = useState("")
  const [selectedTopic, setSelectedTopic] = useState("")
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [currentPage, setCurrentPage] = useState(0)

  const itemsPerPage = 4
  const totalPages = Math.ceil(mockPublications.length / itemsPerPage)

  const filteredPublications = mockPublications.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesYear = !selectedYear || pub.year.toString() === selectedYear
    const matchesTopic = !selectedTopic || pub.topic === selectedTopic
    const matchesAuthor =
      !selectedAuthor || pub.authors.some((author) => author.toLowerCase().includes(selectedAuthor.toLowerCase()))
    return matchesSearch && matchesYear && matchesTopic && matchesAuthor
  })

  const paginatedPublications = filteredPublications.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  return (
    <div className="min-h-screen bg-white">
      <div className="relative z-10">
        <Header />

        {/* Hero Section (New Glass Design) */}
        <section className="container mx-auto px-4 mt-16 py-8 md:py-12">
          <div className="max-w-8xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 md:p-12 border border-red-200 shadow-lg">
              
              {/* Logo text updated with gradient and font size */}
              <div className="relative inline-flex items-center justify-center gap-5 group mb-8 p-6 bg-white/50 backdrop-blur-lg rounded-full border border-gray-200/50 shadow-2xl">
                <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  Publications
                </span>
                <div className="relative w-8 h-8 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left- top-1/2 -translate-y-1/2 z-0"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  & Research
                </span>
              </div>

              
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                
Discover groundbreaking research in retro mobile gaming preservation and analysis             </p>
            </div>
          </div>
        </section>
        

        {/* Featured Publication */}
        <section className="py-8 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-[100rem] mx-auto">
            <div className="rounded-2xl bg-gradient-to-br from-red-600 via-red-500 to-red-900/20 overflow-hidden shadow-2xl border border-red-700/30">
              <div className="relative h-64 md:h-96 bg-gradient-to-br from-red-600 to-black flex items-center justify-center">
                <Image
                  src={mockPublications[0].thumbnail || "/placeholder.svg"}
                  alt="Featured publication"
                  fill
                  className="object-cover opacity-30"
                />
                <div className="relative z-10 text-center px-8">
                  <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">Featured Research</h2>
                  <p className="text-white/90 text-lg max-w-2xl mx-auto">
                    
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Filter Section */}
        <section className="py-8 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-[100rem] mx-auto">
            <div className="rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200 p-6 md:p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Filter Papers</h2>

              {/* Search Bar */}
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search publications..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 h-12 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-red-500"
                />
              </div>

              {/* Filter Controls */}
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <label className="text-gray-700 font-medium">Year</label>
                  <select
                    value={selectedYear}
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-red-500 focus:outline-none"
                  >
                    <option value="">All</option>
                    <option value="2023">2023</option>
                    <option value="2022">2022</option>
                    <option value="2021">2021</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 font-medium">Topic</label>
                  <select
                    value={selectedTopic}
                    onChange={(e) => setSelectedTopic(e.target.value)}
                    className="px-4 py-2 rounded-lg bg-white border border-gray-300 text-gray-900 focus:border-red-500 focus:outline-none"
                  >
                    <option value="">All</option>
                    <option value="Interface Design">Interface Design</option>
                    <option value="Cultural Studies">Cultural Studies</option>
                    <option value="Hardware">Hardware</option>
                    <option value="Preservation">Preservation</option>
                  </select>
                </div>

                <div className="flex items-center gap-2">
                  <label className="text-gray-700 font-medium">Author</label>
                  <Input
                    type="text"
                    placeholder="Search author..."
                    value={selectedAuthor}
                    onChange={(e) => setSelectedAuthor(e.target.value)}
                    className="w-48 bg-white border-gray-300 text-gray-900 placeholder:text-gray-500 focus:border-red-500"
                  />
                </div>

                <Button
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedYear("")
                    setSelectedTopic("")
                    setSelectedAuthor("")
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
              {paginatedPublications.map((pub) => (
                <div
                  key={pub.id}
                  className="rounded-xl bg-white border-2 border-gray-200 p-6 hover:border-red-500 hover:shadow-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row gap-6">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{pub.title}</h3>
                      <div className="text-gray-600 text-sm mb-1">{pub.authors.join(", ")}</div>
                      <div className="text-gray-500 text-sm mb-4">Publication Year: {pub.year}</div>
                      <p className="text-gray-700 mb-4 leading-relaxed">{pub.description}</p>
                      <div className="flex flex-wrap items-center gap-3">
                        <Button className="bg-gradient-to-r from-red-600 to-black hover:from-red-700 hover:to-gray-900 text-white">
                          Read More
                        </Button>
                        {pub.categories.map((category, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1 rounded-full bg-gray-100 border border-gray-300 text-gray-700 text-sm font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative w-full md:w-48 h-48 rounded-lg overflow-hidden flex-shrink-0 shadow-md">
                      <Image src={pub.thumbnail || "/placeholder.svg"} alt={pub.title} fill className="object-cover" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-2 mt-8">
              <button
                onClick={() => setCurrentPage(Math.max(0, currentPage - 1))}
                disabled={currentPage === 0}
                className="p-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-900 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              {Array.from({ length: totalPages }).map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentPage(idx)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    currentPage === idx ? "bg-red-600 w-8" : "bg-gray-400 hover:bg-gray-500"
                  }`}
                />
              ))}

              <button
                onClick={() => setCurrentPage(Math.min(totalPages - 1, currentPage + 1))}
                disabled={currentPage === totalPages - 1}
                className="p-2 rounded-lg bg-gray-200 border border-gray-300 text-gray-900 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}
