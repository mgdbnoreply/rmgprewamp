"use client"

import { useState } from "react"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { 
  Play, 
  User, 
  Calendar, 
  BookOpen, 
  FileText, 
  Search, 
  ExternalLink,
  GraduationCap,
  Library,
  CheckCircle2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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
      youtubeId: "CXxPej4dKZM",
    },
    {
      id: "shira-chess",
      title: "Beyond Old-School Constraints",
      speaker: "Shira Chess",
      role: "University of Georgia",
      date: "March 1, 2022",
      description:
        "Professor Shira Chess shares her thoughts on how the invention of mobile games represents the point where we stop being held by old-school constraints of time and place.",
      youtubeId: "CXxPej4dKZM", // Note: Ensure distinct ID if available in source
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
              src="/mobile-gaming-interface.jpg"
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
                          {/* We don't have real thumbnails, so we use a placeholder color block */}
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

        {/* --- Educational Resources / Assignment Section --- */}
        <section id="educational-resources" className="bg-gray-900 text-white py-24 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-red-900/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>
            
            <div className="container mx-auto px-4 relative z-10">
                {/* Header */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                      <div className="p-2 bg-red-600 rounded-lg shadow-lg shadow-red-900/20">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <span className="text-red-400 font-bold tracking-widest uppercase text-sm">Educational Resources</span>
                    </div>
                    <h2 className="text-4xl md:text-6xl font-black mb-6 tracking-tight">Media History Assignment</h2>
                    <p className="text-gray-300 text-lg md:text-xl max-w-3xl leading-relaxed">
                      Research an early mobile game and contribute an entry to the Retro Mobile Gaming Database. Your entry will support the Center for Transformative Media's efforts to preserve the history of mobile games.
                    </p>
                    
                    {/* Topics Tags */}
                    <div className="flex flex-wrap gap-2 mt-8">
                        {["Media History", "Media Archaeology", "Internet Archival Research", "Media Studies", "Game Studies", "Mobile Media"].map((topic, i) => (
                            <Badge key={i} variant="secondary" className="bg-gray-800/80 hover:bg-gray-700 text-gray-300 border-gray-700 px-3 py-1.5">{topic}</Badge>
                        ))}
                    </div>
                </div>

                <div className="grid lg:grid-cols-12 gap-8">
                    {/* Left Column: Assignment Details (Steps, Submission, Evaluation) */}
                    <div className="lg:col-span-7 space-y-8">
                        {/* Assignment Steps */}
                        <Card className="bg-gray-800/40 border-gray-700 backdrop-blur-sm shadow-xl">
                            <CardContent className="p-8">
                                <h3 className="text-2xl font-bold mb-8 flex items-center gap-3 text-white">
                                    <FileText className="w-6 h-6 text-red-500" /> Assignment Steps
                                </h3>
                                <div className="space-y-8">
                                    {/* Step 1: Register */}
                                    <div className="flex gap-5 group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center font-bold border border-red-600/30 group-hover:bg-red-600 group-hover:text-white transition-all">1</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-2">Register for an Account</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Visit the Retro Mobile Gaming Database platform and follow the instructions to create an account using your <span className="text-white font-medium">university email</span>.
                                            </p>
                                        </div>
                                    </div>
                                    {/* Step 2: Research */}
                                    <div className="flex gap-5 group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center font-bold border border-red-600/30 group-hover:bg-red-600 group-hover:text-white transition-all">2</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-2">Conduct Research</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed mb-3">
                                                Select an early mobile game not already in the database (e.g., specific Game Boy Color titles). Use internet and archival strategies to gather:
                                            </p>
                                            <ul className="list-disc list-inside text-gray-400 text-sm pl-1 space-y-1 marker:text-red-500">
                                                <li>Game history & development</li>
                                                <li>Impact & reception</li>
                                                <li>Technical specifications</li>
                                            </ul>
                                        </div>
                                    </div>
                                    {/* Step 3: Add Entry */}
                                    <div className="flex gap-5 group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center font-bold border border-red-600/30 group-hover:bg-red-600 group-hover:text-white transition-all">3</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-2">Add Entry</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Write a comprehensive entry including Game Overview, Developer Information, Release Date, and Connectivity Type. Use the Glossary to understand terms.
                                            </p>
                                        </div>
                                    </div>
                                     {/* Step 4: Submission */}
                                    <div className="flex gap-5 group">
                                        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600/10 text-red-500 flex items-center justify-center font-bold border border-red-600/30 group-hover:bg-red-600 group-hover:text-white transition-all">4</div>
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-2">Submission</h4>
                                            <p className="text-gray-400 text-sm leading-relaxed">
                                                Submit your completed entry directly on the RMGP platform. Additionally, upload a copy of your entry to your Learning Management System.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Evaluation Criteria */}
                        <Card className="bg-gray-800/20 border-gray-700/50">
                            <CardContent className="p-6">
                                <h4 className="font-bold text-gray-200 mb-3 flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-500" /> Evaluation Criteria
                                </h4>
                                <p className="text-gray-400 text-sm leading-relaxed">
                                    Your entry will be evaluated based on <strong className="text-gray-200">completeness, accuracy, depth of research, and clarity of writing</strong>. Originality and contribution to the historical understanding of early mobile games will also be considered.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Right Column: Guidelines & Readings */}
                    <div className="lg:col-span-5 space-y-8">
                        
                        {/* Archival Search Guidelines */}
                        <Card className="bg-gradient-to-b from-gray-800 to-gray-900 border-gray-700 shadow-xl overflow-hidden">
                            <div className="bg-gray-800/80 p-6 border-b border-gray-700">
                                <h3 className="text-xl font-bold flex items-center gap-3 text-white">
                                    <Search className="w-5 h-5 text-blue-400" /> 
                                    Internet Archival Research
                                </h3>
                            </div>
                            <CardContent className="p-6">
                                <div className="space-y-4">
                                    {/* Guideline Items */}
                                    <div className="bg-gray-950/30 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                                        <h5 className="text-blue-300 font-bold text-xs uppercase mb-2">Narrow Your Search</h5>
                                        <p className="text-gray-400 text-sm mb-2">Use quotation marks for exact phrases.</p>
                                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-green-400 font-mono block w-fit border border-gray-800">"Gameboy Color"</code>
                                    </div>

                                    <div className="bg-gray-950/30 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                                        <h5 className="text-blue-300 font-bold text-xs uppercase mb-2">Exclude Irrelevant Results</h5>
                                        <p className="text-gray-400 text-sm mb-2">Use the minus sign.</p>
                                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-green-400 font-mono block w-fit border border-gray-800">Gameboy -color -advance</code>
                                    </div>

                                    <div className="bg-gray-950/30 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                                        <h5 className="text-blue-300 font-bold text-xs uppercase mb-2">File Type Search</h5>
                                        <p className="text-gray-400 text-sm mb-2">Find specific documents.</p>
                                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-green-400 font-mono block w-fit border border-gray-800">Slots of Fun filetype:pdf</code>
                                    </div>

                                    <div className="bg-gray-950/30 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                                        <h5 className="text-blue-300 font-bold text-xs uppercase mb-2">Specific Site Search</h5>
                                        <p className="text-gray-400 text-sm mb-2">Search within a specific URL.</p>
                                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-green-400 font-mono block w-fit border border-gray-800">site:mgrl.ncsu.chass.edu</code>
                                    </div>

                                    <div className="bg-gray-950/30 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                                        <h5 className="text-blue-300 font-bold text-xs uppercase mb-2">Search by Domain</h5>
                                        <p className="text-gray-400 text-sm mb-2">Limit to academic resources.</p>
                                        <code className="text-xs bg-black/50 px-2 py-1 rounded text-green-400 font-mono block w-fit border border-gray-800">Gameboy site:.edu</code>
                                    </div>

                                    <div className="bg-gray-950/30 p-4 rounded-xl border border-gray-700/30 hover:border-blue-500/30 transition-colors">
                                        <h5 className="text-blue-300 font-bold text-xs uppercase mb-2">Wayback Machine</h5>
                                        <p className="text-gray-400 text-sm">
                                          Use <a href="http://web.archive.org/" target="_blank" className="text-blue-400 hover:text-blue-300 underline underline-offset-4">archive.org</a> to view cached versions of defunct gaming websites.
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-6 pt-4 border-t border-gray-700">
                                    <Link 
                                        href="https://digitalcommons.law.uga.edu/cgi/viewcontent.cgi?article=1066&context=cle" 
                                        target="_blank"
                                        className="flex items-center justify-between text-xs text-gray-400 hover:text-white transition-colors group p-2 hover:bg-gray-800 rounded-lg"
                                    >
                                        <span className="font-medium">Advanced Internet Research Techniques (PDF)</span>
                                        <ExternalLink className="w-3 h-3 group-hover:text-blue-400" />
                                    </Link>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Recommended Readings (Moved from bottom) */}
                        <Card className="bg-gray-800/20 border-gray-700 shadow-lg">
                            <CardContent className="p-6">
                                <h4 className="font-bold text-gray-200 mb-6 flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-red-500" /> Recommended Readings
                                </h4>
                                <ul className="space-y-6 text-sm text-gray-400">
                                    <li className="pl-4 border-l-2 border-red-500/30 hover:border-red-500 transition-colors">
                                        <p className="italic text-gray-300 mb-1 font-medium leading-tight">Playful urban spaces: A historical approach to mobile games</p>
                                        <p className="text-xs text-gray-500 mt-1">de Souza e Silva, A., & Hjorth, L. (2009)</p>
                                    </li>
                                    <li className="pl-4 border-l-2 border-red-500/30 hover:border-red-500 transition-colors">
                                        <p className="italic text-gray-300 mb-1 font-medium leading-tight">Victorian snakes? Towards a cultural history of mobile games</p>
                                        <p className="text-xs text-gray-500 mt-1">Parikka, J., & Suominen, J. (2006)</p>
                                    </li>
                                    <li className="pl-4 border-l-2 border-red-500/30 hover:border-red-500 transition-colors">
                                        <p className="italic text-gray-300 mb-1 font-medium leading-tight">Software presentation: The retro mobile gaming database</p>
                                        <p className="text-xs text-gray-500 mt-1">Silva, A. D. S. E., & Glover-Rijkse, R. (2023)</p>
                                    </li>
                                </ul>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}