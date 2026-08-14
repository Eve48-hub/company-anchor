"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"

import { BrandMark } from "@/components/brand-mark"
import { Button } from "@/components/ui/button"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-colors ${scrolled ? "border-b border-[var(--color-baltic-sea-800)] bg-background/90 backdrop-blur-xl" : "bg-transparent"}`}>
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between px-4 sm:px-6 lg:px-12">
        <BrandMark />
        <nav aria-label="주요 메뉴" className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 rounded-full border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)]/80 p-1.5 backdrop-blur-md md:flex">
          <Link href="/search" className="rounded-full bg-[var(--color-baltic-sea-800)] px-4 py-1.5 text-sm text-[var(--color-baltic-sea-100)]">기업검색</Link>
          <Link href="/#features" className="px-4 py-1.5 text-sm text-[var(--color-baltic-sea-400)] transition-colors hover:text-[var(--color-baltic-sea-100)]">무료정보</Link>
          <Link href="/#data" className="px-4 py-1.5 text-sm text-[var(--color-baltic-sea-400)] transition-colors hover:text-[var(--color-baltic-sea-100)]">데이터원칙</Link>
        </nav>
        <Button asChild className="rounded-full bg-[var(--color-keppel-400)] px-5 text-[var(--color-keppel-950)] hover:bg-[var(--color-keppel-300)]">
          <Link href="/search"><MagnifyingGlass weight="bold" className="h-4 w-4" />기업 검색</Link>
        </Button>
      </div>
    </header>
  )
}
