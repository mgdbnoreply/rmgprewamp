import Link from "next/link"
import { Github, Twitter, Mail, Gamepad2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="relative border-t border-gray-800 bg-black text-white z-50">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand & Mission */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="relative w-6 h-6 flex-shrink-0">
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left-0 top-1/2 -translate-y-1/2 z-0"></div>
                <div className="w-5 h-5 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2 top-1/2 -translate-y-1/2 z-10"></div>
              </div>
              <span className="text-lg font-black tracking-tight text-white group-hover:text-gray-300 transition-colors">
                RMGP
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
              Preserving the history of mobile gaming from 1975 to 2008. A comprehensive digital archive for researchers and enthusiasts.
            </p>
          </div>

          {/* Archive & Research */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Archive & Research</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/archive" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  Archive Overview
                </Link>
              </li>
              <li>
                <Link href="/database" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  Game Database
                </Link>
              </li>
              <li>
                <Link href="/collection" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  Device Collection
                </Link>
              </li>
              <li>
                <Link href="/publications" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  Publications
                </Link>
              </li>
              <li>
                <Link href="/education" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  Education Resources
                </Link>
              </li>
            </ul>
          </div>

          {/* Project & Community */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Project</h3>
            <ul className="space-y-2.5">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/news" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  News & Updates
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-red-400 text-sm transition-colors">
                  Contact
                </Link>
              </li>
              <li>
                <a 
                  href="https://rmgd-official-backend.vercel.app/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-red-400 text-sm transition-colors flex items-center gap-1"
                >
                  Contribute Data
                </a>
              </li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-bold text-sm uppercase tracking-wider mb-4">Connect</h3>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all" aria-label="GitHub">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all" aria-label="Twitter">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="mailto:TransformativeMedia@northeastern.edu" className="w-10 h-10 rounded-full bg-gray-900 flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-all" aria-label="Email">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-xs">
            © {new Date().getFullYear()} Retro Mobile Gaming Project. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer