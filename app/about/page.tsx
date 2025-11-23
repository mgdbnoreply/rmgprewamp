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

  // const researchAssistants = [
  //   {
  //     name: "Arslan Parkar",
  //     role: "MS in Information Systems",
  //     bio: "Arslan is pursuing an MS in information systems at Northeastern. He has experience in leading an AI-driven startup and has done impactful research projects focusing on innovative, user-centric solutions.",
  //     image: "/team/arslan.jpg",
  //   },
  //   {
  //     name: "Kannan Karthikeyan",
  //     role: "Software Engineering Graduate Student",
  //     bio: "Kannan is a software engineering graduate student at Northeastern who blends his lifelong passion for gaming with technical expertise to advance the RMGP initiative.",
  //     image: "/team/kannan.jpg",
  //   },
  //   {
  //     name: "Yan (Fiona) Wu",
  //     role: "Dean's Honors Fellow",
  //     bio: "Fiona is a Dean's Honors Fellow pursuing a BS in Computer Science and Media Arts, contributing her technical and creative skills to the RMGP project.",
  //     image: "/team/fiona.jpg",
  //   },
  // ]

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
    // Page background is white, text is dark
    <div className="bg-white text-gray-900">
      <Header />
      {/* Main content floats on the white bg */}
      <main className="relative z-10">
        
        {/* Hero Section (Cleaned up) - Added pt-48 */}
        <section className="py-16 md:py-28 px-4 md:px-8 pt-48 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-8 md:p-12 border border-red-200 shadow-lg">
              
              {/* Logo text updated with gradient and font size */}
              <div className="relative inline-flex items-center justify-center gap-2 group mb-8 p-6 bg-white/50 backdrop-blur-lg rounded-full border border-gray-200/50 shadow-2xl">
                <span className="text-5xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  ABOUT US
                </span>
                <div className="relative w-8 h-8 flex-shrink-0">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left-0 top-1/2 -translate-y-1/2 z-0"></div>
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                </div>
                <span className="text-5xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                  WHO WE ARE
                </span>
              </div>

              {/* Kept the main H1, made it bigger, and it already has the gradient */}
              {/* <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                Who We Are
              </h1> */}
              <p className="text-lg md:text-xl text-gray-700 max-w-3xl mx-auto">
                RMGP is an interdisciplinary initiative bringing together game historians, media scholars, archivists, developers, and mobile-gaming enthusiasts to document, preserve, and interpret the evolution of mobile games and devices.
              </p>
            </div>
          </div>
        </section>

        
        {/* What is RMGP Section (Red/Black Gradient Glass) - Made Wider */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-8 items-stretch">
            {/* Image Card */}
            <div className="relative h-96 md:h-auto min-h-[450px] rounded-3xl overflow-hidden shadow-2xl border border-gray-200/50">
              <Image src="/retro-gaming-collection.jpg" alt="Collection of retro games" fill className="object-cover" />
            </div>
            {/* Text Card (Red/Black Gradient Glass) */}
            <div className="flex flex-col justify-center bg-gradient-to-br from-red-600/90 to-black/90 backdrop-blur-lg rounded-3xl border border-red-700/30 shadow-2xl p-10 md:p-14">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">What is RMGP?</h2>
              <p className="text-gray-200 leading-relaxed mb-4">
                The Retro Mobile Gaming Project (RMGP) is a comprehensive archival and research initiative dedicated to documenting the history and evolution of mobile gaming. The project brings together a curated collection of early mobile games, handheld devices, platforms, and related materials from the formative years of portable entertainment.
              </p>
              <p className="text-gray-200 leading-relaxed">
                RMGP functions as both a repository and reference framework for scholars, developers, and enthusiasts.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section (Red/Black Gradient Glass) - Made Wider */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-600/90 to-black/90 backdrop-blur-lg rounded-3xl border border-red-500/30 shadow-2xl p-12 md:p-16">
              <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Mission</h2>
              <p className="text-lg md:text-xl text-red-50 leading-relaxed max-w-5xl mx-auto">
                We are dedicated to assembling a rigorous, structured archive of mobile games, devices, platforms, and associated media; to provide researchers and practitioners with a trusted resource for studying the technological, aesthetic, and cultural dimensions of mobile gaming; and to foster public understanding of how portable play has shaped and continues to shape the interactions between hardware, software, users, and society.
              </p>
            </div>
          </div>
        </section>

        {/* Research Focus Areas (Light Glass Cards) - Made Wider */}
        <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Research Focus Areas</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">We concentrate our efforts around several interrelated domains:</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {researchFocusAreas.map((area, index) => (
                <div key={index} className="bg-white/50 backdrop-blur-lg border border-gray-200/50 shadow-xl hover:shadow-2xl transition-all rounded-2xl p-8 flex flex-col">
                  <div className="mb-5">{area.icon}</div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{area.title}</h3>
                  <p className="text-gray-700 leading-relaxed flex-grow">{area.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

       {/* Leadership Team Section (Gradient Glass Cards on White BG) - Made Wider */}
    <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-gray-50">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Leadership Team</h2>
        </div>
        {/* MODIFIED: Changed from grid to flex-col */}
        <div className="flex flex-col gap-8">
          {leadershipTeam.map((member, index) => (
            // MODIFIED: Added md:flex-row and adjusted image/content divs
            <div key={index} className="bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg border border-red-700/30 rounded-2xl shadow-lg hover:shadow-red-500/40 transition-shadow flex flex-col md:flex-row overflow-hidden">
              {/* Image */}
              {/* FIXED: Replaced h-64 md:h-auto with aspect-square md:aspect-auto */}
              <div className="relative w-full aspect-square md:aspect-auto md:w-1/3 flex-shrink-0">
                <Image src={member.image || "/placeholder-user.jpg"} alt={member.name} fill className="object-cover" />
              </div>
              {/* Content */}
              <div className="p-6 md:p-8 flex flex-col flex-grow text-white w-full md:w-2/3">
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="font-semibold text-red-100 mb-4">{member.role}</p>
                <p className="text-red-50/90 leading-relaxed flex-grow mb-6">{member.bio}</p>
                <Button asChild className="mt-auto w-full sm:w-auto self-start bg-white hover:bg-gray-200 text-red-600 font-bold">
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

    {/* Research Assistants Section (Gradient Glass Cards on White BG) - Made Wider */}
    <section className="py-8 md:py-12 px-4 md:px-8 lg:px-16 bg-white">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Research Assistants</h2>
        </div>
        {/* FIXED: Changed to md:grid-cols-3 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {researchAssistants.map((member, index) => (
            <div key={index} className="bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg border border-red-700/30 rounded-2xl shadow-lg hover:shadow-red-500/40 transition-shadow flex flex-col overflow-hidden">
              {/* FIXED: Changed h-64 to aspect-square */}
              <div className="relative w-full aspect-square">
                <Image src={member.image || "/placeholder-user.jpg"} alt={member.name} fill className="object-cover" />
              </div>
              <div className="p-6 flex flex-col flex-grow text-white">
                <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                <p className="font-semibold text-red-100 mb-4">{member.role}</p>
                <p className="text-red-50/90 leading-relaxed flex-grow">{member.bio}</p>
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