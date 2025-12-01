export interface Publication {
  id: number
  title: string
  authors: string[]
  year: number
  description: string
  thumbnail: string
  categories: string[]
  topic: string
  link?: string
  pdfUrl?: string; // Add this new optional field
}

export const publicationsData: Publication[] = [
  {
    id: 1,
    title: "Infrastructures Enabling Creativity and Play in Hybrid Spaces",
    authors: ["Glover, R"],
    year: 2024,
    description: "Glover, R. (2024). Infrastructures Enabling Creativity and Play in Hybrid Spaces. In The Mobile Media Debate (pp. 130-142). Routledge.",
    thumbnail: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80", // Abstract digital infrastructure
    categories: ["Articles", "Hybrid Spaces"],
    topic: "Hybrid Spaces",
  },
  {
    id: 2,
    title: "Playful mobilities in the Global South: A study of Pokémon Go play in Rio de Janeiro and Nairobi",
    authors: ["de Souza e Silva, A.", "Glover-Rijkse, R.", "Njathi, A.", "de Cunto Bueno, D."],
    year: 2023,
    description: "de Souza e Silva, A., Glover-Rijkse, R., Njathi, A., & de Cunto Bueno, D. (2023). Playful mobilities in the Global South: A study of Pokémon Go play in Rio de Janeiro and Nairobi. New Media & Society, 25(5), 963-979.",
    thumbnail: "https://images.unsplash.com/photo-1598391990342-311775e3d374?w=800&q=80", // Rio de Janeiro cityscape
    categories: ["Articles", "Global South", "Mobile Games"],
    topic: "Cultural Studies",
  },
  {
    id: 3,
    title: "Software Presentation: The Retro Mobile Gaming Database",
    authors: ["de Souza e Silva, A.", "Glover-Rijkse, R."],
    year: 2023,
    description: "de Souza e Silva, A., & Glover-Rijkse, R. (2023). Software Presentation: The Retro Mobile Gaming Database. Mobile Media & Communication, 1–6.",
    thumbnail: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80", // Retro gaming setup
    categories: ["Articles", "Database", "Preservation"],
    topic: "Preservation",
  },
  {
    id: 4,
    title: "Preserving the History of Mobile Gaming: A review of the Retro Mobile Gaming Database",
    authors: ["Frith, J."],
    year: 2023,
    description: "Frith, J. (2023). Preserving the History of Mobile Gaming: A review of the Retro Mobile Gaming Database. Mobile Media & Communication.",
    thumbnail: "https://images.unsplash.com/photo-1591541341697-725a59be2f53?w=800&q=80", // Vintage Nintendo Game Boy
    categories: ["Articles", "Review", "Preservation"],
    topic: "Preservation",
  },
  {
    id: 5,
    title: "Exploring the material conditions of Pokémon Go play in Rio de Janeiro and Nairobi",
    authors: ["de Souza e Silva, A.", "Glover-Rijkse, R.", "Njathi, A.", "de Cunto Bueno, D."],
    year: 2021,
    description: "de Souza e Silva, A., Glover-Rijkse, R., Njathi, A., & de Cunto Bueno, D. (2021). Exploring the material conditions of Pokémon Go play in Rio de Janeiro and Nairobi. Information, Communication & Society, 24(6), 813-829.",
    thumbnail: "https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&q=80", // Mobile phone in urban setting
    categories: ["Articles", "Materiality", "Global South"],
    topic: "Cultural Studies",
  },
  {
    id: 6,
    title: "A dialogue with Nick Tandavanitj from Blast Theory",
    authors: ["Glover-Rijkse, R."],
    year: 2020,
    description: "Glover-Rijkse, R. (2020). A dialogue with Nick Tandavanitj from Blast Theory. Hybrid Play: Crossing Boundaries in Game Design, Players Identities and Play Spaces.",
    thumbnail: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80", // Game design workspace
    categories: ["Articles", "Game Design"],
    topic: "Game Design",
  },
  {
    id: 7,
    title: "Hybrid play: Crossing boundaries in game design, players identities and play spaces",
    authors: ["de Souza e Silva, A.", "Glover-Rijkse, R."],
    year: 2020,
    description: "e Souza e Silva, A., & Glover-Rijkse, R. (Eds.). (2020). Hybrid play: Crossing boundaries in game design, players identities and play spaces. Routledge.",
    thumbnail: "https://images.unsplash.com/photo-1632239776255-0a7f24814df2?w=800&q=80", // AR gaming concept
    categories: ["Articles", "Hybrid Play"],
    topic: "Hybrid Play",
  },
  {
    id: 8,
    title: "Historicizing Hybrid Spaces in Mobile Media Art",
    authors: ["e Souza e Silva, A.", "Glover-Rijkse, R."],
    year: 2020,
    description: "e Souza e Silva, A., & Glover-Rijkse, R. (2020). Historicizing Hybrid Spaces in Mobile Media Art. In The Routledge Companion to Mobile Media Art (pp. 117-127). Routledge.",
    thumbnail: "https://images.unsplash.com/photo-1614294148960-9aa740632a87?w=800&q=80", // Digital art installation
    categories: ["Articles", "Media Art", "History"],
    topic: "History",
  },
  {
    id: 9,
    title: "Location-based mobile games: Interfaces to urban spaces",
    authors: ["de Souza e Silva, A.", "Frith, J."],
    year: 2015,
    description: "de Souza e Silva, A., & Frith, J. (2015). Location-based mobile games: Interfaces to urban spaces. In V. Frissen (Ed.), Playful Identities: The Ludification of Digital Media Cultures.",
    thumbnail: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80", // Urban technology interface
    categories: ["Book Chapter", "Urban Spaces"],
    topic: "Urban Spaces",
  },
  {
    id: 10,
    title: "Playful Urban Spaces: A historical approach to mobile games",
    authors: ["de Souza e Silva, A.", "Hjorth, L."],
    year: 2009,
    description: "de Souza e Silva, A., & Hjorth, L. (2009). Playful Urban Spaces: A historical approach to mobile games. Simulation & Gaming, 40(5).",
    thumbnail: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80", // City street with people using phones
    categories: ["Articles", "Urban Spaces", "History"],
    topic: "History",
  },
  {
    id: 11,
    title: "Hybrid Reality and Location-Based Gaming: Redefining mobility and game spaces in urban environments",
    authors: ["de Souza e Silva, A."],
    year: 2009,
    description: "de Souza e Silva, A. (2009). Hybrid Reality and Location-Based Gaming: Redefining mobility and game spaces in urban environments. Simulation & Gaming, 40(3), 404–424.",
    thumbnail: "https://images.unsplash.com/photo-1533421821268-87e42c1d70b0?w=800&q=80", // Mixed reality visualization
    categories: ["Articles", "Hybrid Reality"],
    topic: "Hybrid Reality",
  },
  {
    id: 12,
    title: "Alien Revolt (2005–2007): A case study of the first location-based mobile game in Brazil",
    authors: ["de Souza e Silva, A."],
    year: 2008,
    description: "de Souza e Silva, A. (2008). Alien Revolt (2005–2007): A case study of the first location-based mobile game in Brazil. IEEE Technology and Society Magazine, 27(1), 18–28.",
    thumbnail: "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80", // Brazil urban technology
    categories: ["Articles", "Case Study"],
    topic: "Case Study",
  },
  {
    id: 13,
    title: "Conceptualizing locative social mobile networks",
    authors: ["de Souza e Silva, A."],
    year: 2007,
    description: "de Souza e Silva, A. (2007, Oct.). Conceptualizing locative social mobile networks: Smart mobs, location-based games and interpersonal-aware applications. AoIR 2007.",
    thumbnail: "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&q=80", // Network visualization concept
    categories: ["Conference Paper", "Social Networks"],
    topic: "Social Networks",
  },
  {
    id: 14,
    title: "Funding Mobile Content",
    authors: ["Elizabeth Biddlecombe"],
    year: 2003,
    description: "An analysis of venture capital trends...",
    thumbnail: "/page/publications.jpg",
    categories: ["Industry Report"],
    topic: "Industry Analysis",
    // Add the path to your file here
    pdfUrl: "/documents/mea2003-05.pdf" 
  },
]

// Alternative custom image paths if you want to use your own hosted images
export const customImagePaths = {
  // RMGD Collection Photos
  rmgdCollection: "/images/rmgd-collection-overview.jpg",
  gameAndWatch: "/images/nintendo-game-watch.jpg",
  nokiaSnake: "/images/nokia-3310-snake.jpg",
  mattelFootball: "/images/mattel-football-handheld.jpg",
  
  // Research Documentation
  pokemonGoRio: "/images/pokemon-go-rio-research.jpg",
  pokemonGoNairobi: "/images/pokemon-go-nairobi-research.jpg",
  hybridSpacesVisualization: "/images/hybrid-spaces-concept.jpg",
  
  // Database Screenshots
  rmgdInterface: "/images/rmgd-database-interface.png",
  rmgdTimeline: "/images/rmgd-timeline-feature.png",
  rmgdMap: "/images/rmgd-geographic-map.png",
  
  // Data Visualizations
  mobileGamingEvolution: "/images/mobile-gaming-evolution-chart.svg",
  globalSouthMobility: "/images/global-south-mobility-patterns.svg",
  gameGenreDistribution: "/images/game-genre-distribution.svg",
}

// Function to get appropriate image based on topic
export function getTopicImage(topic: string): string {
  const topicImages: Record<string, string> = {
    "Preservation": "https://images.unsplash.com/photo-1591541341697-725a59be2f53?w=800&q=80",
    "Cultural Studies": "https://images.unsplash.com/photo-1598391990342-311775e3d374?w=800&q=80",
    "Hybrid Spaces": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80",
    "Hybrid Reality": "https://images.unsplash.com/photo-1533421821268-87e42c1d70b0?w=800&q=80",
    "Game Design": "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&q=80",
    "Urban Spaces": "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800&q=80",
    "History": "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80",
    "Social Networks": "https://images.unsplash.com/photo-1562577309-2592ab84b1bc?w=800&q=80",
    "Case Study": "https://images.unsplash.com/photo-1588508065123-287b28e013da?w=800&q=80",
    "Hybrid Play": "https://images.unsplash.com/photo-1632239776255-0a7f24814df2?w=800&q=80"
  }
  return topicImages[topic] || "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80"
}

