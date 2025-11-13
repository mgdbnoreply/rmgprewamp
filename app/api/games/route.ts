import { NextResponse } from "next/server"
import type { GameData } from "@/lib/types" // Import your GameData type

// AWS API Gateway endpoint
const API_BASE = "https://u3iysopa88.execute-api.us-east-1.amazonaws.com"

// Helper function to unwrap DynamoDB attribute values
function unwrapDynamoDBValue(value: any): any {
  if (!value || typeof value !== "object") return value

  // DynamoDB format: { S: "string", N: "number", SS: ["string"], etc. }
  if (value.S !== undefined) return value.S
  if (value.N !== undefined) return value.N
  if (value.BOOL !== undefined) return value.BOOL
  if (value.NULL !== undefined) return null
  
  // --- FIX IS HERE ---
  // Handle String Set (SS) - join into a single, comma-separated string
  if (value.SS !== undefined && Array.isArray(value.SS)) {
    return value.SS.join(", ") 
  }
  // Handle Number Set (NS) - join into a single, comma-separated string
  if (value.NS !== undefined && Array.isArray(value.NS)) {
    return value.NS.join(", ")
  }
  // --- END FIX ---

  if (value.L !== undefined) return value.L.map(unwrapDynamoDBValue)
  if (value.M !== undefined) {
    const obj: any = {}
    for (const key in value.M) {
      obj[key] = unwrapDynamoDBValue(value.M[key])
    }
    return obj
  }

  return value
}

// Transform a single DynamoDB item to GameData
function transformDynamoDBItem(item: any): GameData {
  const unwrapped: any = {}

  // Unwrap all DynamoDB attributes
  for (const key in item) {
    unwrapped[key] = unwrapDynamoDBValue(item[key])
  }

  // Map DynamoDB fields to GameData interface
  return {
    Title: unwrapped.GameTitle || unwrapped.Title || "",
    Year: unwrapped.YearDeveloped || unwrapped.Year || "",
    Developers: unwrapped.Developer || unwrapped.Developers || "",
    City: unwrapped.City || "",
    Country: unwrapped.DeveloperLocation || unwrapped.Country || "",
    URL: unwrapped.GameWebsite || unwrapped.URL || "",
    Description: unwrapped.GameDescription || unwrapped.Description || "",
    Pictures: unwrapped.Photos || unwrapped.Pictures || "", // This will now be a string
    Documentation: unwrapped.Videos || unwrapped.Documentation || "",
    Articles: unwrapped.Articles || "",
    Purpose: unwrapped.Purpose || "",
    "Open Source": unwrapped.OpenSource || unwrapped["Open Source"] || "",
    "# Players": unwrapped.Players || unwrapped["# Players"] || "",
    Location: unwrapped.SiteSpecific || unwrapped.Location || "",
    Genre: unwrapped.Genre || "",
    Hardware: unwrapped.HardwareFeatures || unwrapped.Hardware || "",
    Connectivity: unwrapped.Connectivity || "",
    Contact: unwrapped.Contact || "N/A",
  }
}

export async function GET(request: Request) {
  try {
    console.log("🔄 Fetching games from API Gateway...")

    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    const apiUrl = id ? `${API_BASE}/games/${id}` : `${API_BASE}/games`

    const response = await fetch(apiUrl, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    })

    if (!response.ok) {
      throw new Error(`API Gateway responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("📦 Raw API response:", JSON.stringify(data).substring(0, 200))

    let games: GameData[] = []

    if (Array.isArray(data)) {
      games = data.map(transformDynamoDBItem)
    } else if (data.Items && Array.isArray(data.Items)) {
      games = data.Items.map(transformDynamoDBItem)
    } else if (data.Item) {
      games = [transformDynamoDBItem(data.Item)]
    } else if (typeof data === "object" && (data.GameTitle || data.Title)) {
      games = [transformDynamoDBItem(data)]
    } else if (data.body) {
      const bodyData = typeof data.body === "string" ? JSON.parse(data.body) : data.body
      if (Array.isArray(bodyData)) {
        games = bodyData.map(transformDynamoDBItem)
      } else {
        games = [transformDynamoDBItem(bodyData)]
      }
    } else {
      console.warn("⚠️ Unexpected response structure:", Object.keys(data))
      games = [transformDynamoDBItem(data)]
    }

    console.log(`✅ Successfully loaded ${games.length} games`)

    return NextResponse.json(games, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("❌ Error fetching games:", error)
    return NextResponse.json(getFallbackGames(), {
      headers: { "X-Fallback": "true" },
    })
  }
}

// Fallback data
function getFallbackGames(): GameData[] {
  return [
    {
      Title: "Snake",
      Year: "1997",
      Developers: "Nokia",
      City: "Espoo",
      Country: "Finland",
      URL: "https://example.com",
      Description: "Classic snake game...",
      Pictures: "/retro-snake-game.jpg",
      Documentation: "",
      Articles: "",
      Purpose: "Entertainment",
      "Open Source": "No",
      "# Players": "1",
      Location: "No",
      Genre: "Arcade, Puzzle",
      Hardware: "Nokia 6110",
      Connectivity: "None",
      Contact: "N/A",
    },
    {
      Title: "Tetris",
      Year: "1989",
      Developers: "Nintendo",
      City: "Kyoto",
      Country: "Japan",
      URL: "https://example.com",
      Description: "Iconic puzzle game...",
      Pictures: "/game-boy-tetris.jpg",
      Documentation: "",
      Articles: "",
      Purpose: "Entertainment",
      "Open Source": "No",
      "# Players": "1-2",
      Location: "No",
      Genre: "Puzzle",
      Hardware: "Game Boy",
      Connectivity: "Link Cable",
      Contact: "N/A",
    },
  ]
}