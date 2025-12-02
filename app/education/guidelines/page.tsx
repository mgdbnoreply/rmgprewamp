"use client"

import Header from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { Search, ArrowLeft, BookOpen, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function GuidelinesPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 font-sans">
      <Header />

      <main className="relative z-10 pt-20">
        
        {/* Header Section */}
        <section className="bg-black text-white py-16 md:py-24 relative overflow-hidden">
           <div className="absolute inset-0 z-0">
            <Image
              src="/preservation-archiving.jpg"
              alt="Research Background"
              fill
              className="object-cover opacity-20"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <Link href="/education" className="inline-flex items-center text-gray-400 hover:text-white mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Education
            </Link>
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Archival Research Guidelines</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Learn effective strategies for researching the history of mobile games using digital archives and advanced search techniques.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12 -mt-10 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-5xl mx-auto">
            
            <div className="grid lg:grid-cols-3 gap-12">
              
              {/* Main Guidelines */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-red-100 rounded-lg">
                      <Search className="w-6 h-6 text-red-600" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900">Search Techniques</h2>
                  </div>
                  
                  <div className="grid gap-6">
                    {/* Technique 1 */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-red-200 transition-colors">
                      <h3 className="text-red-700 font-bold text-lg mb-2">Narrow Your Search</h3>
                      <p className="text-gray-600 mb-3">Use quotation marks to search for an exact word or phrase. This ensures you find pages containing that specific phrase.</p>
                      <div className="bg-red-600 px-4 py-2 rounded border border-gray-200 inline-block">
                        <code className="text-sm text-white  font-bold">"Gameboy Color"</code>
                      </div>
                    </div>

                    {/* Technique 2 */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-red-200 transition-colors">
                      <h3 className="text-red-700 font-bold text-lg mb-2">Exclude Irrelevant Results</h3>
                      <p className="text-gray-600 mb-3">Use the minus (hyphen) sign to exclude words from your search results. Useful for filtering out unwanted versions or topics.</p>
                      <div className="bg-red-600 px-4 py-2 rounded border border-gray-200 inline-block">
                        <code className="text-sm text-white font-mono font-bold">Gameboy -color -advance</code>
                      </div>
                    </div>

                    {/* Technique 3 */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-red-200 transition-colors">
                      <h3 className="text-red-700 font-bold text-lg mb-2">File Type Search</h3>
                      <p className="text-gray-600 mb-3">To find specific document types, add "filetype:" followed by the type. Great for finding manuals or papers.</p>
                      <div className="bg-red-600 px-4 py-2 rounded border border-gray-200 inline-block">
                        <code className="text-sm text-white font-mono font-bold">Slots of Fun filetype:pdf</code>
                      </div>
                    </div>

                    {/* Technique 4 */}
                    <div className="bg-gray-50 p-6 rounded-xl border border-gray-100 hover:border-red-200 transition-colors">
                      <h3 className="text-red-700 font-bold text-lg mb-2">Specific Site & Domain Search</h3>
                      <p className="text-gray-600 mb-3">Search within a specific website or domain type (like .edu for academic resources) using "site:".</p>
                      <div className="flex gap-2 flex-wrap">
                        <div className="bg-red-600 px-4 py-2 rounded border border-gray-200 inline-block">
                          <code className="text-sm text-white font-mono font-bold">site:mgrl.ncsu.chass.edu</code>
                        </div>
                        <div className="bg-red-600 px-4 py-2 rounded border border-gray-200 inline-block">
                          <code className="text-sm text-white font-mono font-bold">Gameboy site:.edu</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Resources Link */}
                <div className="pt-6 border-t border-gray-200">
                   <h3 className="font-bold text-gray-900 mb-4">More Advanced Techniques</h3>
                   <Link 
                      href="https://digitalcommons.law.uga.edu/cgi/viewcontent.cgi?article=1066&context=cle" 
                      target="_blank"
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-800 font-medium transition-colors"
                  >
                      Download Advanced Internet Research Techniques Guide (PDF) <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Sidebar: Readings & Tools */}
              <div className="space-y-8">
                {/* Wayback Machine */}
                <div className="bg-gray-900 text-white rounded-2xl p-6 shadow-lg">
                  <h3 className="font-bold text-xl mb-4">Wayback Machine</h3>
                  <p className="text-gray-300 text-sm mb-4">
                    Use the Internet Archive's Wayback Machine to view archived copies (caches) of defunct gaming websites.
                  </p>
                  <Button asChild variant="secondary" className="w-full">
                    <a href="http://web.archive.org/" target="_blank">Visit Archive.org <ExternalLink className="ml-2 w-4 h-4" /></a>
                  </Button>
                </div>

                {/* Recommended Readings */}
                <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
                  <h3 className="font-bold text-xl text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5 text-red-600" /> Recommended Readings
                  </h3>
                  <ul className="space-y-4">
                    <li className="pb-3 border-b border-red-200 last:border-0 last:pb-0">
                      <p className="text-gray-900 font-medium text-sm leading-tight mb-1">Playful urban spaces: A historical approach to mobile games</p>
                      <p className="text-xs text-gray-600">de Souza e Silva, A., & Hjorth, L. (2009)</p>
                    </li>
                    <li className="pb-3 border-b border-red-200 last:border-0 last:pb-0">
                      <p className="text-gray-900 font-medium text-sm leading-tight mb-1">Victorian snakes? Towards a cultural history of mobile games</p>
                      <p className="text-xs text-gray-600">Parikka, J., & Suominen, J. (2006)</p>
                    </li>
                    <li className="pb-3 border-b border-red-200 last:border-0 last:pb-0">
                      <p className="text-gray-900 font-medium text-sm leading-tight mb-1">Software presentation: The retro mobile gaming database</p>
                      <p className="text-xs text-gray-600">Silva, A. D. S. E., & Glover-Rijkse, R. (2023)</p>
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}