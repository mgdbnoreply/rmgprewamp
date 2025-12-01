"use client"

import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowRight, HelpCircle, MessageCircle } from "lucide-react"

export default function FAQPage() {
  const faqs = [
    {
      question: "What is the Retro Mobile Gaming Project?",
      answer:
        "The Retro Mobile Gaming Project (RMGP) is a comprehensive archive and research platform dedicated to preserving mobile games from 1975 to 2008. We provide researchers, developers, and enthusiasts with tools to explore and understand the evolution of mobile gaming.",
    },
    {
      question: "What time period does the collection cover?",
      answer:
        "Our collection spans from 1975 to 2008, covering the early days of mobile gaming through the pre-smartphone era. This includes games from various platforms such as early handheld devices, Game Boy, Nokia phones, and other mobile devices.",
    },
    {
      question: "How can I search for games in the database?",
      answer:
        "You can search games using multiple criteria including title, year developed, genre, platform, and more. Our robust search system allows you to filter and find specific games or discover patterns across different types of mobile games.",
    },
    {
      question: "Can I contribute to the project?",
      answer:
        "Yes! We welcome contributions from the community. If you have information about mobile games from our target period, game files, documentation, or other relevant materials, please visit our Contribute page or contact us directly.",
    },
    {
      question: "Is this project affiliated with any university?",
      answer:
        "Yes, the RMGP is led by researchers from Northeastern University and the University of Michigan, with support from the Center for Transformative Media at Northeastern University.",
    },
    {
      question: "How can I use this resource for research?",
      answer:
        "Researchers can use our database to study the evolution of mobile gaming, analyze game design patterns, explore historical trends, and create correlations between different types of mobile games. We provide comprehensive metadata and search capabilities to support academic research.",
    },
    {
      question: "Are the games playable?",
      answer:
        "Our primary focus is on preservation and documentation. While some games may be playable through emulation, our main goal is to preserve the history and provide comprehensive information about these games for research and educational purposes.",
    },
    {
      question: "How is the project funded?",
      answer:
        "The project is supported by academic institutions and research grants. We are committed to keeping this resource freely accessible to researchers, educators, and enthusiasts worldwide.",
    },
  ]

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />

      <main className="relative z-10">

        {/* --- Hero Section --- */}
        <section className="relative w-full mt-20 py-24 md:py-32 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/faq.avif"
              alt="FAQ Background"
              fill
              className="object-cover opacity-40"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                Support Center
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                Frequently Asked <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Questions
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Everything you need to know about the Retro Mobile Gaming Project, our mission, and how to use the archive.
              </p>
            </div>
          </div>
        </section>

        {/* --- FAQ Accordion Section --- */}
        <section className="container mx-auto px-4 -mt-16 relative z-20 pb-24">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-3 bg-red-50 rounded-2xl">
                  <HelpCircle className="w-6 h-6 text-red-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Common Inquiries</h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-gray-100 rounded-2xl px-6 py-2 shadow-sm hover:shadow-md transition-all duration-300 data-[state=open]:bg-gray-50 data-[state=open]:border-gray-200"
                  >
                    <AccordionTrigger className="text-left text-lg font-bold text-gray-800 hover:text-red-600 hover:no-underline py-4">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-600 text-base leading-relaxed pb-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* --- Contact CTA Section --- */}
        <section className="py-20 bg-gray-50 border-t border-gray-200">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-3xl mx-auto bg-white border border-gray-200 rounded-3xl p-10 md:p-16 shadow-xl relative overflow-hidden">
              {/* Decorative blob */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-red-50 rounded-full blur-3xl -mr-32 -mt-32 pointer-events-none"></div>
              
              <div className="relative z-10">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6 text-red-600">
                  <MessageCircle className="w-8 h-8" />
                </div>
                <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Still Have Questions?</h2>
                <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
                  Can't find the answer you're looking for? Our team is here to help with specific inquiries about the archive or research.
                </p>
                <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-6 rounded-full text-lg shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
                  <Link href="/contact">
                    Contact Us <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}