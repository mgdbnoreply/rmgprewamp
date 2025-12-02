"use client"

import Header from "@/components/header"
import { Footer } from "@/components/footer"
import Link from "next/link"
import { CheckCircle2, ArrowLeft, FileText, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AssignmentPage() {
  return (
    <div className="min-h-screen bg-neutral-50 text-gray-900 font-sans">
      <Header />

      <main className="relative z-10 pt-20">
        
        {/* Header Section */}
        <section className="bg-black text-white py-16 md:py-24 relative overflow-hidden">
           <div className="absolute inset-0 z-0">
            <Image
              src="/page/education.avif"
              alt="Assignment Background"
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
            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">Media History Assignment</h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Research an early mobile game and contribute an entry to the Retro Mobile Gaming Database.
            </p>
          </div>
        </section>

        {/* Content Section */}
        <section className="container mx-auto px-4 py-12 -mt-10 relative z-20">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-12 max-w-5xl mx-auto">
            
            {/* Overview */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FileText className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Assignment Overview</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg">
                Your task is to select an early mobile game that interests you (and is not already in the database) and conduct comprehensive archival research. Your goal is to create a detailed database entry that supports the Center for Transformative Media's efforts to preserve mobile gaming history.
              </p>
            </div>

            {/* Workflow Steps */}
            <div className="grid md:grid-cols-2 gap-12 mb-12">
              <div className="space-y-8">
                <h3 className="text-xl font-bold text-gray-900 border-b pb-2">Assignment Workflow</h3>
                
                <div className="space-y-6">
                  {/* Step 1 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">1</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Register</h4>
                      <p className="text-gray-600 mt-1">
                        Visit the Retro Mobile Gaming Database platform and follow the instructions to create an account using your university email.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">2</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Conduct Research</h4>
                      <p className="text-gray-600 mt-1">
                        Select an early mobile game (e.g., "Disney’s Aladdin" on Game Boy Color). Use internet and archival research strategies to gather information about its history, development, impact, and reception.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">3</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Add Entry</h4>
                      <p className="text-gray-600 mt-1">
                        Write a comprehensive entry. Attempt to find all relevant criteria such as Game Overview, Developer Information, Release Date, and Connectivity Type. Use the glossary to understand specific terms.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-600 text-white flex items-center justify-center font-bold text-lg">4</div>
                    <div>
                      <h4 className="font-bold text-gray-900 text-lg">Submission</h4>
                      <p className="text-gray-600 mt-1">
                        Submit your completed entry directly on the Retro Mobile Gaming Database platform. Additionally, upload a copy of your entry to your Learning Management System.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation Criteria */}
              <div className="bg-gray-50 rounded-2xl p-8 border border-gray-100 h-fit">
                <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-green-600" /> Evaluation Criteria
                </h3>
                <p className="text-gray-600 mb-6">
                  Your entry will be evaluated based on the following key areas:
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Completeness</strong>
                      <span className="text-gray-600 text-sm">All required fields are filled with high-quality data.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Accuracy</strong>
                      <span className="text-gray-600 text-sm">Information is verified from reliable sources.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Depth of Research</strong>
                      <span className="text-gray-600 text-sm">Detailed historical context and technical specifications.</span>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <ChevronRight className="w-5 h-5 text-red-500 mt-0.5" />
                    <div>
                      <strong className="text-gray-900 block">Originality</strong>
                      <span className="text-gray-600 text-sm">Contribution to the historical understanding of early mobile games.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            

          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}