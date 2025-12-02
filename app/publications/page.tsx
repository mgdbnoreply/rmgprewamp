"use client"

import { useState, useEffect, Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  Search, 
  ChevronRight, 
  ChevronLeft, 
  User, 
  Calendar, 
  ExternalLink, 
  FileText, 
  Eye, 
  Filter,
  X,
  ArrowRight
} from "lucide-react"
import Image from "next/image"
import { publicationsData } from "@/lib/publications-data"
import { DonationButton } from "@/components/donation-button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog"

// Component to handle search params wrapper in Suspense
function PublicationsContent() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("category")

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "")
  const [selectedAuthor, setSelectedAuthor] = useState("")
  const [currentPage, setCurrentPage] = useState(0)
  const [viewingPdf, setViewingPdf] = useState<string | null>(null)

  // Sync with URL param if it changes
  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam)
    }
  }, [categoryParam])

  const itemsPerPage = 6
  
  // Get unique category for filter
  const category = Array.from(new Set(publicationsData.map(p => p.category))).sort()

  const filteredPublications = publicationsData.filter((pub) => {
    const matchesSearch =
      pub.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pub.description.toLowerCase().includes(searchQuery.toLowerCase())
    
    // Filter by Category
    const matchesCategory = !selectedCategory || pub.category === selectedCategory
    
    const matchesAuthor =
      !selectedAuthor || pub.authors.some((author) => author.toLowerCase().includes(selectedAuthor.toLowerCase()))
    
    return matchesSearch && matchesCategory && matchesAuthor
  })

  const totalPages = Math.ceil(filteredPublications.length / itemsPerPage)
  const paginatedPublications = filteredPublications.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage)

  // Featured logic: Show first if no active filters
  const featuredPublication = publicationsData[0]
  const showFeatured = !searchQuery && !selectedCategory && !selectedAuthor && currentPage === 0

  // --- Local Data for the Mobile Entertainment Archive (Bottom Section) ---
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
    description: "Features 'Television on Mobile Phones: The State of the Art', a review of the Tokyo Game Show, and an update on Mobile Entertainment in India[cite: 17998].",
    pdfUrl: "/documents/mea2002-11.pdf",
  },
  {
    id: "mea-2002-12",
    title: "Mobile Entertainment Analyst: Vol 1, No 6",
    date: "December 2002",
    description: "Discusses the delicate act of 'Wireless Pornography' for carriers, 'Mobile Games in Korea', and the Mobile Games Interoperability Forum (MGIF)[cite: 21355].",
    pdfUrl: "/documents/mea2002-12.pdf",
  },
  {
    id: "mea-2003-01",
    title: "Mobile Entertainment Analyst: Vol 2, No 1",
    date: "January 2003",
    description: "Explores 'Mobile Dating Services', the state of 'Mobile Entertainment in Singapore', and a look back at 2002[cite: 16911].",
    pdfUrl: "/documents/mea2003-01.pdf",
  },
  {
    id: "mea-2003-02",
    title: "Mobile Entertainment Analyst: Vol 2, No 2",
    date: "February 2003",
    description: "Analyzes 'Thoughts on the Fourth Games Platform' (Nokia's N-Gage), GDC '03 Essentials, and mobile marketing at the Super Bowl[cite: 20706].",
    pdfUrl: "/documents/mea2003-02.pdf",
  },
  {
    id: "mea-2003-03",
    title: "Mobile Entertainment Analyst: Vol 2, No 3",
    date: "March 2003",
    description: "Includes 'Opportunities and Threats in Mobile Entertainment' by the MEF and 'The Wireless Retail Point of Sale: The Final Frontier'[cite: 12996].",
    pdfUrl: "/documents/mea2003-03.pdf",
  },
  {
    id: "mea-2003-04",
    title: "Mobile Entertainment Analyst: Vol 2, No 4",
    date: "April 2003",
    description: "Features 'Connected Games in a Distracted World', 'Where Are the Wireless Palm Games?', and teen perspectives in 'Dude, Where's My Game?'[cite: 15260].",
    pdfUrl: "/documents/mea2003-04.pdf",
  },
  {
    id: "mea-2003-05",
    title: "Mobile Entertainment Analyst: Vol 2, No 5",
    date: "May 2003",
    description: "Includes 'Funding Mobile Content', 'Are Mobile Games Disruptive?' (Clay Christensen analysis), and 'The Coming Wave of Mobile RPGs'[cite: 18704].",
    pdfUrl: "/documents/mea2003-05.pdf",
  },
  {
    id: "mea-2003-06",
    title: "Mobile Entertainment Analyst: Vol 2, No 6",
    date: "June 2003",
    description: "Covers 'China's Mobile Market Potential', 'What's a Mobile Community?', and learning from the Coin-Op arcade model[cite: 17504].",
    pdfUrl: "/documents/mea2003-06.pdf",
  },
  {
    id: "mea-2003-07",
    title: "Mobile Entertainment Analyst: Vol 2, No 7",
    date: "July 2003",
    description: "Features 'N-Gage Impressions' from the street, 'Sun and Java Revise Their Mobile Games Strategies', and 'A Brief History of Mobile Gaming'[cite: 19804].",
    pdfUrl: "/documents/mea2003-07.pdf",
  },
  {
    id: "mea-2003-08",
    title: "Mobile Entertainment Analyst: Vol 2, No 8",
    date: "August 2003",
    description: "Includes 'The History of Debacle' (Learning from gaming mistakes like CD-I and 3DO) and 'Wireless Local Number Portability'[cite: 10958].",
    pdfUrl: "/documents/mea2003-08.pdf",
  },
  {
    id: "mea-2003-09",
    title: "Mobile Entertainment Analyst: Vol 2, No 9",
    date: "September 2003",
    description: "Features 'More Over the Air' regarding device management and 'Get It When?', analyzing Verizon's game demo decree[cite: 14060].",
    pdfUrl: "/documents/mea2003-09.pdf",
  },
  {
    id: "mea-2003-10",
    title: "Mobile Entertainment Analyst: Vol 2, No 10",
    date: "October 2003",
    description: "Includes the 'CTIA Wireless IT and Entertainment Preview' and 'Advertisers Exploring the Mobile Medium: An Advergaming Brief'[cite: 16454].",
    pdfUrl: "/documents/mea2003-10.pdf",
  },
  {
    id: "mea-2003-12",
    title: "Mobile Entertainment Analyst: Vol 2, No 12",
    date: "December 2003",
    description: "Features 'Are Smart Mobs the Next Social Revolution?', 'VZW Analyst Day', and 'The Arc of Mobile Multiplayer Game Development'[cite: 20287].",
    pdfUrl: "/documents/mea2003-12.pdf",
  },
  {
    id: "mea-2004-02",
    title: "Mobile Entertainment Analyst: Vol 3, No 2",
    date: "February 2004",
    description: "Includes 'The Unquiet Mobile' (Music on phones), 'Mobile Fun and Games' by Juniper Research, and an interview with Square Enix Mobile[cite: 13511].",
    pdfUrl: "/documents/mea2004-02.pdf",
  },
  {
    id: "mea-2004-03",
    title: "Mobile Entertainment Analyst: Vol 3, No 3",
    date: "March 2004",
    description: "Features 'Unleashing the GameBoy: Nintendo's Wireless Future', 'Women and Mobile Content', and a profile of the cell phone gamer[cite: 11497].",
    pdfUrl: "/documents/mea2004-03.pdf",
  },
];

  return (
    <>
      {/* --- Hero Section --- */}
      <section className="relative w-full mt-20 py-24 md:py-32 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/publications.jpg"
              alt="Publications Background"
              fill
              className="object-cover opacity-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                Academic Research
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                Publications & <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Scholarship
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover groundbreaking research, books, and articles analyzing the cultural and technological evolution of mobile gaming.
              </p>
            </div>
          </div>
        </section>

        {/* --- Featured Publication --- */}
        {showFeatured && (
          <section id="latest" className="container mx-auto px-4 -mt-20 relative z-20 pb-16">
            <div className="bg-white rounded-3xl p-8 md:p-12 shadow-2xl border border-gray-100">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="relative h-[300px] md:h-[450px] rounded-2xl overflow-hidden shadow-lg border border-gray-100 group">
                  <Image 
                    src={featuredPublication.thumbnail || "/placeholder.svg"}
                    alt={featuredPublication.title}
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-105" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute top-6 left-6">
                    <Badge className="bg-red-600 text-white border-0">Featured Work</Badge>
                  </div>
                </div>
                <div className="flex flex-col justify-center">
                  <div className="inline-flex items-center gap-2 mb-4 text-gray-500 text-sm font-medium">
                    <Calendar className="w-4 h-4 text-red-500" />
                    <span>{featuredPublication.year}</span>
                    <span className="w-1 h-1 bg-gray-300 rounded-full mx-1"></span>
                    <span className="text-red-600 font-bold uppercase">{featuredPublication.category}</span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black mb-4 text-gray-900 leading-tight">
                    {featuredPublication.title}
                  </h2>
                  <div className="flex items-center gap-2 mb-6 text-gray-600">
                    <User className="w-4 h-4" />
                    <span className="italic">{featuredPublication.authors.join(", ")}</span>
                  </div>
                  <p className="text-gray-600 text-lg leading-relaxed mb-8 border-l-4 border-red-100 pl-4">
                    {featuredPublication.description}
                  </p>
                  <Button asChild className="self-start bg-gradient-to-r from-red-600 to-red-800 hover:from-red-700 hover:to-red-900 text-white font-bold rounded-full px-8 py-6 text-base shadow-lg transition-all hover:scale-105">
                    <a href={featuredPublication.link || "#"} target="_blank" rel="noopener noreferrer">
                      Read Publication <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* --- Search & Filter Section --- */}
        <section className={`container mx-auto px-4 ${showFeatured ? 'pt-8' : '-mt-16 relative z-20'} pb-12`}>
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6 items-center">
              <div className="relative flex-1 w-full">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search publications by title, abstract..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value)
                    setCurrentPage(0)
                  }}
                  className="pl-12 h-14 bg-gray-50 border-gray-200 text-gray-900 rounded-xl focus:border-red-500 focus:ring-red-500/20 text-lg"
                />
              </div>
              <div className="flex flex-wrap gap-3 w-full md:w-auto">
                <div className="relative">
                   <Filter className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                   <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value)
                      setCurrentPage(0)
                    }}
                    className="h-14 pl-10 pr-8 bg-white border border-gray-200 text-gray-700 rounded-xl focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-500/20 cursor-pointer hover:bg-gray-50 transition-colors appearance-none min-w-[180px]"
                  >
                    <option value="">All category</option>
                    {category.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>

                <Button 
                  onClick={() => {
                    setSearchQuery("")
                    setSelectedCategory("")
                    setSelectedAuthor("")
                    setCurrentPage(0)
                  }}
                  variant="outline"
                  className="h-14 px-6 border-red-100 text-red-600 hover:bg-red-50 hover:text-red-700 rounded-xl font-semibold"
                >
                  Reset
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* --- Publications Grid (CSV Data Only) --- */}
        <section className="container mx-auto px-4 pb-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {paginatedPublications.map((pub) => (
              <div
                key={pub.id}
                className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-red-100 transition-all duration-300 flex flex-col overflow-hidden h-full transform hover:-translate-y-1"
              >
                <div className="relative h-48 w-full bg-gray-100 overflow-hidden">
                  <Image 
                    src={pub.thumbnail || "/placeholder.svg"} 
                    alt={pub.title} 
                    fill 
                    className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100" 
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white/90 backdrop-blur-md text-gray-900 border border-white/20 shadow-sm hover:bg-white">
                      {pub.category}
                    </Badge>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-3 font-medium uppercase tracking-wide">
                    <span>{pub.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-red-600 transition-colors">
                    {pub.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed mb-6 line-clamp-3 flex-grow">
                    {pub.description}
                  </p>
                  <div className="pt-4 border-t border-gray-50 flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                      <User className="w-3 h-3" />
                      <span className="truncate max-w-[120px]">{pub.authors[0]}</span>
                      {pub.authors.length > 1 && <span>+{pub.authors.length - 1}</span>}
                    </div>
                    
                    <a href={pub.link || "#"} target="_blank" rel="noopener noreferrer" className="flex items-center gap-1 text-sm font-bold text-red-600 group-hover:gap-2 transition-all">
                      Read <ArrowRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-2 mt-16">
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setCurrentPage(Math.max(0, currentPage - 1))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                disabled={currentPage === 0}
                className="rounded-full w-12 h-12 border-gray-200 hover:bg-gray-50 hover:text-red-600"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-1 px-4">
                <span className="text-sm font-semibold text-gray-900">Page {currentPage + 1}</span>
                <span className="text-sm text-gray-400">/</span>
                <span className="text-sm text-gray-500">{totalPages}</span>
              </div>
              <Button
                variant="outline"
                size="icon"
                onClick={() => {
                  setCurrentPage(Math.min(totalPages - 1, currentPage + 1))
                  window.scrollTo({ top: 0, behavior: 'smooth' })
                }}
                disabled={currentPage === totalPages - 1}
                className="rounded-full w-12 h-12 border-gray-200 hover:bg-gray-50 hover:text-red-600"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          )}
        </section>

         {/* --- Mobile Entertainment Review Archive (Bottom Section) --- */}
         <section id="mobenta" className="bg-gray-900 text-white py-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-red-900/20 rounded-full blur-[120px] -mr-40 -mt-40 pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-900/10 rounded-full blur-[100px] -ml-20 -mb-20 pointer-events-none"></div>

          <div className="container mx-auto px-4 relative z-10">
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-900/30 text-red-400 border border-red-800/50 text-sm font-bold mb-4">
                <FileText className="w-4 h-4" />
                <span>Historical Archives</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-black mb-4 tracking-tight">Mobile Entertainment Review</h2>
              <p className="text-gray-400 text-lg max-w-3xl">
                Access digitized issues of the "Mobile Entertainment Analyst" (2003), providing a rare window into the early days of the mobile gaming industry.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mobileEntertainmentReviews.map((item) => (
                <div key={item.id} className="group bg-gray-800/50 rounded-xl border border-gray-700/50 hover:border-red-500/50 hover:bg-gray-800 transition-all duration-300 overflow-hidden flex flex-col h-full">
                  
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-wide">
                      {item.date}
                    </div>
                    <h3 className="font-bold text-white text-lg leading-tight mb-3 line-clamp-2 group-hover:text-red-400 transition-colors">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed mb-4 line-clamp-3 flex-grow">
                      {item.description}
                    </p>
                    
                    <Button 
                      onClick={() => setViewingPdf(item.pdfUrl)}
                      variant="outline" 
                      className="w-full border-gray-600 text-red-600 hover:bg-white hover:text-gray-900 hover:border-white transition-all mt-auto group/btn"
                    >
                      <Eye className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" /> View Archive
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

      {/* PDF Viewer Modal */}
      <Dialog open={!!viewingPdf} onOpenChange={(open) => !open && setViewingPdf(null)}>
        <DialogContent className="w-[80vw] max-w-[80vw] h-[80vh] pt-10 p-0 bg-gray-950 border-gray-800 flex flex-col overflow-hidden sm:max-w-[95vw]">
          <DialogHeader className="px-6 py-4 border-b border-gray-800 flex-shrink-0 flex flex-row items-center justify-between bg-gray-900">
            <DialogTitle className="text-white text-lg font-bold">Document Viewer</DialogTitle>
            <DialogClose className="text-red-500 " />
          </DialogHeader>
          
          <div className="flex-1 w-full h-full bg-gray-900 relative">
            {viewingPdf ? (
              <iframe 
                src={`${viewingPdf}#view=FitH`} 
                className="w-full h-full border-none" 
                title="PDF Viewer"
                allowFullScreen
              />
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500">
                Loading document...
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

    </>
  )
}

export default function PublicationsPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />
      <main className="relative z-10 pb-0">
        <Suspense fallback={<div className="text-center py-20">Loading publications...</div>}>
          <PublicationsContent />
        </Suspense>
      </main>
      <Footer />
      
    </div>
  )
}