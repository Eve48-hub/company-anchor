import type { Metadata } from "next"

import { CompanySearch } from "@/components/search/company-search"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { absoluteUrl } from "@/lib/site"

export const metadata: Metadata = {
  title: "기업 검색",
  description: "기업명·영문명·업종으로 기업앵커의 공식·샘플 기업정보를 구분해 검색하세요.",
  alternates: { canonical: absoluteUrl("/search/") },
  robots: { index: false, follow: false },
}

export default function SearchPage() {
  return <div className="min-h-screen bg-background"><Header /><main id="main-content" className="mx-auto min-h-[calc(100vh-10rem)] max-w-[960px] px-4 pb-24 pt-32 sm:px-6"><p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-hover)]">Company search</p><h1 className="mt-3 text-4xl font-normal tracking-[-0.035em] sm:text-5xl">기업을 찾아보세요</h1><p className="mt-5 max-w-2xl leading-7 text-[var(--foreground-secondary)]">기업명·영문명·별칭으로 검색합니다. 공식 API 데이터와 화면 검증용 샘플을 명확히 구분합니다.</p><div className="mt-10"><CompanySearch /></div></main><Footer /></div>
}
