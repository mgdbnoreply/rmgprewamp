import type React from "react"
import type { Metadata } from "next/font/google"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"

const _geist = Geist({ subsets: ["latin"] })
const _geistMono = Geist_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Retro Mobile Gaming Project",
  description: "Preserving Mobile Gaming History • 1975-2008",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <div className="fixed inset-0 w-full h-full -z-10">
          <div
            className="absolute inset-0"
            style={{
              background: "linear-gradient(to bottom right, #000000, #0a0a0a, #000000)",
            }}
          ></div>
          {/* Floating animated diagonal lines pattern */}
          <div className="absolute inset-0 opacity-5">
            <div
              className="absolute inset-0 animate-slideBackground"
              style={{
                backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(255,255,255,.02) 35px, rgba(255,255,255,.02) 70px)`,
              }}
            ></div>
          </div>
        </div>

        {children}
        <Analytics />
      </body>
    </html>
  )
}
