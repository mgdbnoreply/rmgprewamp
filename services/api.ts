// API service for fetching game data
export const GameAPI = {
  async getAllGames() {
    try {
      // Fetch from the API route
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
      // Return empty array as fallback
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
}
