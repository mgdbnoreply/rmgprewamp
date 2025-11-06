"use client"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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
    <div
      className="min-h-screen bg-white text-gray-900"
    >
      <Header />

      <main className="relative z-10">

        {/* Title Section (Light Glass) */}
        <section className="relative pt-40 pb-16 overflow-hidden px-4 md:px-8 lg:px-16">
          <div className="relative max-w-4xl mx-auto p-12 bg-white/50 backdrop-blur-lg rounded-3xl border border-gray-200/50 shadow-2xl text-center">
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-4 bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
              Frequently Asked Questions
            </h1>
          </div>
        </section>

        {/* FAQ Section (Light Glass) */}
        <section className="relative py-12 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/50 backdrop-blur-lg border border-gray-200/50 rounded-3xl p-8 md:p-12 shadow-2xl">
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-gray-200/80 rounded-2xl shadow-md transition-all duration-300
                               bg-white/60 backdrop-blur-md 
                               hover:bg-gradient-to-br from-red-600/95 to-red-900/95
                               data-[state=open]:bg-gradient-to-br data-[state=open]:from-red-600/95 data-[state=open]:to-red-900/95
                               hover:text-white data-[state=open]:text-white"
                  >
                    <AccordionTrigger className="text-left text-lg font-semibold text-gray-900 hover:text-white data-[state=open]:text-white hover:no-underline py-6 px-6">
                      {faq.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-white-700 data-[state=open]:text-white/90 leading-relaxed pb-6 px-6">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </section>

        {/* Contact CTA (Red-Tinted Glass) */}
        <section className="relative py-16 px-4 md:px-8 lg:px-16">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-gradient-to-br from-red-600/90 to-red-800/90 backdrop-blur-lg rounded-3xl border border-red-500/30 shadow-2xl p-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Still Have Questions?</h2>
              <p className="text-lg text-red-50 mb-8">
                Can't find the answer you're looking for? Feel free to reach out to our team.
              </p>
              <a
                href="/contact"
                className="inline-block bg-white hover:bg-gray-200 text-red-600 font-bold px-8 py-4 rounded-full shadow-lg transition-all"
              >
                Contact Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}