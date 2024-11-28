import { Inter as FontSans } from "next/font/google"
import { Orbitron } from "next/font/google"

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const fontHeading = Orbitron({
  subsets: ["latin"],
  variable: "--font-heading",
})

