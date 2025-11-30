"use client"

import Link from "next/link"
import { Menu, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import Image from "next/image"

// A reusable component for the links inside the hover dropdowns
// to keep the styling consistent with your original design.
const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
  <li>
    <Link
      href={href}
      className="block text-gray-900 hover:text-white hover:bg-gradient-to-r hover:from-red-600 hover:to-black cursor-pointer transition-all rounded-xl my-1 mx-1 px-3 py-2"
    >
      {children}
    </Link>
  </li>
)

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Custom class for all nav triggers and links to look the same
  const navLinkStyle = "text-gray-300 hover:text-white font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-1"

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
        isScrolled
          ? "bg-black/30 backdrop-blur-2xl border-b border-gray-700/10 shadow-lg"
          : "bg-gradient-to-b from-black/98 via-black/95 to-black/80 border-b border-gray-700/20 backdrop-blur-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
      }`}
    >
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-20">
          
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-lg font-black tracking-tight text-white group-hover:text-gray-300 transition-colors">
              RETRO MOBILE
            </span>
            <div className="relative w-6 h-6 flex-shrink-0">
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left-0 top-1/2 -translate-y-1/2 z-0"></div>
              <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2 top-1/2 -translate-y-1/2 z-10"></div>
            </div>
            <span className="text-lg font-black tracking-tight text-white group-hover:text-gray-300 transition-colors">
              GAMING PROJECT
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-4">
            <nav className="flex items-center gap-1 lg:gap-2">
              <Link href="/" className={navLinkStyle}>
                Home
              </Link>

              {/* Publications Dropdown */}
              <div className="relative group">
                <div className={navLinkStyle + " cursor-default"}>
                  <a href="/publications">Publications</a>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-56 p-1">
                    <NavLink href="/publications?type=book">Book</NavLink>
                    <NavLink href="/publications?type=book-chapters">Book Chapters</NavLink>
                    <NavLink href="/publications?type=conference">Conference Proceedings</NavLink>
                    <NavLink href="/publications?type=interviews">Interviews</NavLink>
                    <NavLink href="/publications?type=journal">Journal Article</NavLink>
                  </ul>
                </div>
              </div>

              {/* Archive Dropdown */}
              <div className="relative group">
                <div className={navLinkStyle + " cursor-default"}>
                  <a href="/archive">Archive</a>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-56 p-1">
                    <NavLink href="/database">Database</NavLink>
                    <NavLink href="/collection">Collection</NavLink>
                    {/* <NavLink href="/database?filter=games">Games</NavLink>
                    <NavLink href="/database?filter=devices">Devices</NavLink>
                    <NavLink href="/database?filter=platform">Platform</NavLink>
                    <NavLink href="/database?filter=runtime">Runtime</NavLink>
                    <NavLink href="/database?filter=emulators">Emulators</NavLink> */}
                  </ul>
                </div>
              </div>

              {/* Education Dropdown */}
              <div className="relative group">
                <div className={navLinkStyle + " cursor-default"}>
                  <a href="/education">Education</a>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-56 p-1">
                    <NavLink href="/education#what-is-mobile-ai">What is Mobile Games</NavLink>
                    <NavLink href="/education#videos">Videos</NavLink>
                    <NavLink href="/education#class-activities">Class Activities</NavLink>
                  </ul>
                </div>
              </div>

              {/* News Dropdown */}
              <div className="relative group">
                <div className={navLinkStyle + " cursor-default"}>
                  <a href="/news">News</a>
                  {/* <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" /> */}
                </div>
                {/* <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-56 p-1">
                    <NavLink href="/news?category=blog">Blog</NavLink>
                    <NavLink href="/news?category=updates">Updates</NavLink>
                    <NavLink href="/news?category=articles">Articles</NavLink>
                    <NavLink href="/news?category=features">Features</NavLink>
                    <NavLink href="/news?category=spotlight">Spotlight</NavLink>
                  </ul>
                </div> */}
              </div>

              {/* About Dropdown */}
              <div className="relative group">
                <div className={navLinkStyle + " cursor-default"}>
                  <a href="/about">About</a>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-56 p-1">
                    <NavLink href="/faq">FAQs</NavLink>
                  </ul>
                </div>
              </div>

              {/* Contact Link */}
              <Link href="/contact" className={navLinkStyle}>
                Contact
              </Link>
            </nav>

            {/* Contribute Button */}
            <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold rounded-full">
              <a href="https://rmgd-official-backend.vercel.app/" target="_blank" rel="noopener noreferrer">
                Contribute
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-white hover:bg-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <Menu className="h-6 w-6" />
          </Button>
        </div>

        {/* Mobile Menu (Updated) */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800/50">
            <div className="flex flex-col gap-4">
              <Link href="/" className="text-gray-300 hover:text-white font-semibold transition-colors py-2">
                Home
              </Link>
              <div className="text-gray-300 font-semibold py-2">Publications</div>
              <Link href="/publications" className="text-gray-300 hover:text-white transition-colors py-2 pl-8">
                All Publications
              </Link>
              <div className="text-gray-300 font-semibold py-2">Archive</div>
              <Link href="/database" className="text-gray-300 hover:text-white transition-colors py-2 pl-8">
                Database
              </Link>
              <Link href="/collection" className="text-gray-300 hover:text-white transition-colors py-2 pl-8">
                Collection
              </Link>
              <div className="text-gray-300 font-semibold py-2">Education</div>
              <Link href="/education" className="text-gray-300 hover:text-white transition-colors py-2 pl-8">
                All Education
              </Link>
              <div className="text-gray-300 font-semibold py-2">News</div>
              <Link href="/news" className="text-gray-300 hover:text-white transition-colors py-2 pl-8">
                All News
              </Link>
              
              <div className="text-gray-300 font-semibold py-2">About</div>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors py-2 pl-8">
                About
              </Link>
              <Link href="/faq" className="text-gray-300 hover:text-white transition-colors py-2 pl-8">
                FAQs
              </Link>

              <Link href="/contact" className="text-gray-300 hover:text-white font-semibold transition-colors py-2">
                Contact
              </Link>

              {/* Mobile Contribute Button */}
              <a 
                href="https://rmgd-official-backend.vercel.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-lg text-center mt-2 transition-colors"
              >
                Contribute
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header