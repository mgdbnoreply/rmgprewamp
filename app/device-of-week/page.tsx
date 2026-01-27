"use client"

import { useState, useEffect } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { GameAPI } from "@/services/api"
import type { CollectionData } from "@/lib/types"
import { Calendar, MapPin, Globe, ArrowRight } from "lucide-react"

export default function DeviceOfWeekPage() {
  const [deviceOfWeek, setDeviceOfWeek] = useState<CollectionData | null>(null)
  const [allDevices, setAllDevices] = useState<CollectionData[]>([])
  const [loading, setLoading] = useState(true)
  const [weekNumber, setWeekNumber] = useState(0)

  // Fetch devices on mount
  useEffect(() => {
    async function fetchDevices() {
      try {
        const response = await GameAPI.getCollections()
        if (Array.isArray(response) && response.length > 0) {
          setAllDevices(response)
          
          // Calculate current week number
          const now = new Date()
          const start = new Date(now.getFullYear(), 0, 1)
          const diff = now.getTime() - start.getTime()
          const oneWeek = 1000 * 60 * 60 * 24 * 7
          const week = Math.floor(diff / oneWeek)
          setWeekNumber(week)
          
          // Select device based on week number
          const deviceIndex = week % response.length
          setDeviceOfWeek(response[deviceIndex])
        }
        setLoading(false)
      } catch (error) {
        console.error("Error fetching devices:", error)
        setLoading(false)
      }
    }

    fetchDevices()
  }, [])

  // Badge color helper
  const getCategoryColor = (category: string) => {
    const colors: { [key: string]: string } = {
      phone: "bg-green-500/20 text-green-400 border-green-500/50",
      console: "bg-red-500/20 text-red-400 border-red-500/50",
      proprietary: "bg-purple-500/20 text-purple-400 border-purple-500/50",
      game: "bg-blue-500/20 text-blue-400 border-blue-500/50",
    }
    return colors[category?.toLowerCase()] || "bg-gray-500/20 text-gray-400 border-gray-500/50"
  }

  return (
    <>
      <Header />
      
      <main className="min-h-screen bg-black pt-32 pb-20">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Hero Section */}
          <div className="mb-16">
            <div className="inline-block mb-4">
              <Badge className="bg-red-500/20 text-red-400 border-red-500/50 text-sm py-2 px-4 font-semibold">
                <Calendar className="h-4 w-4 mr-2" />
                Week {weekNumber + 1}
              </Badge>
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
              Device of the Week
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl">
              Discover a featured device from our collection, rotated every week. Learn about the hardware that shaped mobile gaming history.
            </p>
          </div>

          {loading ? (
            <div className="text-center py-20">
              <div className="text-gray-400">Loading device...</div>
            </div>
          ) : deviceOfWeek ? (
            <>
              {/* Featured Device Card */}
              <div className="bg-gradient-to-br from-white/10 to-white/5 border border-white/20 rounded-3xl overflow-hidden mb-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-8 md:p-12">
                  
                  {/* Device Image */}
                  <div className="flex items-center justify-center">
                    {deviceOfWeek.image ? (
                      <div className="relative w-full aspect-square bg-black/50 rounded-2xl overflow-hidden">
                        <Image
                          src={deviceOfWeek.image}
                          alt={deviceOfWeek.name}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ) : (
                      <div className="w-full aspect-square bg-white/5 rounded-2xl flex items-center justify-center">
                        <span className="text-gray-500">No image available</span>
                      </div>
                    )}
                  </div>

                  {/* Device Info */}
                  <div className="flex flex-col justify-center">
                    <div className="mb-6">
                      <Badge className={`${getCategoryColor(deviceOfWeek.category)} text-xs py-1 px-3 font-semibold mb-4`}>
                        {deviceOfWeek.category || "Device"}
                      </Badge>
                      <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
                        {deviceOfWeek.name}
                      </h2>
                      {deviceOfWeek.maker && (
                        <p className="text-lg text-gray-400 mb-6">
                          by <span className="text-gray-200 font-semibold">{deviceOfWeek.maker}</span>
                        </p>
                      )}
                    </div>

                    {/* Device Details */}
                    <div className="space-y-4 mb-8">
                      {deviceOfWeek.year && (
                        <div className="flex items-center gap-3">
                          <Calendar className="h-5 w-5 text-red-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-400">Year Released</p>
                            <p className="text-white font-semibold">{deviceOfWeek.year}</p>
                          </div>
                        </div>
                      )}
                      {deviceOfWeek.category && (
                        <div className="flex items-center gap-3">
                          <Globe className="h-5 w-5 text-red-500 flex-shrink-0" />
                          <div>
                            <p className="text-sm text-gray-400">Device Type</p>
                            <p className="text-white font-semibold capitalize">{deviceOfWeek.category}</p>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Description */}
                    {deviceOfWeek.description && (
                      <div className="mb-8">
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {deviceOfWeek.description}
                        </p>
                      </div>
                    )}

                    {/* CTA Button */}
                    <div className="flex gap-4">
                      <Button 
                        asChild
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-xl transition-all flex items-center gap-2"
                      >
                        <a href="/collection">
                          Explore All Devices
                          <ArrowRight className="h-5 w-5" />
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>

            </>
          ) : (
            <div className="text-center py-20">
              <div className="text-gray-400">No devices found</div>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </>
  )
}
