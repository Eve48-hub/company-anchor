"use client"

import Link from "next/link"
import { useEffect, useState } from "react"
import { ArrowRight, CheckCircle, MagnifyingGlass, TrendUp } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"

const steps = ["기업 식별정보 확인", "최신 재무연도 확인", "데이터 출처 검증"]

export function HeroSection() {
  const [visibleSteps, setVisibleSteps] = useState(0)

  useEffect(() => {
    const timers = steps.map((_, index) => window.setTimeout(() => setVisibleSteps(index + 1), 600 + index * 650))
    return () => timers.forEach(window.clearTimeout)
  }, [])

  return (
    <section className="relative min-h-screen overflow-hidden pb-20 pt-20">
      <div aria-hidden className="absolute inset-0 -left-20 -right-20 -top-20 overflow-hidden">
        <div className="grid grid-cols-10 gap-4 p-4 opacity-25 sm:grid-cols-15 lg:grid-cols-20">
          {Array.from({ length: 240 }).map((_, index) => (
            <span key={index} className={`aspect-square rounded-sm border transition-all duration-1000 ${[5, 31, 68, 103, 139, 178, 215].includes(index) ? "border-[var(--color-keppel-600)] bg-[var(--color-keppel-500)] shadow-[0_0_28px_var(--color-keppel-700)]" : "border-[var(--color-baltic-sea-800)]"}`} />
          ))}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
      </div>

      <div className="relative mx-auto grid min-h-[calc(100vh-5rem)] max-w-[1400px] items-center gap-14 px-4 py-16 sm:px-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20 lg:px-12">
        <div>
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[var(--color-keppel-700)] bg-[var(--color-keppel-950)] px-3 py-1 text-xs text-[var(--color-keppel-300)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-keppel-400)]" />
            기업정보, 이제 무료로
          </div>
          <h1 className="text-4xl font-bold leading-[1.08] tracking-tight text-[var(--color-baltic-sea-50)] sm:text-5xl lg:text-7xl">
            기업을 읽는<br />가장 빠른<br /><span className="text-[var(--color-keppel-400)]">기준점</span>
          </h1>
          <p className="mt-7 max-w-xl text-lg leading-relaxed text-[var(--color-baltic-sea-300)]">
            기업 기본정보와 최근 재무를 한곳에서 확인하고, 관심기업의 변화를 놓치지 마세요. 핵심 정보는 가입 후에도 무료입니다.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg" className="bg-[var(--color-keppel-500)] font-semibold text-[var(--color-keppel-950)] hover:bg-[var(--color-keppel-400)]">
              <Link href="/search"><MagnifyingGlass weight="bold" className="h-4 w-4" />기업 검색하기</Link>
            </Button>
            <Button asChild size="lg" variant="ghost" className="text-[var(--color-baltic-sea-200)] hover:bg-[var(--color-baltic-sea-900)] hover:text-white">
              <Link href="/company/doitnow">샘플 기업 보기<ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <p className="mt-5 text-xs text-[var(--color-baltic-sea-500)]">현재 1차 UI 검증 버전 · 모든 재무 수치는 샘플로 표시됩니다.</p>
        </div>

        <div className="w-full overflow-hidden rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)] shadow-2xl">
          <div className="flex items-center gap-2 border-b border-[var(--color-baltic-sea-800)] px-5 py-4">
            <div className="flex gap-1.5"><span className="h-3 w-3 rounded-full bg-[var(--color-baltic-sea-700)]" /><span className="h-3 w-3 rounded-full bg-[var(--color-baltic-sea-700)]" /><span className="h-3 w-3 rounded-full bg-[var(--color-baltic-sea-700)]" /></div>
            <span className="flex-1 text-center font-mono text-xs text-[var(--color-baltic-sea-500)]">company search</span>
          </div>
          <div className="p-5 sm:p-7">
            <div className="flex items-center gap-3 rounded-xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] px-4 py-3 font-mono text-sm">
              <MagnifyingGlass className="h-4 w-4 text-[var(--color-keppel-400)]" />
              <span className="text-[var(--color-baltic-sea-200)]">주식회사 두잇나우</span>
            </div>
            <div className="mt-5 space-y-2 font-mono text-sm">
              {steps.map((step, index) => (
                <div key={step} className={`flex items-center gap-2 transition-all duration-500 ${index < visibleSteps ? "translate-x-0 opacity-100" : "translate-x-2 opacity-20"}`}>
                  <CheckCircle weight="fill" className="h-4 w-4 text-[var(--color-keppel-500)]" />
                  <span className="text-[var(--color-baltic-sea-400)]">{step}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-[var(--color-keppel-800)] bg-[var(--color-keppel-950)] p-5">
              <div className="mb-5 flex items-start justify-between gap-4">
                <div><p className="text-xs uppercase tracking-widest text-[var(--color-keppel-400)]">2025 재무 요약</p><h2 className="mt-1 text-xl font-semibold">주식회사 두잇나우</h2></div>
                <span className="rounded-full border border-amber-700/60 bg-amber-950/50 px-2.5 py-1 text-[11px] text-amber-300">샘플 데이터</span>
              </div>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[['매출','54.2억원'],['영업이익','3.1억원'],['당기순이익','2.5억원']].map(([label, value]) => (
                  <div key={label} className="rounded-lg border border-[var(--color-keppel-900)] bg-background/30 p-3"><p className="text-xs text-[var(--color-baltic-sea-500)]">{label}</p><p className="mt-1 font-mono text-sm text-[var(--color-baltic-sea-100)]">{value}</p></div>
                ))}
              </div>
              <div className="mt-4 flex items-center gap-2 text-xs text-[var(--color-keppel-300)]"><TrendUp className="h-4 w-4" />출처·기준일·연결/별도 구분을 필수 표시합니다.</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
