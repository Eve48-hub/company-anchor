import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  title: { default: "기업앵커 | 기업을 읽는 가장 빠른 기준점", template: "%s" },
  description: "기업 기본정보와 최근 재무를 무료로 확인하고 관심기업의 변화를 추적하세요.",
  metadataBase: new URL("https://eve48-hub.github.io/company-anchor/"),
  openGraph: {
    title: "기업앵커",
    description: "기업을 읽는 가장 빠른 기준점",
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}>{children}</body></html>
}
