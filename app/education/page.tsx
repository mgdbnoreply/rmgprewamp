"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { 
  Play, 
  User, 
  FileText, 
  Search, 
  GraduationCap,
  Library,
  ArrowRight,
} from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function EducationPage() {
  // State for the active video in the player
  const [activeVideoId, setActiveVideoId] = useState("7_DWInO_nZE")

  // Video data
  const videos = [
    {
      id: "jordan-frith",
      title: "What is a Mobile Game?",
      speaker: "Jordan Frith",
      role: "Clemson University",
      date: "October 1, 2022",
      description:
        "Professor Jordan Frith elaborates on the difference between passive and active mobile games and explains why mobile game studies are so relevant today. He discusses how mobility influences gameplay and the definition of the genre.",
      youtubeId: "7_DWInO_nZE",
    },
    {
      id: "davide-spallazzo",
      title: "Mobile Games and Connection",
      speaker: "Davide Spallazzo",
      role: "Polytechnic University of Milan",
      date: "September 1, 2022",
      description:
        "Davide Spallazzo shares his take on mobile games as opportunities to connect with the world around us as well as other people. He explores the social dimensions of mobile play.",
      youtubeId: "Nl9hivirkKk",
    },
    {
      id: "ilaria-mariani",
      title: "Virtual and Actual Reality",
      speaker: "Ilaria Mariani",
      role: "Polytechnic University of Milan",
      date: "May 1, 2022",
      description:
        "Ilaria Mariani shares her thoughts on how mobile games combine virtual and actual reality, creating hybrid spaces where digital and physical experiences merge.",
      youtubeId: "bOEWv9STMWU",
    },
    {
      id: "alex-custodio",
      title: "Seamless Gaming",
      speaker: "Alex Custodio",
      role: "Concordia University",
      date: "April 1, 2022",
      description:
        "PhD student Alex Custodio shares how mobile games are capable of seamless transfer between playing a game and everyday activities, highlighting the casual nature of mobile play.",
      youtubeId: "NFjT-J1cXnM",
    },
    {
      id: "shira-chess",
      title: "Beyond Old-School Constraints",
      speaker: "Shira Chess",
      role: "University of Georgia",
      date: "March 1, 2022",
      description:
        "Professor Shira Chess shares her thoughts on how the invention of mobile games represents the point where we stop being held by old-school constraints of time and place.",
      youtubeId: "CXxPej4dKZM", 
    },
    {
      id: "nick-taylor",
      title: "Games as Technocultural Platforms",
      speaker: "Nick Taylor",
      role: "NC State University",
      date: "February 1, 2022",
      description:
        "Associate Professor Nick Taylor shares his thoughts on how games are technocultural platforms for connectivity that play a big role in culture and cultural inequalities.",
      youtubeId: "q0Ddkp1RkwE",
    },
  ]

  const activeVideo = videos.find(v => v.youtubeId === activeVideoId) || videos[0]

  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 font-sans">
      <Header />

      <main className="relative z-10 pb-0">
        
        {/* --- Hero Section --- */}
        <section className="relative w-full mt-20 py-24 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/education.avif"
              alt="Education Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                Educational Resources
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                Learn. Research. <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Preserve.
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Comprehensive resources for students and researchers, including expert interviews, academic assignments, and archival guidelines.
              </p>
            </div>
          </div>
        </section>

        {/* --- "What is a Mobile Game?" Definition Section --- */}
        <section className="container mx-auto px-4 -mt-16 relative z-20 mb-24">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100 flex flex-col md:flex-row gap-12 items-center">
            <div className="flex-1 space-y-6">
              <div className="inline-flex items-center gap-2 text-red-600 font-bold uppercase tracking-wider text-sm">
                <div className="w-8 h-1 bg-red-600 rounded-full"></div>
                Core Definition
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">What is a Mobile Game?</h2>
              <div className="prose prose-lg text-gray-600">
                <p className="mb-4">
                  The Retro Mobile Gaming Project (RMGP) defines mobile games as 
                  <span className="text-gray-900 font-bold bg-red-50 px-1 rounded mx-1">
                    games that are played on portable devices
                  </span>, 
                  including handheld consoles, mobile phones, and other portable electronic devices.
                </p>
                <p>
                  This video series features interviews with leading scholars who explore different aspects of mobile gaming and its evolution over time. Each scholar brings a unique perspective on what constitutes a mobile game and how these games have shaped our culture and society.
                </p>
              </div>
            </div>
            <div className="flex-1 w-full relative h-[300px] md:h-[400px] rounded-2xl overflow-hidden shadow-lg group">
              <Image 
                src="/game-boy-tetris.jpg" 
                alt="Game Boy Tetris" 
                fill 
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                <p className="text-white font-medium">From dedicated consoles to multi-purpose devices.</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- Advanced Video Layout (Master-Detail) --- */}
        <section id="video-series" className="container mx-auto px-4 py-12 mb-24">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-4xl font-black text-gray-900 mb-2">Expert Perspectives</h2>
              <p className="text-gray-600 text-lg">Leading scholars discuss the definition and evolution of mobile play.</p>
            </div>
            <Badge variant="outline" className="hidden md:flex gap-2 py-2 px-4 border-gray-300 text-gray-600">
              <Play className="w-3 h-3 fill-current" /> {videos.length} Episodes
            </Badge>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 lg:gap-0 bg-white rounded-3xl overflow-hidden border border-gray-200 shadow-xl">
            {/* Master: Main Player Area */}
            <div className="lg:col-span-2 bg-black relative flex flex-col">
              <div className="aspect-video w-full bg-black relative">
                <iframe
                  src={`https://www.youtube.com/embed/${activeVideo.youtubeId}?autoplay=0&rel=0`}
                  title="YouTube video player"
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-8 bg-white flex-1 border-b lg:border-b-0 lg:border-r border-gray-200">
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{activeVideo.title}</h3>
                    <div className="flex flex-wrap items-center gap-2 text-red-600 font-medium text-sm">
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        {activeVideo.speaker}
                      </div>
                      <span className="text-gray-300 hidden sm:inline">|</span>
                      <span className="text-gray-500 font-normal">{activeVideo.role}</span>
                    </div>
                  </div>
                  <Badge variant="secondary" className="bg-gray-100 text-gray-600 whitespace-nowrap">
                    {activeVideo.date}
                  </Badge>
                </div>
                <Separator className="my-4" />
                <p className="text-gray-700 leading-relaxed">
                  {activeVideo.description}
                </p>
              </div>
            </div>

            {/* Detail: Playlist Sidebar */}
            <div className="lg:col-span-1 bg-gray-50 flex flex-col h-[500px] lg:h-auto">
              <div className="p-6 border-b border-gray-200 bg-white sticky top-0 z-10">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <Library className="w-5 h-5 text-red-600" /> 
                  Series Playlist
                </h4>
              </div>
              <ScrollArea className="flex-1">
                <div className="divide-y divide-gray-200">
                  {videos.map((video, index) => {
                    const isActive = video.youtubeId === activeVideoId;
                    return (
                      <button
                        key={index}
                        onClick={() => setActiveVideoId(video.youtubeId)}
                        className={`w-full text-left p-5 transition-all hover:bg-white flex gap-4 group ${
                          isActive ? "bg-white border-l-4 border-l-red-600" : "bg-gray-50/50 border-l-4 border-l-transparent"
                        }`}
                      >
                        <div className="relative flex-shrink-0 w-28 h-16 bg-gray-200 rounded-md overflow-hidden shadow-sm">
                          <div className={`absolute inset-0 flex items-center justify-center ${isActive ? "bg-neutral-800" : "bg-neutral-300 group-hover:bg-neutral-400"} transition-colors`}>
                            <Play className={`w-6 h-6 text-white`} fill="currentColor" />
                          </div>
                        </div>
                        <div className="flex-1 min-w-0 py-1">
                          <h5 className={`font-bold text-sm mb-1 truncate ${isActive ? "text-red-700" : "text-gray-900"}`}>
                            {video.title}
                          </h5>
                          <p className="text-xs text-gray-500 truncate">{video.speaker}</p>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          </div>
        </section>

        {/* --- Educational Resources / Assignment Section (New Horizontal Layout) --- */}
        <section id="educational-resources" className="bg-gray-900 text-white py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="mb-12">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/20">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-red-400 font-bold tracking-widest uppercase text-sm">Educational Resources</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Class Activities</h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
                      Access comprehensive assignment details, evaluation rubrics, and research guidelines for contributing to the Retro Mobile Gaming Database.
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-8 max-w-8xl mx-auto">
                  
                  {/* Card 1: Assignment */}
                  <Link href="/education/assignment" className="group block">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row h-full transform hover:-translate-y-1">
                      {/* Image Side */}
                      <div className="relative w-full md:w-1/3 min-h-[240px] overflow-hidden">
                        <Image 
                          src="/page/education.avif" 
                          alt="Media History Assignment" 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                        <div className="absolute bottom-6 left-6 p-3 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
                          <FileText className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Text Side */}
                      <div className="p-8 md:w-2/3 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                          Media History Assignment: Retro Mobile Gaming Database Entry
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          A comprehensive assignment for students to research and contribute to the Retro Mobile Gaming Database. Includes step-by-step instructions and evaluation criteria for academic submissions.
                        </p>
                        <div className="flex items-center text-red-600 font-bold text-sm uppercase tracking-wide group-hover:gap-2 transition-all mt-auto">
                          View Assignment <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>

                  {/* Card 2: Guidelines */}
                  <Link href="/education/guidelines" className="group block">
                    <div className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300 flex flex-col md:flex-row h-full transform hover:-translate-y-1">
                      {/* Image Side */}
                      <div className="relative w-full md:w-1/3 min-h-[240px] overflow-hidden">
                        <Image 
                          src="/preservation-archiving.jpg" 
                          alt="Research Guidelines" 
                          fill 
                          className="object-cover transition-transform duration-700 group-hover:scale-110" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity"></div>
                        <div className="absolute bottom-6 left-6 p-3 bg-black/50 backdrop-blur-md rounded-xl border border-white/10">
                          <Search className="w-6 h-6 text-white" />
                        </div>
                      </div>
                      
                      {/* Text Side */}
                      <div className="p-8 md:w-2/3 flex flex-col justify-center">
                        <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-red-600 transition-colors">
                          Guidelines for Internet Archival Research
                        </h3>
                        <p className="text-gray-600 mb-6 leading-relaxed">
                          Learn effective strategies for researching the history of mobile games using digital archives. Discover techniques for exact phrase searching, file type filtering, and utilizing the Wayback Machine.
                        </p>
                        <div className="flex items-center text-red-600 font-bold text-sm uppercase tracking-wide group-hover:gap-2 transition-all mt-auto">
                          View Guidelines <ArrowRight className="w-4 h-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </Link>

                </div>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}