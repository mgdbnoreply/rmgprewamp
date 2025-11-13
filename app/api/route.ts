import { NextResponse } from "next/server"
import type { CollectionData } from "@/lib/types"

// AWS API Gateway endpoint
const API_BASE = "https://u3iysopa88.execute-api.us-east-1.amazonaws.com"

// Helper function to unwrap DynamoDB attribute values
function unwrapDynamoDBValue(value: any): any {
  if (!value || typeof value !== "object") return value

  // DynamoDB format: { S: "string", N: "number", BOOL: boolean, etc. }
  if (value.S !== undefined) return value.S
  if (value.N !== undefined) return value.N
  if (value.BOOL !== undefined) return value.BOOL
  if (value.NULL !== undefined) return null
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

// Transform a single DynamoDB item to CollectionData
function transformDynamoDBItem(item: any): CollectionData {
  const unwrapped: any = {}

  // Unwrap all DynamoDB attributes
  for (const key in item) {
    unwrapped[key] = unwrapDynamoDBValue(item[key])
  }

  // Map DynamoDB fields to CollectionData interface
  return {
    ProductID: unwrapped.ProductID || unwrapped.id || "",
    id: unwrapped.id || unwrapped.ProductID || "",
    name: unwrapped.name || "",
    maker: unwrapped.maker || "",
    year: unwrapped.year || "",
    description: unwrapped.description || "",
    image: unwrapped.image || "",
    category: unwrapped.category || "",
  }
}

export async function GET(request: Request) {
  try {
    console.log("🔄 Fetching collections from API Gateway...")

    // Get the collection ID from URL if present
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    // Build the API URL
    const apiUrl = id ? `${API_BASE}/collections/${id}` : `${API_BASE}/collections`

    // Fetch from AWS API Gateway
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Disable caching for fresh data
    })

    if (!response.ok) {
      throw new Error(`API Gateway responded with status: ${response.status}`)
    }

    const data = await response.json()
    console.log("📦 Raw API response:", JSON.stringify(data).substring(0, 200))

    // Handle different response structures
    let collections: CollectionData[] = []

    if (Array.isArray(data)) {
      // Direct array of items
      collections = data.map(transformDynamoDBItem)
    } else if (data.Items && Array.isArray(data.Items)) {
      // DynamoDB Scan response format
      collections = data.Items.map(transformDynamoDBItem)
    } else if (data.Item) {
      // DynamoDB GetItem response format (single item)
      collections = [transformDynamoDBItem(data.Item)]
    } else if (typeof data === "object" && data.ProductID) {
      // Single item response
      collections = [transformDynamoDBItem(data)]
    } else if (data.body) {
      // AWS API Gateway sometimes wraps response in body
      const bodyData = typeof data.body === "string" ? JSON.parse(data.body) : data.body
      if (Array.isArray(bodyData)) {
        collections = bodyData.map(transformDynamoDBItem)
      } else {
        collections = [transformDynamoDBItem(bodyData)]
      }
    } else {
      console.warn("⚠️ Unexpected response structure:", Object.keys(data))
      // Try to transform as-is
      collections = [transformDynamoDBItem(data)]
    }

    console.log(`✅ Successfully loaded ${collections.length} collections`)

    return NextResponse.json(collections, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    })
  } catch (error) {
    console.error("❌ Error fetching collections:", error)

    // Return fallback data from CSV
    return NextResponse.json(getFallbackCollections(), {
      headers: {
        "X-Fallback": "true",
      },
    })
  }
}

// Fallback data based on the CSV file
function getFallbackCollections(): CollectionData[] {
  return [
    {
      ProductID: "gameboy-color",
      id: "gameboy-color",
      name: "Gameboy Color",
      maker: "Nintendo",
      year: "1998",
      description: "Handheld device with a reflective color screen and simple controls.",
      image: "https://retromobilegamingproject.s3.us-east-1.amazonaws.com/consoles/578b68ab_1757953342_gameboy-color-green.jpeg",
      category: "console",
    },
    {
      ProductID: "n-gage-qd",
      id: "n-gage-qd",
      name: "N-Gage (QD)",
      maker: "Nokia",
      year: "2004",
      description: "A combination of a gaming device and smartphone with a color screen.",
      image: "https://retromobilegamingproject.s3.us-east-1.amazonaws.com/consoles/6f39affc_1757953381_nokia-ngage.jpeg",
      category: "console",
    },
    {
      ProductID: "sega-game-gear",
      id: "sega-game-gear",
      name: "Sega Game Gear",
      maker: "Sega",
      year: "1991",
      description: "Handheld game console with a color screen requiring cartridges.",
      image: "https://retromobilegamingproject.s3.us-east-1.amazonaws.com/consoles/93cf0788_1757953324_sega-game-gear.jpeg",
      category: "console",
    },
    {
      ProductID: "tamagotchi",
      id: "tamagotchi",
      name: "Tamagotchi",
      maker: "Bandai",
      year: "1996",
      description: "Handheld virtual pet requiring care and attention to grow and thrive.",
      image: "https://retromobilegamingproject.s3.us-east-1.amazonaws.com/consoles/3e9d842a_1757953375_tamagotchi.jpeg",
      category: "proprietary",
    },
    {
      ProductID: "nokia-3310",
      id: "nokia-3310",
      name: "Nokia 3310",
      maker: "Nokia",
      year: "2000",
      description: "Durable phone famous for its long battery life and pre-installed games.",
      image: "https://retromobilegamingproject.s3.us-east-1.amazonaws.com/consoles/f71c44c3_1757953321_IMG_3118.JPG",
      category: "phone",
    },
  ]
}

