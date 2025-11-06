"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, ChevronDown, Calendar, User } from "lucide-react"
import Image from "next/image"

export default function NewsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [activeFilters, setActiveFilters] = useState<string[]>([])

  const categories = [
    { id: "all", label: "All News" },
    { id: "blog", label: "Blog" },
    { id: "updates", label: "Updates" },
    { id: "articles", label: "Articles" },
    { id: "features", label: "Features" },
    { id: "spotlight", label: "Spotlight" },
  ]

  const newsItems = [
    {
      id: 1,
      title: "The Evolution of Snake: From Nokia to Modern Gaming",
      category: "articles",
      author: "Dr. Sarah Chen",
      date: "2024-03-15",
      excerpt:
        "Exploring how the simple Snake game became a cultural phenomenon and influenced modern mobile game design.",
      image: "/nokia-snake-game-evolution.jpg",
      featured: true,
    },
    {
      id: 2,
      title: "New Additions to Our Collection: Game Boy Color Variants",
      category: "updates",
      author: "Collection Team",
      date: "2024-03-10",
      excerpt: "We've recently acquired several rare Game Boy Color special editions for our archive.",
      image: "/game-boy-color-special-editions.jpg",
      featured: false,
    },
    {
      id: 3,
      title: "Spotlight: The Impact of Mobile Gaming on Social Connectivity",
      category: "spotlight",
      author: "Prof. Michael Torres",
      date: "2024-03-05",
      excerpt:
        "How early mobile games created new forms of social interaction and community building in the pre-smartphone era.",
      image: "/people-playing-mobile-games-together.jpg",
      featured: true,
    },
    {
      id: 4,
      title: "Behind the Scenes: Preserving Retro Gaming Hardware",
      category: "blog",
      author: "Emily Rodriguez",
      date: "2024-02-28",
      excerpt: "A look at the challenges and techniques involved in maintaining vintage gaming devices.",
      image: "/vintage-gaming-device-restoration.jpg",
      featured: false,
    },
    {
      id: 5,
      title: "Feature: The Rise and Fall of N-Gage",
      category: "features",
      author: "James Wilson",
      date: "2024-02-20",
      excerpt: "An in-depth analysis of Nokia's ambitious gaming phone and what we can learn from its story.",
      image: "/nokia-n-gage-gaming-phone.jpg",
      featured: false,
    },
    {
      id: 6,
      title: "Research Update: Mobile Gaming Demographics 1990-2008",
      category: "updates",
      author: "Research Team",
      date: "2024-02-15",
      excerpt: "New findings on who played mobile games and how demographics shifted over two decades.",
      image: "/mobile-gaming-demographics-research.jpg",
      featured: false,
    },
  ]

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "all" || item.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const featuredNews = filteredNews.filter((item) => item.featured)
  const regularNews = filteredNews.filter((item) => !item.featured)

  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Removed z-10 from this div to fix header dropdown issue */}
      <div className="relative">
        <Header />

       <section className="container mx-auto px-4 mt-16 py-8 md:py-12">
          <div className="max-w-8xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 md:p-12 border border-red-200 shadow-lg">
              
              {/* Logo text updated with gradient and font size */}
              <div className="relative inline-flex items-center justify-center gap-5 group mb-8 p-6 bg-white/50 backdrop-blur-lg rounded-full border border-gray-200/50 shadow-2xl">
                <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  News
                </span>
                <div className="relative w-8 h-8 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left- top-1/2 -translate-y-1/2 z-0"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  & Media
                </span>
              </div>

              
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam laudantium voluptates nemo mollitia ipsum odit minima ipsa nostrum eius accusantium facere, officia veritatis quibusdam amet adipisci quo magnam obcaecati earum.
              </p>
            </div>
          </div>
        </section>

        {/* Search and Filter Section (Light Glass) */}
        <section className="relative py-8 px-4 md:px-8 lg:px-16">
          <div className="max-w-[100rem] mx-auto">
            <div className="bg-white/50 backdrop-blur-lg rounded-2xl p-6 border border-gray-200/50 shadow-xl">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
                  <Input
                    type="text"
                    placeholder="Search news..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 pr-4 py-6 bg-white/80 border-gray-300 text-gray-900 placeholder:text-gray-500 rounded-xl focus:border-red-500 focus:ring-red-500"
                  />
                </div>

                <Button
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                  className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-6 rounded-xl hover:shadow-lg hover:shadow-red-500/50 transition-all flex items-center gap-2"
                >
                  <span className="font-bold">Filter</span>
                  {activeFilters.length > 0 && (
                    <span className="bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
                      {activeFilters.length}
                    </span>
                  )}
                  <ChevronDown className={`h-5 w-5 transition-transform ${isFilterOpen ? "rotate-180" : ""}`} />
                </Button>
              </div>

              {isFilterOpen && (
                <div className="mt-6 pt-6 border-t border-gray-300/50">
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-bold text-gray-700 mb-2 block">Category</label>
                      <div className="flex flex-wrap gap-2">
                        {categories.map((category) => (
                          <Button
                            key={category.id}
                            onClick={() => setSelectedCategory(category.id)}
                            className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                              selectedCategory === category.id
                                ? "bg-gradient-to-r from-red-600 to-black text-white shadow-lg"
                                : "bg-white/70 text-gray-700 hover:bg-white"
                            }`}
                          >
                            {category.label}
                          </Button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Featured News (Gradient Glass Cards) */}
        {featuredNews.length > 0 && (
          <section className="relative py-8 px-4 md:px-8 lg:px-16">
            <div className="max-w-[100rem] mx-auto">
              <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">Featured Stories</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {featuredNews.map((item) => (
                  <div
                    key={item.id}
                    className="group relative bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-red-700/30 shadow-lg hover:shadow-red-500/40 transition-shadow"
                  >
                    <div className="relative h-80 overflow-hidden">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-4 left-4 bg-black/50 text-white px-4 py-2 rounded-full font-bold text-sm uppercase backdrop-blur-sm">
                        {item.category}
                      </div>
                    </div>
                    <div className="p-6 text-white">
                      <h3 className="text-2xl font-bold mb-3 group-hover:text-red-100 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-red-50/90 mb-4 leading-relaxed">{item.excerpt}</p>
                      <div className="flex items-center gap-4 text-sm text-red-100/80">
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4" />
                          <span>{item.author}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4" />
                          <span>{new Date(item.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* All News (Gradient Glass Cards) */}
        <section className="relative py-8 px-4 md:px-8 lg:px-16 pb-20">
          <div className="max-w-[100rem] mx-auto">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-8">All News</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {regularNews.map((item) => (
                <div
                  key={item.id}
                  className="group relative bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg rounded-2xl overflow-hidden border border-red-700/30 shadow-lg hover:shadow-red-500/40 transition-shadow"
                >
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute top-4 left-4 bg-black/50 text-white px-3 py-1 rounded-full font-bold text-xs uppercase backdrop-blur-sm">
                      {item.category}
                    </div>
                  </div>
                  <div className="p-6 text-white">
                    <h3 className="text-xl font-bold mb-2 group-hover:text-red-100 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-red-50/90 text-sm mb-4 leading-relaxed line-clamp-3">{item.excerpt}</p>
                    <div className="flex flex-col gap-2 text-xs text-red-100/80">
                      <div className="flex items-center gap-2">
                        <User className="h-3 w-3" />
                        <span>{item.author}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Calendar className="h-3 w-3" />
                        <span>{new Date(item.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </div>
    </div>
  )
}