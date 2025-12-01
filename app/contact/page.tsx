"use client"

import type React from "react"
import { useState } from "react"
import Header from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, MapPin, Send, MessageSquare } from "lucide-react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission logic here
    console.log("Form submitted:", formData)
  }

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      <Header />

      <main className="relative z-10 pb-0">
        
        {/* --- Hero Section --- */}
        <section className="relative w-full mt-20 py-24 md:py-32 overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <Image
              src="/page/contact.jpg"
              alt="Contact Background"
              fill
              className="object-cover opacity-50"
              priority
            />
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-transparent"></div>
          </div>

          <div className="container relative z-10 mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <Badge className="mb-6 bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 text-sm uppercase tracking-widest border-none">
                Contact Us
              </Badge>
              <h1 className="text-5xl md:text-7xl font-black text-white mb-6 tracking-tight leading-tight">
                Get in&nbsp;
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-500">
                  Touch
                </span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                We'd love to hear from you! Whether you have questions about the archive, feedback, or collaboration ideas, we're here to connect.
              </p>
            </div>
          </div>
        </section>

        {/* --- Contact Content Section --- */}
        <section className="container mx-auto px-4 -mt-16 relative z-20 pb-24">
          <div className="max-w-6xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100 flex flex-col lg:flex-row">
            
            {/* Left Side: Contact Info */}
            <div className="lg:w-2/5 bg-gray-900 p-10 md:p-14 text-white relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-red-600/20 rounded-full blur-3xl -mr-32 -mt-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl -ml-32 -mb-32"></div>

                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
                        <p className="text-gray-400 mb-10 leading-relaxed">
                            Reach out to the RMGP team directly. We are always looking for new researchers and contributors to join our mission.
                        </p>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <Mail className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Email</h3>
                                    <a href="mailto:TransformativeMedia@northeastern.edu" className="block text-gray-400 hover:text-white transition-colors text-sm mb-1">TransformativeMedia@northeastern.edu</a>
                                    <a href="mailto:jashu.s@northeastern.edu" className="block text-gray-400 hover:text-white transition-colors text-sm">jashu.s@northeastern.edu</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="p-3 bg-white/10 rounded-xl backdrop-blur-sm">
                                    <MapPin className="w-6 h-6 text-red-400" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-lg mb-1">Location</h3>
                                    <p className="text-gray-400 text-sm leading-relaxed">
                                        Center for Transformative Media<br/>
                                        Northeastern University<br/>
                                        Boston, MA
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <div className="bg-gray-800/50 rounded-2xl p-6 border border-gray-700">
                            <h4 className="font-bold text-white mb-2 flex items-center gap-2">
                                <MessageSquare className="w-4 h-4 text-blue-400" /> FAQ
                            </h4>
                            <p className="text-gray-400 text-sm mb-4">
                                Have a general question? Check our FAQ page first.
                            </p>
                            <Button asChild variant="outline" className="w-full border-gray-600 text-gray-300 hover:bg-white hover:text-gray-900 hover:border-white transition-all">
                                <a href="/faq">Visit FAQ Page</a>
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Side: Contact Form */}
            <div className="lg:w-3/5 p-10 md:p-14 bg-white">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">Send a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <label htmlFor="name" className="text-sm font-bold text-gray-700">Your Name</label>
                            <Input
                                id="name"
                                placeholder="John Doe"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20"
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-bold text-gray-700">Email Address</label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="john@example.com"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="subject" className="text-sm font-bold text-gray-700">Subject</label>
                        <Input
                            id="subject"
                            placeholder="How can we help?"
                            value={formData.subject}
                            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                            className="h-12 bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label htmlFor="message" className="text-sm font-bold text-gray-700">Message</label>
                        <Textarea
                            id="message"
                            placeholder="Write your message here..."
                            value={formData.message}
                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                            className="min-h-[180px] bg-gray-50 border-gray-200 focus:border-red-500 focus:ring-red-500/20 resize-none"
                            required
                        />
                    </div>

                    <Button type="submit" className="w-full bg-red-600 hover:bg-red-700 text-white font-bold h-14 text-lg rounded-xl shadow-lg hover:shadow-red-500/30 transition-all transform hover:-translate-y-1">
                        Send Message <Send className="ml-2 w-5 h-5" />
                    </Button>
                </form>
            </div>

          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}