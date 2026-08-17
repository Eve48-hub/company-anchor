import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans" })
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" })

export const metadata: Metadata = {
  metadataBase: new URL("https://eve48-hub.github.io/company-anchor/"),
  title: { default: "기업앵커 | 기업을 읽는 가장 빠른 기준점", template: "%s | 기업앵커" },
  description: "기업 기본정보와 최근 재무정보를 출처·기준일과 함께 확인하는 무료 기업정보 서비스입니다.",
  alternates: { canonical: "https://eve48-hub.github.io/company-anchor/" },
  openGraph: {
    title: "기업앵커",
    description: "기업을 읽는 가장 빠른 기준점",
    type: "website",
  },
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="ko"><body className={`${geist.variable} ${geistMono.variable} font-sans antialiased`}><a href="#main-content" className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-[var(--color-keppel-300)] px-4 py-2 text-sm font-semibold text-[var(--color-baltic-sea-950)] transition focus:translate-y-0">본문 바로가기</a>{children}</body></html>
}
