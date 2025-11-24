"use client"

import type React from "react"

import Header from "@/components/header"
import Footer from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Header />

      <main className="relative">
        {/* Animated Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-red-500/5 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-red-500/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        
        {/* --- Full Width Hero Section --- */}
                                <section className="relative w-full mt-16 py-24 md:py-32 overflow-hidden">
                                  {/* Background Image & Overlay */}
                                  <div className="absolute inset-0 z-0">
                                    <Image
                                      src="/page/contact.jpg"
                                      alt="Contact Background"
                                      fill
                                      className="object-cover grayscale opacity-80"
                                      priority
                                    />
                                    {/* Changed white gradient to black gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/80"></div>
                                  </div>
                        
                                  {/* Content Container (Constrained width) */}
                                  <div className="container relative z-10 mx-auto px-4">
                                    <div className="max-w-8xl mx-auto text-center">
                                      {/* Changed inner container background to white for contrast */}
                                      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-8 md:p-12 border border-white/50 shadow-xl">
                                        <div className="relative inline-flex items-center justify-center gap-5 group mb-8 p-6 bg-white/80 backdrop-blur-xl rounded-full border border-white/60 shadow-2xl">
                                          <span className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                                            CONTACT US
                
                                          </span>
                                          <div className="relative w-8 h-8 flex-shrink-0 hidden sm:block">
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-red-500 to-red-700 absolute left- top-1/2 -translate-y-1/2 z-0"></div>
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 absolute left-2.5 top-1/2 -translate-y-1/2 z-10"></div>
                                          </div>
                                          <span className="text-4xl md:text-6xl font-black tracking-tight bg-gradient-to-r from-red-600 to-black bg-clip-text text-transparent">
                                            GET IN TOUCH
                                          </span>
                                        </div>
                        
                                        <p className="text-lg md:text-xl text-gray-800 font-semibold max-w-3xl mx-auto leading-relaxed">
                                          We'd love to hear from you! Whether you have questions, feedback, or
                                          collaboration ideas, feel free to reach out to us using the contact form below.
                                        </p>
                                      </div>
                                    </div>
                                  </div>
                                </section>

        {/* Contact Content */}
        <section className="relative py-8 px-4 md:px-4 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="bg-gradient-to-br from-red-600 to-black rounded-3xl p-8 md:p-12 shadow-lg border border-red-700/30">
                <h2 className="text-3xl font-bold mb-6 text-white">Get In Touch</h2>
                <p className="text-white/90 mb-8">
                  Fill out the form below and we'll get back to you as soon as possible.
                </p>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
                      Your Name
                    </label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="bg-white/90 border-white text-gray-900 placeholder:text-gray-600 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
                      Email Address
                    </label>
                    <Input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="bg-white/90 border-white text-gray-900 placeholder:text-gray-600 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-semibold text-white mb-2">
                      Subject
                    </label>
                    <Input
                      id="subject"
                      type="text"
                      placeholder="How can we help?"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="bg-white/90 border-white text-gray-900 placeholder:text-gray-600 focus:border-red-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-semibold text-white mb-2">
                      Message
                    </label>
                    <Textarea
                      id="message"
                      placeholder="Your message..."
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="bg-white/90 border-white text-gray-900 placeholder:text-gray-600 focus:border-red-500 min-h-[150px]"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full bg-white hover:bg-gray-100 text-red-600 font-bold py-6 rounded-full shadow-lg transition-all"
                  >
                    Send Message
                  </Button>
                </form>
              </div>

              {/* Contact Information */}
              <div className="space-y-8">
                <div className="bg-gradient-to-br from-red-50 to-white border border-red-200 rounded-3xl p-8 md:p-12 shadow-lg">
                  <h2 className="text-3xl font-bold mb-6 text-gray-900">Contact Information</h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-red-600 to-black flex items-center justify-center flex-shrink-0">
                        <Mail className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Email</h3>
                        <a
                          href="mailto:TransformativeMedia@northeastern.edu"
                          className="text-red-600 hover:text-red-700 transition-colors block"
                        >
                          TransformativeMedia@northeastern.edu
                        </a>
                        <a
                          href="mailto:jashu.s@northeastern.edu"
                          className="text-red-600 hover:text-red-700 transition-colors block"
                        >
                          jashu.s@northeastern.edu
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-red-600 to-black border border-red-700/30 rounded-3xl p-8 md:p-12 shadow-lg">
                  <h3 className="text-2xl font-bold mb-4 text-white">Have Questions?</h3>
                  <p className="text-white/90 mb-6">
                    Check out our FAQ page for answers to common questions about the Retro Mobile Gaming Project.
                  </p>
                  <a
                    href="/faq"
                    className="inline-block bg-white hover:bg-gray-100 text-red-600 font-bold px-6 py-3 rounded-full shadow-lg transition-all"
                  >
                    View FAQ
                  </a>
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
