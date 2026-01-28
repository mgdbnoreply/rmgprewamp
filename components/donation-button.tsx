"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { X, Heart } from "lucide-react"

export function DonationButton() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Donation Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-full p-4 shadow-2xl hover:shadow-red-500/50 transition-all transform hover:scale-110 group"
        aria-label="Donate"
      >
        <Heart className="w-6 h-6 group-hover:animate-pulse" fill="currentColor" />
      </button>

      {/* Donation Popup */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-in fade-in duration-200"
            onClick={() => setIsOpen(false)}
          />

          {/* Popup Modal */}
          <div className="fixed bottom-24 right-8 z-50 w-[90vw] max-w-md animate-in slide-in-from-bottom-4 duration-300">
            <div className="bg-gradient-to-br from-gray-900 to-black border-2 border-red-600/50 rounded-3xl shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-red-600 to-red-700 p-6 relative">
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
                  aria-label="Close"
                >
                  <X className="w-5 h-5" />
                </button>
                <div className="flex items-center gap-3">
                  <Heart className="w-8 h-8 text-white" fill="currentColor" />
                  <div>
                    <h3 className="text-xl font-bold text-white">Support Our Mission</h3>
                    <p className="text-red-100 text-sm">Help preserve gaming history</p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Help Preserve the History of Mobile Gaming!</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    The Retro Mobile Gaming Collection, soon to be hosted at Northeastern University, is now accepting donations. Your contributions will support our mission to document, preserve, and showcase the technological innovation, artistic design, and cultural significance of mobile gaming.
                  </p>
                </div>

                {/* What We're Seeking */}
                <div className="space-y-2">
                  <p className="text-white font-semibold text-sm">We're Seeking Donations Of:</p>
                  <div className="space-y-2">
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-lg">📱</span>
                      <div>
                        <p className="font-semibold text-gray-200">Vintage Handheld Devices</p>
                        <p className="text-gray-400 text-xs">Game Boy, Game Gear, PSP, and more</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-lg">📞</span>
                      <div>
                        <p className="font-semibold text-gray-200">Early Mobile Phones</p>
                        <p className="text-gray-400 text-xs">Phones with gaming capabilities</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-lg">💾</span>
                      <div>
                        <p className="font-semibold text-gray-200">Cartridges & Accessories</p>
                        <p className="text-gray-400 text-xs">Memory cards and gaming accessories</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3 text-sm">
                      <span className="text-lg">📦</span>
                      <div>
                        <p className="font-semibold text-gray-200">Original Materials</p>
                        <p className="text-gray-400 text-xs">Packaging, manuals, and promotional items</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Contact Button */}
                <a
                  href="mailto:TransformativeMedia@northeastern.edu"
                  className="block w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-3 px-4 rounded-xl text-center transition-all shadow-lg"
                >
                  Get in Touch
                </a>

                <p className="text-gray-400 text-xs text-center leading-relaxed">
                  <span className="font-semibold">Note:</span> These donations are NOT tax-deductible as items are being donated to a research project across several institutions.
                </p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
