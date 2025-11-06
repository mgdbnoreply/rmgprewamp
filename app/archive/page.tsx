"use client"

import { useState, useEffect } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { DonationButton } from "@/components/donation-button"
import { ArrowRight, ChevronLeft, ChevronRight, Gamepad2, Users } from "lucide-react"
import { GameAPI } from "@/services/api"
import type { GameData } from "@/lib/types"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { cn } from "@/lib/utils"

// Data for the collection carousel (same as collection page)
const collectionItems = [
  {
    category: 'phones',
    brand: 'Samsung',
    title: 'Samsung A107',
    year: '2010',
    description: 'Clamshell phone designed for basic calling and texting.',
    image: '/samsung-a107.jpg' 
  },
  {
    category: 'games',
    brand: 'N-Gage',
    title: 'Tiger Woods PGA Tour',
    year: '2004',
    description: 'Golf simulation game allowing character selection and 19-hole play.',
    image: '/tiger-woods-ngage.jpg' 
  },
  {
    category: 'phones',
    brand: 'Nokia',
    title: 'Nokia 3310',
    year: '2000',
    description: 'Durable phone famous for its long battery life and pre-installed games.',
    image: '/nokia-3310.jpg' 
  },
  {
    category: 'consoles',
    brand: 'Sega',
    title: 'Sega Game Gear',
    year: '1991',
    description: 'Handheld game console with a color screen requiring cartridges.',
    image: '/sega-game-gear.jpg' 
  },
  {
    category: 'proprietary',
    brand: 'Tiger Electronics',
    title: 'Gigapet',
    year: '1997',
    description: 'Digital pet simulator with various animal themes including the "Digital Doggie" shown here.',
    image: '/gigapet.jpg' 
  },
  {
    category: 'consoles',
    brand: 'Nintendo',
    title: 'Nintendo DSi XL',
    year: '2009/2010',
    description: 'Larger version of the DSi with dual screens and touch capability.',
    image: '/nintendo-dsi-xl.jpg' 
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
]

// Badge color helper for new gradient cards
const badgeColorClasses: { [key: string]: string } = {
  phones: "bg-green-800/50 text-green-200 border border-green-500/50",
  games: "bg-blue-800/50 text-blue-200 border border-blue-500/50",
  consoles: "bg-red-800/50 text-red-200 border border-red-500/50",
  proprietary: "bg-purple-800/50 text-purple-200 border border-purple-500/50",
}

export default function ArchivePage() {
  const [games, setGames] = useState<GameData[]>([])
  const [loading, setLoading] = useState(true)

  // Fetch games for the carousel
  useEffect(() => {
    async function fetchGames() {
      try {
        const response = await GameAPI.getAllGames()
        if (Array.isArray(response)) {
          const getString = (obj: any): string => {
            if (!obj) return ""
            if (typeof obj === "string") return obj
            if (obj.S) return obj.S
            if (obj.SS) return obj.SS.join(", ")
            return ""
          }
          const mappedGames: GameData[] = response.map((game: any) => ({
            Title: getString(game.GameTitle),
            Year: getString(game.YearDeveloped),
            Developers: getString(game.Developer),
            Pictures: getString(game.Photos),
            Genre: getString(game.Genre),
            Hardware: getString(game.HardwareFeatures),
            "# Players": getString(game.Players),
            // Add other fields as needed
            City: "", Country: "", URL: "", Description: "", Documentation: "", Articles: "", Purpose: "", "Open Source": "", Location: "", Connectivity: "", Contact: "",
          }))
          setGames(mappedGames.slice(0, 8)) // Get first 8 for carousel
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching games:", error)
        setLoading(false)
      }
    }
    fetchGames()
  }, [])

  const getFirstImage = (pictures: string | undefined) => {
    if (!pictures) return "/placeholder.svg"
    const imageUrls = pictures.split(",").map((url) => url.trim())
    return imageUrls[0] || "/placeholder.svg"
  }

  return (
    // Page background is white, text is dark
    <div className="bg-white text-gray-900">
      <Header />
      {/* Main content floats on the white bg */}
      <main className="relative z-10">
        
        {/* Hero Section (New Glass Design) */}
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
        
        {/* About the Archive Section (Red/Black Gradient Glass) */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-600/90 to-black/90 backdrop-blur-lg rounded-3xl border border-red-500/30 shadow-2xl p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">About the Archive</h2>
              <p className="text-lg md:text-xl text-red-50 leading-relaxed max-w-5xl mx-auto">
                The RMGP archive is the core of our project, a comprehensive collection of mobile games, handheld devices, platforms, and related materials from 1975 to 2008. It functions as both a repository and a reference framework for scholars, developers, and enthusiasts, allowing us to preserve and study the rich history of portable play.
              </p>
            </div>
          </div>
        </section>

        {/* Featured Games Carousel */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">Featured Games</h2>
            <Carousel opts={{ loop: true, align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {games.map((game, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <div className="group cursor-pointer bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg border border-red-700/30 rounded-2xl shadow-lg hover:shadow-red-500/40 transition-shadow flex flex-col overflow-hidden h-full">
                      <div className="relative overflow-hidden w-full aspect-square">
                        <Image
                          src={getFirstImage(game.Pictures) || "/placeholder.svg"}
                          alt={game.Title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = "/placeholder.svg" }}
                        />
                        <div className="absolute top-4 right-4">
                          <span className="bg-black/50 backdrop-blur-sm text-white px-3 py-1 rounded-full text-xs font-bold">
                            {game.Year}
                          </span>
                        </div>
                      </div>
                      <div className="p-6 space-y-1 text-white flex flex-col flex-grow">
                        <h3 className="font-bold text-xl line-clamp-1 group-hover:text-red-100 transition-colors">
                          {game.Title}
                        </h3>
                        <p className="text-red-50/90 text-sm line-clamp-1">{game.Developers}</p>
                        <div className="flex items-center justify-between pt-2 flex-grow">
                          <p className="text-red-100/80 text-sm line-clamp-1">{game.Genre.split(",")[0]}</p>
                          <p className="text-red-100/80 text-sm">{game.Hardware.split(",")[0]}</p>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4" />
            </Carousel>
            <div className="text-center mt-12">
              <Button asChild className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all text-lg">
                <Link href="/database">
                  See More Games <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Featured Devices Carousel */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-12 text-center">Featured Devices</h2>
            <Carousel opts={{ loop: true, align: "start" }} className="w-full">
              <CarouselContent className="-ml-4">
                {collectionItems.slice(0, 8).map((item, index) => (
                  <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/4">
                    <div className="group relative bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg rounded-2xl shadow-lg hover:shadow-red-500/40 transition-shadow flex flex-col overflow-hidden h-full border border-red-700/30">
                      <div className="relative h-64 w-full bg-white/10 p-4">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.title}
                          fill
                          className="object-contain p-4 group-hover:scale-105 transition-transform duration-500"
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
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4" />
              <CarouselNext className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4" />
            </Carousel>
            <div className="text-center mt-12">
              <Button asChild className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold px-8 py-6 rounded-full shadow-lg hover:shadow-xl transition-all text-lg">
                <Link href="/collection">
                  See More Collection <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
      <DonationButton />
    </div>
  )
}