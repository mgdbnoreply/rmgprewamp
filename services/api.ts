import type { CollectionData, GameData } from "@/lib/types"

export const GameAPI = {
  async getAllGames() {
    try {
      const response = await fetch("/api/games", {
        cache: "no-store",
      })

      if (!response.ok) {
        console.error("[v0] API response not OK:", response.status)
        return []
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("[v0] Error fetching games:", error)
      return []
    }
  },

  async getGameById(id: string) {
    try {
      const response = await fetch(`/api/games/${id}`, {
        cache: "no-store",
      })

      if (!response.ok) {
        console.error("[v0] API response not OK:", response.status)
        return null
      }

      return await response.json()
    } catch (error) {
      console.error("[v0] Error fetching game:", error)
      return null
    }
  },

  // NEW: Fetch collections from the root /api route
  async getCollections() {
    try {
      // This maps to app/api/route.ts
      const response = await fetch("/api", {
        cache: "no-store",
      })

      if (!response.ok) {
        console.error("[v0] API response not OK:", response.status)
        return []
      }

      const data = await response.json()
      return data
    } catch (error) {
      console.error("[v0] Error fetching collections:", error)
      return []
    }
  },
}