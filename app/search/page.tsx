import type { Metadata } from "next"

import { CompanySearch } from "@/components/search/company-search"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"

export const metadata: Metadata = { title: "기업 검색 | 기업앵커", description: "회사명으로 기업 기본정보와 최근 재무 샘플을 검색해 보세요." }

export default function SearchPage() {
  return <div className="min-h-screen bg-background"><Header /><main className="mx-auto min-h-[calc(100vh-10rem)] max-w-5xl px-4 pb-24 pt-36 sm:px-6"><p className="text-sm font-medium text-[var(--color-keppel-400)]">COMPANY SEARCH</p><h1 className="mt-3 text-4xl font-semibold tracking-tight sm:text-6xl">기업을 찾아보세요</h1><p className="mt-5 max-w-2xl text-[var(--color-baltic-sea-400)]">기업명·영문명·별칭으로 검색합니다. 현재는 정보구조 검증을 위한 샘플 기업만 제공합니다.</p><div className="mt-10"><CompanySearch /></div></main><Footer /></div>
}
