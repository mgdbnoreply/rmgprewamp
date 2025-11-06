"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { DonationButton } from "@/components/donation-button"
import { ArrowRight, Dna, Gamepad2, Globe, History, Archive } from "lucide-react"

export default function AboutPage() {
  const leadershipTeam = [
    {
      name: "Adriana de Souza e Silva",
      role: "Project Director",
      bio: "Adriana de Souza e Silva is Professor of Communication Studies and Director of the Center for Transformative Media at Northeastern University. Her research explores how mobile and locative media technologies shape urban mobility and public space, especially in developing world contexts. Adriana’s deep interest in mobile media culture led her to co-found RMGP, where she brings a global, interdisciplinary lens to the preservation of mobile gaming heritage.",
      link: "https://camd.northeastern.edu/people/adriana-de-souza-e-silva/",
      image: "/team/adriana.jpg",
    },
    {
      name: "Ragan Glover",
      role: "Project Director",
      bio: "Ragan Glover leads the RMGP initiative as Project Director, and serves as Director of the Michigan Research and Discovery Scholars at University of Michigan. Her work focuses on the sociocultural impacts of mobile and immersive media. Ragan’s passion for uncovering overlooked mobile gaming histories in varied cultural settings has helped shape RMGP’s mission to chart mobile play’s global past.",
      link: "https://lsa.umich.edu/mrads/people/Leadership-Team/ragan-glover.html",
      image: "/team/ragan.jpg",
    },
    {
      name: "Logan Brown",
      role: "Historian & Preservation Specialist",
      bio: "Logan Brown is a media historian and educator whose scholarship examines issues of power and capital in the history of video games, with a special emphasis on early American mobile games. As the project’s preservation specialist, Logan leads efforts to catalogue, contextualize, and communicate the archival artifacts gathered by RMGP, ensuring they are both accessible and meaningful for future scholarship.",
      link: "https://www.loganbrown.info",
      image: "/team/logan.jpg",
    },
  ]

  const researchAssistants = [
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

  const researchFocusAreas = [
    {
      icon: <History className="w-8 h-8 text-red-500" />,
      title: "Hardware & Runtime Histories",
      description: "Documenting mobile devices, operating systems, game runtimes (J2ME, BREW, Symbian, etc.), chipsets, screen resolutions, input mechanisms, and how these influenced game design and experience.",
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-red-500" />,
      title: "Game & Genre Evolution",
      description: "Cataloguing games by platform, year, region, input paradigm, distribution model, and examining how genres, mechanics and user communities evolved in mobile contexts.",
    },
    {
      icon: <Globe className="w-8 h-8 text-red-500" />,
      title: "Cultural & Regional Practices",
      description: "Exploring mobile gaming across different geographies, carriers, languages, and economic models—including how mobile games functioned in pre-smartphone environments and markets in Asia, Africa, and Latin America.",
    },
    {
      icon: <Archive className="w-8 h-8 text-red-500" />,
      title: "Preservation & Access",
      description: "Developing methods for representing, cataloguing, and providing access to legacy mobile hardware, game files, manuals, portal listings, and carrier metadata.",
    },
    {
      icon: <Dna className="w-8 h-8 text-red-500" />,
      title: "Interlinking Archive, Research & Play",
      description: "Ensuring that archival artifacts are connected to research outputs and interactive experiences so that the history is not simply stored, but can be traversed, understood, and experienced.",
    },
  ]

  return (
    <div className="bg-black text-white">
      <Header />
      <main className="relative z-10 overflow-hidden">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-red-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gray-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        {/* Hero Section (Glass Card) */}
        <section className="min-h-screen flex items-center pt-32 pb-16 md:pt-48 md:pb-24 px-4 md:px-8 lg:px-16">
          <div className="relative max-w-4xl mx-auto p-12 bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 text-white">Who We Are</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
              RMGP is an interdisciplinary initiative bringing together game historians, media scholars, archivists, developers, and mobile-gaming enthusiasts to document, preserve, and interpret the evolution of mobile games and devices.
            </p>
          </div>
        </section>

        {/* What is RMGP Section (Glass Card Layout) */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
            {/* Image Card */}
            <div className="relative h-96 md:h-auto min-h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <Image src="/retro-gaming-collection.jpg" alt="Collection of retro games" fill className="object-cover" />
            </div>
            {/* Text Card */}
            <div className="flex flex-col justify-center bg-black/30 backdrop-blur-lg rounded-3xl border border-white/10 shadow-2xl p-10 md:p-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What is RMGP?</h2>
              <p className="text-gray-300 leading-relaxed mb-4">
                The Retro Mobile Gaming Project (RMGP) is a comprehensive archival and research initiative dedicated to documenting the history and evolution of mobile gaming. The project brings together a curated collection of early mobile games, handheld devices, platforms, and related materials from the formative years of portable entertainment.
              </p>
              <p className="text-gray-300 leading-relaxed">
                RMGP functions as both a repository and reference framework for scholars, developers, and enthusiasts.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section (Red-Tinted Glass) */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto text-center">
            <div className="bg-red-950/20 backdrop-blur-lg rounded-3xl border border-red-500/30 shadow-2xl p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-lg md:text-xl text-gray-200 leading-relaxed max-w-4xl mx-auto">
                We are dedicated to assembling a rigorous, structured archive of mobile games, devices, platforms, and associated media; to provide researchers and practitioners with a trusted resource for studying the technological, aesthetic, and cultural dimensions of mobile gaming; and to foster public understanding of how portable play has shaped and continues to shape the interactions between hardware, software, users, and society.
              </p>
            </div>
          </div>
        </section>

        {/* Research Focus Areas (Glass Cards) */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Research Focus Areas</h2>
              <p className="text-lg text-gray-300 max-w-3xl mx-auto">We concentrate our efforts around several interrelated domains:</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchFocusAreas.map((area, index) => (
                <div key={index} className="bg-gray-900/50 backdrop-blur-md border border-white/10 shadow-xl hover:border-white/20 transition-all rounded-2xl p-8 flex flex-col">
                  <div className="mb-5">{area.icon}</div>
                  <h3 className="text-xl font-bold text-white mb-3">{area.title}</h3>
                  <p className="text-gray-300 leading-relaxed flex-grow">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Leadership Team Section (Gradient Glass Cards) */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Our Leadership Team</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {leadershipTeam.map((member, index) => (
                <div key={index} className="bg-gradient-to-br from-red-600/30 to-black/30 backdrop-blur-lg border border-red-700/30 rounded-2xl shadow-lg hover:shadow-red-500/20 transition-shadow flex flex-col overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder-user.jpg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="font-semibold text-red-300 mb-4">{member.role}</p>
                    <p className="text-gray-200 leading-relaxed flex-grow mb-6">{member.bio}</p>
                    <Button asChild className="mt-auto w-full bg-white hover:bg-gray-200 text-black font-bold">
                      <a href={member.link} target="_blank" rel="noopener noreferrer">
                        Learn more <ArrowRight className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Research Assistants Section (Gradient Glass Cards) */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16">
          <div className="max-w-6xl mx-auto w-full">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">Research Assistants</h2>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {researchAssistants.map((member, index) => (
                <div key={index} className="bg-gradient-to-br from-red-600/30 to-black/30 backdrop-blur-lg border border-red-700/30 rounded-2xl shadow-lg hover:shadow-red-500/20 transition-shadow flex flex-col overflow-hidden">
                  <div className="relative h-64 w-full">
                    <Image src={member.image || "/placeholder-user.jpg"} alt={member.name} fill className="object-cover" />
                  </div>
                  <div className="p-6 flex flex-col flex-grow text-white">
                    <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                    <p className="font-semibold text-red-300 mb-4">{member.role}</p>
                    <p className="text-gray-200 leading-relaxed flex-grow">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        
      </main>
      <Footer />
      <DonationButton />
    </div>
  )
}