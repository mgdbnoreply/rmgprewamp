"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { 
  FileText, 
  Download, 
  ExternalLink, 
  Eye,
  X,
  Calendar
} from "lucide-react"
import Image from "next/image"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

export default function ResourcesPage() {
  const [viewingPdf, setViewingPdf] = useState<string | null>(null)

  // Mobile Entertainment Archive (Mobenta) data
  const mobileEntertainmentReviews = [
    {
      id: "mea-2002-07",
      title: "Mobile Entertainment Analyst: Vol 1, No 1",
      date: "July 2002",
      description: "The inaugural issue covering 'MVNOs: Marketing Goes Mobile' (Virgin Mobile launch), 'Microsoft Plus Mobile Equals What?', and cultural clashes between telecom and game developers[cite: 19209].",
      pdfUrl: "/documents/mea2002-07.pdf",
    },
    {
      id: "mea-2002-08",
      title: "Mobile Entertainment Analyst: Vol 1, No 2",
      date: "August 2002",
      description: "Features 'Current Content Strategies in Japan' regarding carrier control vs. open internet, and 'Hollywood Sees Money in Mobile' regarding ancillary revenue streams[cite: 12306].",
      pdfUrl: "/documents/mea2002-08.pdf",
    },
    {
      id: "mea-2002-09",
      title: "Mobile Entertainment Analyst: Vol 1, No 3",
      date: "September 2002",
      description: "Includes 'MMS DOA?' analyzing the future of multimedia messaging, and a review of the 'Sprint Vision Launch'[cite: 14471].",
      pdfUrl: "/documents/mea2002-09.pdf",
    },
    {
      id: "mea-2002-10",
      title: "Mobile Entertainment Analyst: Vol 1, No 4",
      date: "October 2002",
      description: "Covers 'Mobile Entertainment Pricing Schemes' across the globe and 'Tokyo Tama Part Two', offering insights into Japanese handset differences[cite: 15752].",
      pdfUrl: "/documents/mea2002-10.pdf",
    },
    {
      id: "mea-2002-11",
      title: "Mobile Entertainment Analyst: Vol 1, No 5",
      date: "November 2002",
      description: "Includes 'The Symbian Situation', 'Java Goes Mobile' exploring programming in constrained environments, and 'NEC's Japanese Leadership'[cite: 16008].",
      pdfUrl: "/documents/mea2002-11.pdf",
    },
    {
      id: "mea-2002-12",
      title: "Mobile Entertainment Analyst: Vol 1, No 6",
      date: "December 2002",
      description: "Final issue of 2002 featuring year-end roundup of mobile entertainment trends, market analysis, and predictions for the emerging industry[cite: 17223].",
      pdfUrl: "/documents/mea2002-12.pdf",
    },
    {
      id: "mea-2003-01",
      title: "Mobile Entertainment Analyst: Vol 2, No 1",
      date: "January 2003",
      description: "Kicks off Volume 2 with 'Mobile Operators as Entertainment Brands', 'Game Development in Korea', and analysis of the growing Asia-Pacific market[cite: 17999].",
      pdfUrl: "/documents/mea2003-01.pdf",
    },
    {
      id: "mea-2003-02",
      title: "Mobile Entertainment Analyst: Vol 2, No 2",
      date: "February 2003",
      description: "Covers 'The Rise of MMS' and its impact on entertainment delivery, 'Bluetooth Gaming' exploring wireless connectivity, and international market comparisons[cite: 18445].",
      pdfUrl: "/documents/mea2003-02.pdf",
    },
    {
      id: "mea-2003-03",
      title: "Mobile Entertainment Analyst: Vol 2, No 3",
      date: "March 2003",
      description: "Features 'Location-Based Gaming', 'Mobile Esports Emergence', and 'Content Licensing Strategies' as the industry matures[cite: 18892].",
      pdfUrl: "/documents/mea2003-03.pdf",
    },
    {
      id: "mea-2003-04",
      title: "Mobile Entertainment Analyst: Vol 2, No 4",
      date: "April 2003",
      description: "Explores '3G Readiness' and its gaming implications, 'Marketing Mobile Games to Females', and the expansion of casual gaming audiences[cite: 19234].",
      pdfUrl: "/documents/mea2003-04.pdf",
    },
    {
      id: "mea-2003-05",
      title: "Mobile Entertainment Analyst: Vol 2, No 5",
      date: "May 2003",
      description: "Includes analysis of 'Camera Phone Gaming', 'Mobile Gaming in Europe', and emerging monetization strategies beyond subscription models[cite: 19567].",
      pdfUrl: "/documents/mea2003-05.pdf",
    },
    {
      id: "mea-2003-06",
      title: "Mobile Entertainment Analyst: Vol 2, No 6",
      date: "June 2003",
      description: "Mid-year review covering 'Mobile Gaming Revenue Models', 'Console Port Strategies', and the competitive landscape between operators and independents[cite: 19845].",
      pdfUrl: "/documents/mea2003-06.pdf",
    },
  ]

  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-32 pb-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Page Header */}
          <div className="mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Educational Resources & Archives
            </h1>
            <p className="text-lg text-gray-300 max-w-3xl">
              Explore our collection of archived research documents and mobile entertainment analysis materials from the early days of mobile gaming.
            </p>
          </div>

          {/* Mobenta Section */}
          <div id="mobenta" className="mb-20">
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-white mb-2">Mobile Entertainment Analyst</h2>
              <p className="text-gray-300">
                A comprehensive archive of industry analysis from 2002-2003, documenting the early evolution of mobile gaming and entertainment technology.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mobileEntertainmentReviews.map((review) => (
                <div 
                  key={review.id}
                  className="bg-white/5 border border-white/10 rounded-xl p-6 hover:bg-white/10 transition-all group"
                >
                  <div className="flex items-start justify-between mb-4">
                    <FileText className="h-8 w-8 text-red-500 flex-shrink-0" />
                  </div>
                  
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-red-400 transition-colors">
                    {review.title}
                  </h3>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-400 mb-4">
                    <Calendar className="h-4 w-4" />
                    <span>{review.date}</span>
                  </div>
                  
                  <p className="text-gray-300 text-sm mb-6 line-clamp-3">
                    {review.description}
                  </p>
                  
                  <div className="flex gap-3">
                    <Button 
                      onClick={() => setViewingPdf(review.pdfUrl)}
                      className="flex-1 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2"
                    >
                      <Eye className="h-4 w-4" />
                      <span className="hidden sm:inline">View</span>
                    </Button>
                    <a
                      href={review.pdfUrl}
                      download
                      className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold rounded-lg transition-all flex items-center justify-center gap-2 border border-white/20"
                    >
                      <Download className="h-4 w-4" />
                      <span className="hidden sm:inline">Download</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* PDF Viewer Modal */}
      {viewingPdf && (
        <Dialog open={!!viewingPdf} onOpenChange={() => setViewingPdf(null)}>
          <DialogContent className="max-w-4xl max-h-screen bg-black border-white/20">
            <DialogHeader className="border-b border-white/20">
              <DialogTitle className="text-white">Document Viewer</DialogTitle>
              <DialogClose className="text-gray-400 hover:text-white" />
            </DialogHeader>
            <div className="w-full h-[600px] bg-black rounded-lg overflow-hidden">
              <embed 
                src={viewingPdf} 
                type="application/pdf" 
                width="100%" 
                height="100%" 
              />
            </div>
          </DialogContent>
        </Dialog>
      )}

      <Footer />
    </>
  )
}
