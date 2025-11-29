import Link from "next/link"
import { Github, Twitter, Mail } from "lucide-react"

export function Footer() {
  return (
    // Changed bg-black/60 backdrop-blur-md to bg-black for a solid black background
    <footer className="relative border-t border-gray-800 bg-black text-white">
      <div className="max-w-[100rem] mx-auto px-4 md:px-8 lg:px-16 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* About */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">About RMGP</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Preserving the history of mobile gaming from 1975 to 2008 through comprehensive digital archiving.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Quick Links</h3>
            <div className="flex flex-col gap-2">
              <Link href="/games" className="text-gray-400 hover:text-white text-sm transition-colors">
                Browse Games
              </Link>
              <Link href="/research" className="text-gray-400 hover:text-white text-sm transition-colors">
                Research
              </Link>
              <Link href="/about" className="text-gray-400 hover:text-white text-sm transition-colors">
                About Us
              </Link>
              <Link href="/contribute" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contribute
              </Link>
            </div>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Resources</h3>
            <div className="flex flex-col gap-2">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Documentation
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                API Access
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Guidelines
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Contact
              </Link>
            </div>
          </div>

          {/* Connect */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Connect</h3>
            <div className="flex gap-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="GitHub">
                <Github className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors" aria-label="Email">
                <Mail className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Retro Mobile Gaming Project. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer