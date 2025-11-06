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
              <div className="p-6 space-y-4">
                <p className="text-gray-300 text-sm leading-relaxed">
                  Your donation helps us preserve and document mobile gaming history from 1975-2008. Every contribution
                  supports research, digitization, and education.
                </p>

                {/* Donation Amounts */}
                <div className="grid grid-cols-3 gap-3">
                  {["$10", "$25", "$50"].map((amount) => (
                    <button
                      key={amount}
                      className="bg-gray-800/50 hover:bg-red-600/20 border-2 border-gray-700 hover:border-red-600 text-white font-bold py-3 rounded-xl transition-all"
                    >
                      {amount}
                    </button>
                  ))}
                </div>

                {/* Custom Amount */}
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">$</span>
                  <input
                    type="number"
                    placeholder="Custom amount"
                    className="w-full bg-gray-800/50 border-2 border-gray-700 focus:border-red-600 text-white rounded-xl pl-8 pr-4 py-3 outline-none transition-all"
                  />
                </div>

                {/* Donate Button */}
                <Button className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-bold py-6 rounded-xl text-lg shadow-lg transition-all">
                  Donate Now
                </Button>

                <p className="text-gray-500 text-xs text-center">Secure payment processing • Tax-deductible</p>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}
