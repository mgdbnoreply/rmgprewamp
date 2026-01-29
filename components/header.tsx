"use client"

import Link from "next/link"
import { Menu, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerClose,
} from "@/components/ui/drawer"
import { useState, useEffect } from "react"
import Image from "next/image"
import { usePathname } from "next/navigation"

// A reusable component for the links inside the hover dropdowns
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
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMenuOpen])

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  // Custom class for all nav triggers and links to look the same
  const navLinkStyle = "text-gray-300 hover:text-white font-semibold transition-colors px-3 py-2 rounded-lg hover:bg-white/5 flex items-center gap-1"
  
  // Helper function to check if a link is active
  const isActive = (href: string) => {
    if (href === "/" && pathname === "/") return true
    if (href !== "/" && pathname.startsWith(href)) return true
    return false
  }

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${
        isScrolled
          ? "bg-black/80 backdrop-blur-xl border-b border-white/10 shadow-lg py-2"
          : "bg-transparent border-b border-transparent py-4"
      }`}
    >
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex items-center justify-between h-16">
          
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
              <Link href="/" className={`${navLinkStyle} ${isActive("/") ? "text-red-600" : ""}`}>
                Home
              </Link>

              {/* Publications Dropdown */}
              <div className="relative group">
                <div className={`${navLinkStyle} cursor-default ${isActive("/publications") ? "text-red-600" : ""}`}>
                  <Link href="/publications">Publications</Link>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-56 p-1">
                    <NavLink href="/publications?category=Articles">Articles</NavLink>
                    <NavLink href="/publications?category=Book Chapter">Book Chapters</NavLink>
                    <NavLink href="/publications?category=Conference Paper">Conference Papers</NavLink>
                  </ul>
                </div>
              </div>

              {/* Archive Dropdown */}
              <div className="relative group">
                <div className={`${navLinkStyle} cursor-default ${isActive("/archive") || isActive("/database") || isActive("/collection") ? "text-red-600" : ""}`}>
                  <Link href="/archive">Archive</Link>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-56 p-1">
                    <NavLink href="/database">Database</NavLink>
                    <NavLink href="/collection">Collection</NavLink>
                  </ul>
                </div>
              </div>

              {/* Education Dropdown */}
              <div className="relative group">
                <div className={`${navLinkStyle} cursor-default ${isActive("/education") ? "text-red-600" : ""}`}>
                  <Link href="/education">Education</Link>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-64 p-1">
                    <NavLink href="/education#definition">What is a Mobile Game?</NavLink>
                    <NavLink href="/education#educational-resources">Resources & Assignments</NavLink>
                    <NavLink href="/education/resources">Archives</NavLink>
                  </ul>
                </div>
              </div>

              {/* News Dropdown */}
              <div className="relative group">
                <Link href="/news" className={`${navLinkStyle} ${isActive("/news") ? "text-red-600" : ""}`}>
                  News
                </Link>
              </div>

              {/* About Dropdown */}
              <div className="relative group">
                <div className={`${navLinkStyle} cursor-default ${isActive("/about") || isActive("/faq") ? "text-red-600" : ""}`}>
                  <Link href="/about">About</Link>
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </div>
                <div className="absolute top-full left-0 z-[200] hidden group-hover:block pt-2">
                  <ul className="bg-white border border-gray-200 shadow-2xl rounded-2xl min-w-56 p-1">
                    <NavLink href="/about">About Us</NavLink>
                    <NavLink href="/faq">FAQs</NavLink>
                  </ul>
                </div>
              </div>

              {/* Contact Link */}
              <Link href="/contact" className={`${navLinkStyle} ${isActive("/contact") ? "text-red-600" : ""}`}>
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

          {/* Mobile Drawer Trigger */}
          <div className="md:hidden">
            <Drawer open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <DrawerTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-gray-800"
                  aria-label="Open menu"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </DrawerTrigger>

              <DrawerContent className="bg-black/95 text-white" data-vaul-drawer-direction="right">
                <div className="flex items-center justify-between p-4 border-b border-white/5">
                  <Link href="/" className="flex items-center gap-2">
                    <span className="font-black tracking-tight">RETRO MOBILE</span>
                  </Link>
                  <DrawerClose asChild>
                    <Button variant="ghost" aria-label="Close menu" className="text-white">
                      <X className="h-5 w-5" />
                    </Button>
                  </DrawerClose>
                </div>

                <div className="p-4 flex flex-col gap-3">
                  <Link href="/" className="text-gray-300 hover:text-white font-semibold transition-colors py-3 px-2 rounded-lg">Home</Link>

                  <div className="text-gray-500 font-bold text-xs uppercase tracking-wider mt-2">Publications</div>
                  <Link href="/publications?category=Articles" className="text-gray-300 hover:text-white transition-colors py-3 px-2">Articles</Link>
                  <Link href="/publications?category=Book Chapter" className="text-gray-300 hover:text-white transition-colors py-3 px-2">Book Chapters</Link>

                  <div className="text-gray-500 font-bold text-xs uppercase tracking-wider mt-2">Archive</div>
                  <Link href="/database" className="text-gray-300 hover:text-white transition-colors py-3 px-2">Database</Link>
                  <Link href="/collection" className="text-gray-300 hover:text-white transition-colors py-3 px-2">Collection</Link>

                  <div className="text-gray-500 font-bold text-xs uppercase tracking-wider mt-2">Education</div>
                  <Link href="/education#definition" className="text-gray-300 hover:text-white transition-colors py-3 px-2">What is a Mobile Game?</Link>
                  <Link href="/education#educational-resources" className="text-gray-300 hover:text-white transition-colors py-3 px-2">Resources & Assignments</Link>
                  <Link href="/education/resources" className="text-gray-300 hover:text-white transition-colors py-3 px-2">Archives</Link>

                  <Link href="/news" className="text-gray-300 hover:text-white font-semibold transition-colors py-3 px-2 mt-2">News</Link>
                  <Link href="/about" className="text-gray-300 hover:text-white font-semibold transition-colors py-3 px-2">About</Link>
                  <Link href="/contact" className="text-gray-300 hover:text-white font-semibold transition-colors py-3 px-2">Contact</Link>

                  <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold w-full mt-4">
                    <a href="https://rmgd-official-backend.vercel.app/" target="_blank" rel="noopener noreferrer">
                      Contribute
                    </a>
                  </Button>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="md:hidden py-4 border-t border-gray-800/50 bg-black/95 backdrop-blur-xl absolute top-full left-0 right-0 shadow-xl">
            <div className="flex flex-col gap-4 px-4">
              <Link href="/" className="text-gray-300 hover:text-white font-semibold transition-colors py-2">
                Home
              </Link>
              
              <div className="text-gray-500 font-bold text-xs uppercase tracking-wider mt-2">Publications</div>
              <Link href="/publications?category=Articles" className="text-gray-300 hover:text-white transition-colors py-1 pl-4">Articles</Link>
              <Link href="/publications?category=Book Chapter" className="text-gray-300 hover:text-white transition-colors py-1 pl-4">Book Chapters</Link>

              <div className="text-gray-500 font-bold text-xs uppercase tracking-wider mt-2">Archive</div>
              <Link href="/database" className="text-gray-300 hover:text-white transition-colors py-1 pl-4">Database</Link>
              <Link href="/collection" className="text-gray-300 hover:text-white transition-colors py-1 pl-4">Collection</Link>
              
              <div className="text-gray-500 font-bold text-xs uppercase tracking-wider mt-2">Education</div>
              <Link href="/education#definition" className="text-gray-300 hover:text-white transition-colors py-1 pl-4">What is a Mobile Game?</Link>
              <Link href="/education#educational-resources" className="text-gray-300 hover:text-white transition-colors py-1 pl-4">Resources & Assignments</Link>
              <Link href="/education/resources" className="text-gray-300 hover:text-white transition-colors py-1 pl-4">Archives</Link>
              
              <Link href="/news" className="text-gray-300 hover:text-white font-semibold transition-colors py-2 mt-2">News</Link>
              <Link href="/about" className="text-gray-300 hover:text-white font-semibold transition-colors py-2">About</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white font-semibold transition-colors py-2">Contact</Link>

              <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold w-full mt-4">
                <a href="https://rmgd-official-backend.vercel.app/" target="_blank" rel="noopener noreferrer">
                  Contribute
                </a>
              </Button>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header