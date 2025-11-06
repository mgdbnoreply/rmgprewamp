"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import Image from "next/image"

export default function MissionPage() {
  return (
    <div
      className="min-h-screen text-white"
      style={{
        background: "linear-gradient(to bottom right, #000000, #0a0a0a, #000000)",
      }}
    >
      <Header />

      <main className="relative">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Title Section */}
        <section className="relative pb-10 overflow-hidden">
          {/* Animated background pattern */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.05) 35px, rgba(255,255,255,.05) 70px)`,
                animation: "slide 20s linear infinite",
              }}
            ></div>
          </div>

          <div className="relative w-full px-4 md:px-8 lg:px-16 flex flex-col items-center space-y-6">
            <div className="bg-gradient-to-r from-black/80 to-gray-900/80 backdrop-blur-md border-4 border-white/90 rounded-full py-1 px-12 md:py-2 md:px-24 lg:px-32 flex items-center justify-center shadow-2xl max-w-6xl w-full">
              <div className="flex items-center justify-center space-x-2 sm:space-x-4 md:space-x-6">
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  OUR
                </h1>
                <div className="relative w-20 h-20 md:w-24 md:h-24 flex-shrink-0">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left-0 top-1/2 -translate-y-1/2 z-0 animate-pulse"></div>
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-6 md:left-8 top-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight text-white">
                  MISSION
                </h1>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-md rounded-full py-3 md:py-4 flex items-center relative shadow-2xl border border-red-500/30 max-w-6xl w-full overflow-hidden px-16 md:px-24">
              <div className="flex whitespace-nowrap animate-marquee ml-8 md:ml-12">
                <p className="text-lg md:text-xl lg:text-2xl text-white font-bold tracking-wide">
                  Preserving The Past • Inspiring The Future • Preserving The Past • Inspiring The Future • Preserving
                  The Past • Inspiring The Future •
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="relative py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-red-500/10 to-red-700/5 backdrop-blur-md border border-red-500/20 rounded-3xl p-12 md:p-16 shadow-2xl text-center">
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-red-500">Our Mission</h2>
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                To preserve the history of mobile gaming and provide researchers, developers, and enthusiasts with a
                comprehensive resource for understanding the evolution of mobile games from 1975 to 2008.
              </p>
            </div>
          </div>
        </section>

        {/* Goals Section */}
        <section className="relative py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              What We Do
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-black/40 backdrop-blur-md border border-gray-800/50 rounded-3xl p-8 shadow-2xl hover:border-red-500/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-6">
                  <span className="text-3xl">📚</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Preserve History</h3>
                <p className="text-gray-400 leading-relaxed">
                  We collect and archive mobile games from 1975 to 2008, ensuring this important part of gaming history
                  is not lost to time.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-md border border-gray-800/50 rounded-3xl p-8 shadow-2xl hover:border-red-500/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-6">
                  <span className="text-3xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Enable Research</h3>
                <p className="text-gray-400 leading-relaxed">
                  Our robust search system helps researchers find games and create new correlations among historical
                  types of mobile games.
                </p>
              </div>

              <div className="bg-black/40 backdrop-blur-md border border-gray-800/50 rounded-3xl p-8 shadow-2xl hover:border-red-500/50 transition-all">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-700 flex items-center justify-center mb-6">
                  <span className="text-3xl">🎓</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Educate</h3>
                <p className="text-gray-400 leading-relaxed">
                  We provide educational resources for developers, students, and enthusiasts to learn about the
                  evolution of mobile gaming.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Vision Section */}
        <section className="relative py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="relative h-[400px] rounded-3xl overflow-hidden shadow-2xl">
                <Image src="/game-boy-tetris.jpg" alt="Mobile Gaming Evolution" fill className="object-cover" />
              </div>
              <div className="bg-black/40 backdrop-blur-md border border-gray-800/50 rounded-3xl p-8 md:p-12 shadow-2xl">
                <h2 className="text-3xl md:text-4xl font-bold mb-6 text-red-500">Our Vision</h2>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed mb-4">
                  We envision a world where the rich history of mobile gaming is accessible to everyone, inspiring new
                  generations of game developers and researchers.
                </p>
                <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                  By preserving these games and making them searchable, we create opportunities for understanding how
                  mobile gaming evolved and influenced the broader gaming industry.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
;<style jsx>{`
  @keyframes slide {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(-50%, -50%);
    }
  }

  @keyframes marquee {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-33.33%);
    }
  }

  .animate-marquee {
    animation: marquee 20s linear infinite;
  }
`}</style>
