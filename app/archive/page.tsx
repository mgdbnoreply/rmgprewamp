"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { DonationButton } from "@/components/donation-button"
import { ArrowRight, Gamepad2, Archive, History, Smartphone } from "lucide-react"
import { GameAPI } from "@/services/api"
import type { GameData, CollectionData } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

// Badge color helper for consistent styling
const badgeColorClasses: { [key: string]: string } = {
  phone: "bg-green-500/10 text-green-400 border-green-500/20",
  game: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  console: "bg-red-500/10 text-red-400 border-red-500/20",
  proprietary: "bg-purple-500/10 text-purple-400 border-purple-500/20",
}

export default function ArchivePage() {
  const [games, setGames] = useState<GameData[]>([])
  const [collections, setCollections] = useState<CollectionData[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        // 1. Fetch Games
        const gamesResponse = await GameAPI.getAllGames()
        if (Array.isArray(gamesResponse)) {
          const getString = (obj: any): string => {
            if (!obj) return ""
            if (typeof obj === "string") return obj
            if (obj.S) return obj.S
            if (obj.SS) return obj.SS.join(", ")
            return ""
          }
          
          const mappedGames: GameData[] = gamesResponse.map((game: any) => ({
            Title: getString(game.GameTitle || game.Title),
            Year: getString(game.YearDeveloped || game.Year),
            Developers: getString(game.Developer || game.Developers),
            Pictures: getString(game.Photos || game.Pictures),
            Genre: getString(game.Genre),
            Hardware: getString(game.HardwareFeatures || game.Hardware),
            "# Players": getString(game.Players || game["# Players"]),
            City: "", Country: "", URL: "", Description: "", Documentation: "", 
            Articles: "", Purpose: "", "Open Source": "", Location: "", 
            Connectivity: "", Contact: "",
          }))
          // Slice 6 for the grid (2 rows of 3)
          setGames(mappedGames.slice(0, 8)) 
        }

        // 2. Fetch Collections (Devices)
        const collectionsResponse = await GameAPI.getCollections()
        if (Array.isArray(collectionsResponse)) {
          setCollections(collectionsResponse.slice(0, 8))
        }

      } catch (error) {
        console.error("Error fetching archive data:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  const getFirstImage = (pictures: string | undefined) => {
    if (!pictures) return "/placeholder.svg"
    const imageUrls = pictures.split(",").map((url) => url.trim())
    return imageUrls[0] || "/placeholder.svg"
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      
      <main className="relative z-10 pb-0">
        
        {/* --- Hero Section --- */}
        <section className="relative w-full mt-20 py-24 md:py-32 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/archieve.jpg" 
              alt="Archive Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                Digital Repository
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                Explore the <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Archive
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                The RMGP archive is a comprehensive collection of mobile games, handheld devices, and platforms from 1975 to 2008, serving as a permanent record of portable play.
              </p>
            </div>
          </div>
        </section>
        
        {/* --- About the Archive (Split Layout) --- */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white relative overflow-hidden -mt-10 z-20">
          <div className="container mx-auto">
            <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                {/* Image Card */}
                <div className="relative h-[400px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                  <Image 
                    src="/retro-gaming-collection.jpg" 
                    alt="Collection of retro games" 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <div className="flex items-center gap-2 mb-2">
                      <History className="w-5 h-5 text-red-400" />
                      <span className="font-bold text-sm uppercase tracking-wider">Historical Preservation</span>
                    </div>
                    <p className="text-lg font-medium opacity-90">Cataloging over 30 years of history.</p>
                  </div>
                </div>

                {/* Text Content */}
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-600 text-sm font-bold w-fit mb-6 border border-red-100">
                    <Archive className="w-4 h-4" />
                    <span>Our Mission</span>
                  </div>
                  <h2 className="text-3xl md:text-5xl font-black mb-6 text-gray-900 leading-tight">
                    Preserving <br/>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-black">
                      Digital Heritage
                    </span>
                  </h2>
                  <p className="text-gray-600 text-lg leading-relaxed mb-6">
                    The Retro Mobile Gaming Project functions as both a repository and a reference framework for scholars, developers, and enthusiasts. We go beyond simple storage; we contextualize each artifact within its technological and cultural era.
                  </p>
                  <div className="flex flex-wrap gap-4 pt-2">
                    <Button asChild className="bg-gray-900 text-white hover:bg-gray-800 rounded-full px-8 py-6 text-lg shadow-lg">
                      <Link href="/database">
                        Search Database <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </Button>
                    <Button asChild variant="outline" className="border-gray-200 text-gray-700 hover:bg-gray-50 rounded-full px-8 py-6 text-lg">
                      <Link href="/contribute">
                        Contribute Data
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- Featured Database (Grid Layout) --- */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gray-50 border-t border-gray-100">
          <div className="max-w-[100rem] mx-auto">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-red-600 font-bold uppercase tracking-wider text-sm block mb-2">Software Archive</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900">Database</h2>
              </div>
              <Button asChild variant="link" className="text-red-600 hover:text-red-700 font-bold text-lg p-0">
                <Link href="/database" className="flex items-center gap-2">
                  View Full Database <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            {/* 6 Cards Grid (3x2) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {loading ? (
                   /* Loading Skeletons */
                   Array.from({ length: 8 }).map((_, i) => (
                     <div key={i} className="bg-gray-200 rounded-2xl h-[400px] animate-pulse"></div>
                   ))
                ) : (
                  games.map((game, index) => (
                    <Link href="/database" key={index} className="group block relative bg-gradient-to-br from-red-600 to-red-900 rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl hover:shadow-red-500/30 transition-all duration-300 transform hover:-translate-y-2 border border-red-500/20 h-full flex flex-col">
                      <div className="relative w-full aspect-[4/3] overflow-hidden bg-black/20">
                        <Image
                          src={getFirstImage(game.Pictures)}
                          alt={game.Title}
                          fill
                          className="object-cover transition-transform duration-500 group-hover:scale-110"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                        <div className="absolute top-4 right-4">
                          <span className="bg-black/60 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold border border-white/10 shadow-sm">
                            {game.Year}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 flex flex-col flex-grow">
                        <h3 className="font-bold text-xl text-white mb-2 line-clamp-1 group-hover:text-red-100 transition-colors">
                          {game.Title}
                        </h3>
                        <p className="text-red-100/80 text-sm mb-4 line-clamp-1">
                          {game.Developers}
                        </p>
                        <div className="flex items-center gap-2 mt-auto">
                          <Badge variant="secondary" className="bg-black/30 text-white hover:bg-black/40 border-0 backdrop-blur-sm">
                            {game.Genre ? game.Genre.split(",")[0] : "Game"}
                          </Badge>
                          <Badge variant="outline" className="text-red-100 border-red-400/30">
                            {game.Hardware ? game.Hardware.split(",")[0] : "Platform"}
                          </Badge>
                        </div>
                      </div>
                    </Link>
                  ))
                )}
            </div>
          </div>
        </section>

        {/* --- Featured Collection (Carousel) --- */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white relative">
           {/* Background decoration */}
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-50 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

          <div className="max-w-[100rem] mx-auto relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <span className="text-blue-600 font-bold uppercase tracking-wider text-sm block mb-2">Hardware</span>
                <h2 className="text-4xl md:text-5xl font-black text-gray-900">Collection</h2>
              </div>
              <Button asChild variant="link" className="text-blue-600 hover:text-blue-700 font-bold text-lg p-0">
                <Link href="/collection" className="flex items-center gap-2">
                  View Full Collection <ArrowRight className="w-5 h-5" />
                </Link>
              </Button>
            </div>

            <Carousel opts={{ loop: true, align: "start" }} className="w-full">
              <CarouselContent className="-ml-6">
                {loading ? (
                   /* Loading Skeletons */
                   Array.from({ length: 8 }).map((_, i) => (
                     <CarouselItem key={i} className="pl-6 md:basis-1/2 lg:basis-1/4">
                       <div className="bg-gray-100 rounded-2xl h-[350px] animate-pulse"></div>
                     </CarouselItem>
                   ))
                ) : (
                  collections.map((item, index) => (
                    <CarouselItem key={index} className="pl-6 md:basis-1/2 lg:basis-1/4">
                      <Link href="/collection" className="group relative bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col overflow-hidden h-full border border-gray-100 hover:border-blue-200">
                        <div className="relative h-64 w-full bg-gray-50/50 p-8 flex items-center justify-center">
                          <Image
                            src={getFirstImage(item.image)}
                            alt={item.name}
                            fill
                            className="object-contain p-6 group-hover:scale-110 transition-transform duration-500 drop-shadow-md"
                            onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                          />
                          <div className="absolute top-4 right-4 bg-white/80 backdrop-blur-md text-gray-900 px-3 py-1 rounded-full font-bold text-xs border border-gray-200 shadow-sm">
                            {item.year}
                          </div>
                        </div>
                        <div className="p-6 flex flex-col flex-grow">
                          <div className="flex items-center gap-2 mb-3">
                            <span className={cn(
                              "px-2.5 py-0.5 rounded-full font-bold text-[10px] uppercase tracking-wide border",
                              badgeColorClasses[item.category?.toLowerCase()] || "bg-gray-100 text-gray-600 border-gray-200"
                            )}>
                              {item.category || "Device"}
                            </span>
                            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{item.maker}</span>
                          </div>
                          <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition-colors">{item.name}</h3>
                          <p className="text-gray-400 text-sm leading-relaxed flex-grow line-clamp-3">{item.description}</p>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))
                )}
              </CarouselContent>
              <div className="flex justify-end gap-2 mt-8">
                <CarouselPrevious className="relative translate-y-0 translate-x-0 left-0 bg-transparent text-gray-900 border-gray-300 hover:bg-black hover:text-white" />
                <CarouselNext className="relative translate-y-0 translate-x-0 right-0 bg-transparent text-gray-900 border-gray-300 hover:bg-black hover:text-white" />
              </div>
            </Carousel>
          </div>
        </section>
        
      </main>
      <Footer />
      <DonationButton />
    </div>
  )
}