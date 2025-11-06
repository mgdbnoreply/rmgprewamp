"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Play } from "lucide-react"

export default function EducationPage() {
  const [activeVideo, setActiveVideo] = useState(0)

  const episodes = [
    {
      id: 1,
      title: "Introduction to Mobile Gaming History",
      author: "Dr. Sarah Chen",
      date: "March 15, 2024",
      thumbnail: "/retro-mobile-gaming-history.jpg",
      description:
        "Explore the fascinating evolution of mobile gaming from the early days of Snake to modern smartphone games.",
    },
    {
      id: 2,
      title: "The Rise of Nokia Gaming",
      author: "Prof. Michael Torres",
      date: "March 22, 2024",
      thumbnail: "/nokia-gaming-evolution.jpg",
      description: "Discover how Nokia revolutionized mobile gaming in the late 90s and early 2000s.",
    },
    {
      id: 3,
      title: "Game Boy: Portable Revolution",
      author: "Dr. Emily Watson",
      date: "March 29, 2024",
      thumbnail: "/game-boy-portable-gaming.jpg",
      description: "Learn about Nintendo's Game Boy and its impact on portable gaming culture.",
    },
    {
      id: 4,
      title: "Mobile Gaming AI and Machine Learning",
      author: "Dr. James Liu",
      date: "April 5, 2024",
      thumbnail: "/mobile-gaming-ai-technology.jpg",
      description: "Understanding how AI is shaping the future of mobile gaming experiences.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="relative z-10">

        {/* Hero Section (Cleaned up) - Added pt-48 */}
        <section className="container mx-auto px-4 mt-16 py-8 md:py-12">
          <div className="max-w-8xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 md:p-12 border border-red-200 shadow-lg">
              
              {/* Logo text updated with gradient and font size */}
              <div className="relative inline-flex items-center justify-center gap-5 group mb-8 p-6 bg-white/50 backdrop-blur-lg rounded-full border border-gray-200/50 shadow-2xl">
                <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  EDUCATION
                </span>
                <div className="relative w-8 h-8 flex-shrink-0">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left- top-1/2 -translate-y-1/2 z-0"></div>
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <span className="text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  & LEARNING
                </span>
              </div>

              
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                Comprehensive video series on mobile gaming history
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Totam laudantium voluptates nemo mollitia ipsum odit minima ipsa nostrum eius accusantium facere, officia veritatis quibusdam amet adipisci quo magnam obcaecati earum.
              </p>
            </div>
          </div>
        </section>

        {/* Hero Image Section */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-red-600 to-black shadow-2xl">
            <img
              src="/retro-mobile-gaming-education-hero.jpg"
              alt="Education Hero"
              className="w-full h-[400px] md:h-[500px] object-cover opacity-60"
            />
            <div className="absolute bottom-8 right-8 bg-white/90 backdrop-blur-md rounded-2xl p-6 max-w-md border border-gray-200 shadow-xl">
              <p className="text-gray-900 text-lg leading-relaxed font-medium">
                Dive deep into the fascinating world of mobile gaming history, from the earliest handheld devices to
                modern AI-powered experiences.
              </p>
            </div>
          </div>
        </section>

        {/* What is Mobile AI Section */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 md:p-12 border border-red-200 shadow-lg">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What is Mobile AI?</h2>
                <p className="text-gray-700 text-lg leading-relaxed mb-4">
                  Mobile AI represents the integration of artificial intelligence technologies into mobile gaming
                  experiences. From adaptive difficulty systems to intelligent NPCs, AI has transformed how we interact
                  with games on portable devices.
                </p>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Our research explores how machine learning algorithms enhance gameplay, create personalized experiences,
                  and push the boundaries of what's possible in mobile gaming.
                </p>
              </div>
              <div className="rounded-2xl overflow-hidden bg-gradient-to-br from-red-600 to-black border border-red-200 shadow-lg">
                <img
                  src="/mobile-ai-gaming-technology.jpg"
                  alt="Mobile AI Illustration"
                  className="w-full h-[300px] object-cover opacity-90"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Video Series Section */}
        <section className="container mx-auto px-4 py-8 md:py-12">
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-200 shadow-lg">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Video Series</h2>
              <p className="text-gray-600">Educational content for enthusiasts</p>
            </div>

            {/* Featured Video */}
            <div className="bg-gradient-to-br from-red-600 to-black rounded-2xl overflow-hidden border border-red-200 mb-8 hover:shadow-xl transition-all duration-300 shadow-lg">
              <div className="relative group cursor-pointer" onClick={() => setActiveVideo(0)}>
                <img
                  src={episodes[activeVideo].thumbnail || "/placeholder.svg"}
                  alt={episodes[activeVideo].title}
                  className="w-full h-[300px] md:h-[400px] object-cover"
                />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center">
                  <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-2xl">
                    <Play className="w-10 h-10 text-red-600 ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{episodes[activeVideo].title}</h3>
                <div className="flex items-center gap-4 text-gray-600 text-sm mb-4">
                  <span>{episodes[activeVideo].author}</span>
                  <span>•</span>
                  <span>{episodes[activeVideo].date}</span>
                </div>
                <p className="text-gray-700 leading-relaxed">{episodes[activeVideo].description}</p>
              </div>
            </div>

            {/* All Episodes */}
            <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">All Episodes</h3>
              <div className="space-y-4">
                {episodes.map((episode, index) => (
                  <div
                    key={episode.id}
                    onClick={() => setActiveVideo(index)}
                    className={`flex items-center gap-4 p-4 rounded-xl cursor-pointer transition-all duration-300 ${
                      activeVideo === index
                        ? "bg-gradient-to-r from-red-600 to-black border border-red-400 shadow-md"
                        : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                    }`}
                  >
                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-black flex items-center justify-center shadow-lg">
                      <Play className="w-6 h-6 text-white ml-0.5" fill="white" />
                    </div>
                    <div className="flex-1">
                      <h4 className={`font-semibold mb-1 ${activeVideo === index ? "text-white" : "text-gray-900"}`}>
                        {episode.title}
                      </h4>
                      <div
                        className={`flex items-center gap-3 text-sm ${activeVideo === index ? "text-white/80" : "text-gray-600"}`}
                      >
                        <span>{episode.author}</span>
                        <span>•</span>
                        <span>{episode.date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>

      {/* Removed the <style jsx> block */}
    </div>
  )
}