"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"

import { BrandMark } from "@/components/brand-mark"
import { Button } from "@/components/ui/button"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition-colors ${scrolled ? "border-[var(--border-subtle)] bg-white/95" : "border-transparent bg-white"}`}>
      <div className="mx-auto flex h-16 max-w-[1184px] items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <BrandMark />
          <nav aria-label="주요 메뉴" className="hidden items-center gap-6 md:flex">
            <Link href="/search" className="text-sm font-medium text-[var(--foreground)]">기업검색</Link>
            <Link href="/#features" className="text-sm text-[var(--foreground-secondary)] transition-colors hover:text-[var(--foreground)]">무료정보</Link>
            <Link href="/#data" className="text-sm text-[var(--foreground-secondary)] transition-colors hover:text-[var(--foreground)]">데이터원칙</Link>
          </nav>
        </div>
        <Button asChild size="sm" className="rounded-md border border-[var(--accent-hover)] bg-[var(--accent)] px-4 text-[var(--accent-foreground)] shadow-none hover:bg-[var(--accent-hover)] hover:text-white">
          <Link href="/search"><MagnifyingGlass className="h-4 w-4" />기업 검색</Link>
        </Button>
      </div>
    </header>
  )
}
