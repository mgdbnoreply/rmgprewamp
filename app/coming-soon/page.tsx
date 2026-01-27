"use client"

import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function ComingSoonPage() {
  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-black flex items-center justify-center pt-32 pb-20 relative overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/30 rounded-full blur-[150px] -mr-40 -mt-40 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-red-900/20 rounded-full blur-[120px] -ml-40 -mb-40 pointer-events-none"></div>

        <div className="max-w-4xl mx-auto px-4 md:px-8 text-center relative z-10">
          {/* Coming Soon Text */}
          <div className="mb-12">
            <h1 className="text-6xl md:text-8xl font-black leading-tight mb-8 bg-gradient-to-r from-red-600 via-red-500 to-black text-transparent bg-clip-text animate-pulse">
              Coming Soon
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto">
              We're working on something amazing. Check back soon for an exciting new experience.
            </p>

            {/* Animated dots */}
            <div className="flex justify-center gap-3 mb-12">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0s" }}></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
              <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: "0.4s" }}></div>
            </div>
          </div>

          {/* Return to Home Button */}
          <Link 
            href="/"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold rounded-xl transition-all transform hover:scale-105"
          >
            Back to Home
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </main>

      <Footer />
    </>
  )
}
