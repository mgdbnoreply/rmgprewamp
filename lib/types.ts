export interface GameData {
  Title: string
  Year: string
  Developers: string
  City: string
  Country: string
  URL: string
  Description: string
  Pictures: string
  Documentation: string
  Articles: string
  Purpose: string
  "Open Source": string
  "# Players": string
  Location: string
  Genre: string
  Hardware: string
  Connectivity: string
  Contact: string
}

// Add this interface from your other project
export interface CollectionData {
  ProductID: string;
  id: string;
  name: string;
  maker: string;
  year: string;
  description: string;
  image: string;
  category: string;
}