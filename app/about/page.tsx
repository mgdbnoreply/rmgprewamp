"use client"

import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import Image from "next/image"
import { DonationButton } from "@/components/donation-button"
import { ArrowRight, Dna, Gamepad2, Globe, History, Archive } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function AboutPage() {
  const leadershipTeam = [
    {
      name: "Adriana de Souza e Silva",
      role: "Project Director",
      bio: "Adriana de Souza e Silva is Professor of Communication Studies and Director of the Center for Transformative Media at Northeastern University. Her research explores how mobile and locative media technologies shape urban mobility and public space, especially in developing world contexts. Adriana’s deep interest in mobile media culture led her to co-found RMGP, where she brings a global, interdisciplinary lens to the preservation of mobile gaming heritage.",
      link: "https://camd.northeastern.edu/people/adriana-de-souza-e-silva/",
      image: "https://d3tvevvhad9ws1.cloudfront.net/wp-content/uploads/2024/07/Adriana_de_Souza_e_Silva_1-1_headshot-549x600.jpg",
    },
    {
      name: "Ragan Glover",
      role: "Project Director",
      bio: "Ragan Glover leads the RMGP initiative as Project Director, and serves as Director of the Michigan Research and Discovery Scholars at University of Michigan. Her work focuses on the sociocultural impacts of mobile and immersive media. Ragan’s passion for uncovering overlooked mobile gaming histories in varied cultural settings has helped shape RMGP’s mission to chart mobile play’s global past.",
      link: "https://lsa.umich.edu/mrads/people/Leadership-Team/ragan-glover.html",
      image: "https://d3tvevvhad9ws1.cloudfront.net/wp-content/uploads/2024/12/ragan-glover.jpg",
    },
    {
      name: "Logan Brown",
      role: "Historian & Preservation Specialist",
      bio: "Logan Brown is a media historian and educator whose scholarship examines issues of power and capital in the history of video games, with a special emphasis on early American mobile games. As the project’s preservation specialist, Logan leads efforts to catalogue, contextualize, and communicate the archival artifacts gathered by RMGP, ensuring they are both accessible and meaningful for future scholarship.",
      link: "https://www.loganbrown.info",
      image: "https://www.rmgd.org/images/logan-brown.jpeg",
    },
  ]

  const researchAssistants = [
    {
      name: "Sutanuka Jashu",
      role: "Ph.D. Student",
      bio: "Sutanuka Jashu is an interdisciplinary artist and researcher from West Bengal, India, working at the nexus of art, technology, and cultural resilience. Her current practice integrates AI, adaptive systems, and speculative storytelling to critique digital colonialism, reimagine historical narratives, and explore ecological futures.",
      image: "https://d3tvevvhad9ws1.cloudfront.net/wp-content/uploads/2025/07/Sutanuka-Jashu-phd-student-207x300.png",
    },
    {
      name: "Arslan Parkar",
      role: "MS in Information Systems",
      bio: "Arslan is pursuing an MS in information systems at Northeastern. He has experience in leading an AI-driven startup and has done impactful research projects focusing on innovative, user-centric solutions.",
      image: "https://mobilecreativity.net/wp-content/uploads/2025/09/Arslan-Parkar-2.jpg",
    },
    {
      name: "Kaushik Manivannan",
      role: "Software Engineering Graduate Student",
      bio: "Kaushik is a graduate student in Software Engineering Systems at Northeastern’s College of Engineering, driven by a passion for developing AI solutions that can make a real difference in people’s lives.",
      image: "https://burnes.northeastern.edu/wp-content/uploads/Screenshot-2024-12-19-at-10.10.12%E2%80%AFAM.png",
    },
    {
      name: "Alessandra Diaz",
      role: "Research Assistant ",
      bio: "Ale is a third-year student at Northeastern University pursuing a combined major in Business Administration and Experience Design. As a research assistant, she brings both technical expertise and creative insight to her work. With hands-on experience in UX/UI, she has contributed to impactful projects centered on designing innovative, user-focused solutions that balance functionality with thoughtful design.",
      image: "https://mobilecreativity.net/wp-content/uploads/2025/09/DSC6656-scaled.jpg",
    },
  ]
  
  const researchFocusAreas = [
    {
      icon: <History className="w-8 h-8 text-red-600" />,
      title: "Hardware & Runtime Histories",
      description: "Documenting mobile devices, operating systems, game runtimes (J2ME, BREW, Symbian, etc.), chipsets, screen resolutions, input mechanisms, and how these influenced game design and experience.",
    },
    {
      icon: <Gamepad2 className="w-8 h-8 text-red-600" />,
      title: "Game & Genre Evolution",
      description: "Cataloguing games by platform, year, region, input paradigm, distribution model, and examining how genres, mechanics and user communities evolved in mobile contexts.",
    },
    {
      icon: <Globe className="w-8 h-8 text-red-600" />,
      title: "Cultural & Regional Practices",
      description: "Exploring mobile gaming across different geographies, carriers, languages, and economic models—including how mobile games functioned in pre-smartphone environments and markets in Asia, Africa, and Latin America.",
    },
    {
      icon: <Archive className="w-8 h-8 text-red-600" />,
      title: "Preservation & Access",
      description: "Developing methods for representing, cataloguing, and providing access to legacy mobile hardware, game files, manuals, portal listings, and carrier metadata.",
    },
    {
      icon: <Dna className="w-8 h-8 text-red-600" />,
      title: "Interlinking Archive, Research & Play",
      description: "Ensuring that archival artifacts are connected to research outputs and interactive experiences so that the history is not simply stored, but can be traversed, understood, and experienced.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />
      
      <main className="relative z-10">
        
        {/* --- Hero Section --- */}
        <section className="relative w-full mt-20 py-24 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/about.jpg"
              alt="About Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                About Us
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                Who We&nbsp;
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Are
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                RMGP is an interdisciplinary initiative bringing together game historians, media scholars, archivists, developers, and mobile-gaming enthusiasts to document, preserve, and interpret the evolution of mobile games and devices.
              </p>
            </div>
          </div>
        </section>
        
        {/* --- What is RMGP Section (Overlapping Card) --- */}
        <section className="container mx-auto px-4 -mt-20 relative z-20 pb-16">
          <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              {/* Image Side */}
              <div className="relative h-[400px] md:h-[500px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                <Image 
                  src="/retro-gaming-collection.jpg" 
                  alt="Collection of retro games" 
                  fill 
                  className="object-cover transition-transform duration-700 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
              </div>
              {/* Text Side */}
              <div className="flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 mb-4">
                  <div className="w-8 h-1 bg-red-600 rounded-full"></div>
                  <span className="text-red-600 font-bold uppercase tracking-wider text-sm">Overview</span>
                </div>
                <h2 className="text-4xl md:text-5xl font-black mb-6 text-gray-900">What is RMGP?</h2>
                <p className="text-gray-600 text-lg leading-relaxed mb-6">
                  The Retro Mobile Gaming Project (RMGP) is a comprehensive archival and research initiative dedicated to documenting the history and evolution of mobile gaming. The project brings together a curated collection of early mobile games, handheld devices, platforms, and related materials from the formative years of portable entertainment.
                </p>
                <p className="text-gray-600 text-lg leading-relaxed">
                  RMGP functions as both a repository and reference framework for scholars, developers, and enthusiasts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section (Red Gradient Glass) */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gray-50">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-600 to-red-900 rounded-3xl shadow-2xl p-12 md:p-20 relative overflow-hidden">
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/5 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
              
              <h2 className="text-4xl md:text-5xl font-black mb-8 text-white relative z-10">Our Mission</h2>
              <p className="text-xl md:text-2xl text-red-100 leading-relaxed max-w-4xl mx-auto font-medium relative z-10">
                We are dedicated to assembling a rigorous, structured archive of mobile games, devices, platforms, and associated media; to provide researchers and practitioners with a trusted resource for studying the technological, aesthetic, and cultural dimensions of mobile gaming; and to foster public understanding of how portable play has shaped and continues to shape the interactions between hardware, software, users, and society.
              </p>
            </div>
          </div>
        </section>

        {/* Research Focus Areas */}
        <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Our Research Focus Areas</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">We concentrate our efforts around several interrelated domains:</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchFocusAreas.map((area, index) => (
                <div key={index} className="bg-white border border-gray-100 shadow-lg hover:shadow-xl hover:border-red-100 transition-all duration-300 rounded-2xl p-8 flex flex-col group">
                  <div className="mb-5 p-3 bg-red-50 rounded-xl w-fit group-hover:bg-red-100 transition-colors">{area.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-600 leading-relaxed flex-grow">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       {/* Leadership Team Section (Updated Styling) */}
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Our Leadership Team</h2>
        </div>
        
        <div className="flex flex-col gap-8">
          {leadershipTeam.map((member, index) => (
            <div key={index} className="bg-white rounded-3xl shadow-xl overflow-hidden flex flex-col md:flex-row border border-red-200 hover:border-red-500 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1">
              {/* Image */}
              <div className="relative w-full md:w-1/3 min-h-[300px] md:min-h-0">
                <Image 
                  src={member.image || "/placeholder-user.jpg"} 
                  alt={member.name} 
                  fill 
                  className="object-cover object-top" 
                />
              </div>
              {/* Content */}
              <div className="p-8 md:p-12 flex flex-col flex-grow w-full md:w-2/3 justify-center">
                <h3 className="text-3xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="font-semibold text-red-600 mb-6 text-lg">{member.role}</p>
                <p className="text-gray-600 leading-relaxed text-lg mb-8">{member.bio}</p>
                <Button asChild className="self-start bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold rounded-full px-8 py-6 text-base shadow-lg transition-all hover:scale-105">
                  <a href={member.link} target="_blank" rel="noopener noreferrer">
                    Learn more <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Research Assistants Section */}
    <section className="py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-white pb-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-gray-900 mb-4">Research Assistants</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {researchAssistants.map((member, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full group">
              <div className="relative w-full aspect-square overflow-hidden bg-gray-100">
                <Image 
                  src={member.image || "/placeholder-user.jpg"} 
                  alt={member.name} 
                  fill 
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105" 
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                <p className="font-semibold text-red-600 text-sm mb-4">{member.role}</p>
                <p className="text-gray-600 text-sm leading-relaxed flex-grow line-clamp-4">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
    
  </main>
  <Footer />
</div>
  )
}