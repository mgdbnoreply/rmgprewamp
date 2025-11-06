"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { DonationButton } from "@/components/donation-button"

export default function TeamPage() {
  const directors = [
    {
      name: "Adriana de Souza e Silva",
      role: "Project Director",
      bio: "Adriana de Souza e Silva is a Professor of Communication Studies Director of the Center for Transformative Media at Northeastern University. Dr. de Souza e Silva's research investigates how engagement with mobile and locative media technologies shape urban mobility and interactions with public spaces, primarily in the developing world.",
      link: "https://camd.northeastern.edu/people/adriana-de-souza-e-silva/",
      image: "/team/adriana.jpg",
    },
    {
      name: "Ragan Glover",
      role: "Project Director",
      bio: "Ragan Glover is the director of the Michigan Research and Discovery Scholars at the University of Michigan. Her work focuses on the sociocultural impact of mobile and immersive media.",
      link: "https://lsa.umich.edu/mrads/people/Leadership-Team/ragan-glover.html",
      image: "/team/ragan.jpg",
    },
    {
      name: "Logan Brown",
      role: "Historian and Preservation Specialist",
      bio: "Logan Brown is a media historian and educator whose work focuses on issues of power and capital in the history of video games, including the early American mobile games industry.",
      link: "https://www.loganbrown.info",
      image: "/team/logan.jpg",
    },
  ]

  const assistants = [
    {
      name: "Arslan Parkar",
      role: "MS in Information Systems",
      bio: "Arslan is pursuing an MS in information systems at Northeastern. He has experience in leading an AI-driven startup and has done impactful research projects focusing on innovative, user-centric solutions.",
      image: "/team/arslan.jpg",
    },
    {
      name: "Kannan Karthikeyan",
      role: "Software Engineering Graduate Student",
      bio: "Kannan is a software engineering graduate student at Northeastern who blends his lifelong passion for gaming with technical expertise to advance the RMGP initiative.",
      image: "/team/kannan.jpg",
    },
    {
      name: "Yahan (Fiona) Wu",
      role: "Dean's Honors Fellow",
      bio: "Fiona is a Dean's Honors Fellow pursuing a BS in Computer Science and Media Arts, contributing her technical and creative skills to the RMGP project.",
      image: "/team/fiona.jpg",
    },
  ]

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
                  TEAM
                </h1>
              </div>
            </div>

            <div className="bg-gradient-to-r from-red-600/90 to-red-700/90 backdrop-blur-md rounded-full py-3 md:py-4 flex items-center relative shadow-2xl border border-red-500/30 max-w-6xl w-full overflow-hidden px-16 md:px-24">
              <div className="flex whitespace-nowrap animate-marquee ml-8 md:ml-12">
                <p className="text-lg md:text-xl lg:text-2xl text-white font-bold tracking-wide">
                  Meet the scholars leading this initiative • Meet the scholars leading this initiative • Meet the
                  scholars leading this initiative •
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Hero Section */}
        <section className="relative py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-md border border-gray-700/50 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">Leading Mobile Gaming Preservation</h2>
              <p className="text-lg text-gray-300 leading-relaxed">
                Our team of dedicated scholars, historians, and researchers work together to preserve and document the
                rich history of mobile gaming from 1975 to 2008.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="relative py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-3xl overflow-hidden shadow-2xl">
              <div className="grid md:grid-cols-2 gap-0">
                <div className="p-12 flex flex-col justify-center">
                  <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    To preserve the history of mobile gaming and provide researchers, developers, and enthusiasts with a
                    comprehensive resource for understanding the evolution of mobile games from 1975 to 2008. We are
                    committed to documenting, archiving, and sharing this important cultural heritage.
                  </p>
                </div>
                <div className="relative h-[400px] bg-gradient-to-br from-gray-200 to-gray-300">
                  <div className="absolute inset-0 flex items-center justify-center text-gray-400 text-6xl">📱</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Directors */}
        <section className="relative py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">
                Meet the scholars leading this initiative
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                {directors.map((director, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-300 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="relative">
                      <div className="relative h-[280px] bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-3xl">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-7xl">
                          👤
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold border border-gray-300">
                          {director.role}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{director.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-4">{director.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Research Assistants */}
        <section className="relative py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="bg-white/95 backdrop-blur-md border-2 border-gray-200 rounded-3xl p-12 shadow-2xl">
              <h2 className="text-3xl md:text-4xl font-bold mb-12 text-gray-900">Research Assistants</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {assistants.map((assistant, index) => (
                  <div
                    key={index}
                    className="bg-white border-2 border-gray-300 rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all"
                  >
                    <div className="relative">
                      <div className="relative h-[280px] bg-gradient-to-br from-gray-300 to-gray-400 rounded-t-3xl">
                        <div className="absolute inset-0 flex items-center justify-center text-gray-500 text-7xl">
                          👤
                        </div>
                      </div>
                      <div className="absolute top-4 right-4">
                        <span className="bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-xs font-bold border border-gray-300">
                          {assistant.role}
                        </span>
                      </div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-xl font-bold mb-2 text-gray-900">{assistant.name}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed line-clamp-4">{assistant.bio}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />

      {/* Floating Donation Button */}
      <DonationButton />
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
