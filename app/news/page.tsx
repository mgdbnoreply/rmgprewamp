"use client"

import Header from "@/components/header"
import { Footer } from "@/components/footer"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, ExternalLink, ArrowRight } from "lucide-react"

export default function NewsPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 font-sans">
      <Header />

      <main className="relative z-10 pb-0">
        
        {/* --- Hero Section (Education Style) --- */}
        <section className="relative w-full mt-20 py-24 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/news.avif"
              alt="News Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                Latest Updates
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                News & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Announcements
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Stay up to date with the latest developments, featured stories, and press releases from the Retro Mobile Gaming Project.
              </p>
            </div>
          </div>
        </section>

        {/* --- Featured Article Section --- */}
        <section className="container mx-auto px-4 py-16 md:py-24 relative z-20 -mt-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-gray-100 flex flex-col lg:flex-row group hover:shadow-3xl transition-all duration-300">
               
               {/* Image Side */}
               <div className="lg:w-1/2 relative min-h-[300px] lg:min-h-[500px] overflow-hidden">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/032725_MM_Adriana_De_Souza_E_Silva_008.jpg-2-ZYoi1aCXZZbDq3CzkwwZefwjTXczRi.webp"
                    alt="Game Preservation Database Launch"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-black/10"></div>
               </div>

               {/* Content Side */}
               <div className="lg:w-1/2 p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white">
                  <div className="flex items-center gap-3 mb-6">
                     <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50 px-3 py-1 uppercase tracking-wider text-xs font-bold">
                        Featured
                     </Badge>
                     <span className="text-gray-400 text-sm font-medium flex items-center gap-1">
                        <Calendar className="w-3 h-3" /> April 1, 2025
                     </span>
                  </div>

                  <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-6 leading-tight">
                    Northeastern University Launches Game Preservation Database
                  </h2>

                  <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                    The Center for Transformative Media at Northeastern University has launched a comprehensive database dedicated to preserving the history of mobile gaming. This initiative aims to document and archive mobile games from 1975 to 2008, providing researchers, developers, and enthusiasts with a valuable resource for understanding the evolution of mobile gaming.
                  </p>
                  
                  <div className="mt-auto pt-4">
                    <Button asChild className="bg-red-600 hover:bg-red-700 text-white rounded-full px-8 py-6 text-lg font-semibold shadow-lg hover:shadow-red-500/30 transition-all">
                        <a 
                          href="https://news.northeastern.edu/2025/04/01/game-preservation-database/?utm_source=News%40Northeastern&utm_campaign=5ca18ea199-EMAIL_CAMPAIGN_2022_09_22_11_00_COPY_01&utm_medium=email&utm_term=0_508ab516a3-5ca18ea199-279529680" 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="flex items-center gap-2"
                        >
                        Read Full Article <ExternalLink className="w-5 h-5" />
                        </a>
                    </Button>
                  </div>
               </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}