"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Users, Calendar, MapPin, Gamepad2 } from "lucide-react"
import Image from "next/image"
import type { GameData } from "@/lib/types"

interface GameModalProps {
  game: GameData | null
  isOpen: boolean
  onClose: () => void
}

export function GameModal({ game, isOpen, onClose }: GameModalProps) {
  if (!game) return null

  const getFirstImage = (pictures: string | undefined) => {
    if (!pictures) return "/placeholder.svg"
    const imageUrls = pictures.split(",").map((url) => url.trim())
    return imageUrls[0] || "/placeholder.svg"
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 to-black border-gray-800">
        <DialogHeader>
          <DialogTitle className="text-3xl font-black text-white mb-2">{game.Title}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Image */}
          <div className="relative w-full h-96 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
            <Image
              src={getFirstImage(game.Pictures) || "/placeholder.svg"}
              alt={game.Title}
              fill
              className="object-cover"
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = "/placeholder.svg"
              }}
            />
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {game.Year && (
              <div className="flex items-center gap-2 text-gray-300">
                <Calendar className="h-4 w-4 text-red-500" />
                <span className="text-sm">{game.Year}</span>
              </div>
            )}
            {game["# Players"] && (
              <div className="flex items-center gap-2 text-gray-300">
                <Users className="h-4 w-4 text-red-500" />
                <span className="text-sm">{game["# Players"]}</span>
              </div>
            )}
            {game.Country && (
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="h-4 w-4 text-red-500" />
                <span className="text-sm">{game.Country}</span>
              </div>
            )}
            {game.Genre && (
              <div className="flex items-center gap-2 text-gray-300">
                <Gamepad2 className="h-4 w-4 text-red-500" />
                <span className="text-sm">{game.Genre.split(",")[0]}</span>
              </div>
            )}
          </div>

          {/* Description */}
          {game.Description && (
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Description</h3>
              <p className="text-gray-300 leading-relaxed">{game.Description}</p>
            </div>
          )}

          {/* Developer Info */}
          {game.Developers && (
            <div>
              <h3 className="text-xl font-bold text-white mb-3">Developer</h3>
              <p className="text-gray-300">{game.Developers}</p>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {game.Hardware && (
              <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700">
                {game.Hardware}
              </Badge>
            )}
            {game.Purpose && (
              <Badge variant="secondary" className="bg-gray-800 text-gray-300 border-gray-700">
                {game.Purpose}
              </Badge>
            )}
            {game["Open Source"] && (
              <Badge variant="secondary" className="bg-green-900/30 text-green-400 border-green-700">
                Open Source
              </Badge>
            )}
          </div>

          {/* Links */}
          {game.URL && (
            <div>
              <Button asChild className="bg-red-600 hover:bg-red-700 text-white font-semibold">
                <a href={game.URL} target="_blank" rel="noopener noreferrer">
                  Visit Website <ExternalLink className="ml-2 h-4 w-4" />
                </a>
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
