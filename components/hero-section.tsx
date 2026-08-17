import Link from "next/link"
import { ArrowRight, Buildings, Check, MagnifyingGlass } from "@phosphor-icons/react/dist/ssr"

import { Button } from "@/components/ui/button"

const metrics = [
  ["매출", "54.2억원"],
  ["영업이익", "3.1억원"],
  ["당기순이익", "2.5억원"],
]

export function HeroSection() {
  return (
    <section className="border-b border-[var(--border-subtle)] pt-16 sm:pt-20">
      <div className="mx-auto max-w-[1184px] px-4 sm:px-6">
        <div className="grid gap-10 py-20 lg:grid-cols-[1fr_0.9fr] lg:items-center lg:gap-16 lg:py-28">
          <div>
            <p className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-[var(--accent-hover)]">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
              출처가 보이는 무료 기업정보
            </p>
            <h1 className="max-w-3xl text-[clamp(2.75rem,6vw,4.75rem)] font-normal leading-[1.02] tracking-[-0.045em]">
              기업을 읽는 기준을
              <span className="block text-[var(--accent)]">더 단순하게.</span>
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-[var(--foreground-secondary)]">
              기업 기본정보와 최근 재무를 한곳에서 확인합니다. 데이터의 출처와 기준일, 연결·별도 여부까지 숨기지 않습니다.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button asChild size="lg" className="rounded-md border border-[var(--accent-hover)] bg-[var(--accent)] px-5 font-medium text-[var(--accent-foreground)] shadow-none hover:bg-[var(--accent-hover)] hover:text-white">
                <Link href="/search"><MagnifyingGlass className="h-4 w-4" />기업 검색하기</Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="rounded-md border-[var(--border-strong)] bg-white px-5 font-medium shadow-none hover:bg-[var(--surface-subtle)]">
                <Link href="/company/doitnow">샘플 기업 보기<ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>
            <p className="mt-5 text-xs text-[var(--foreground-muted)]">공식 데이터와 화면 검증용 샘플을 명확히 구분합니다.</p>
          </div>

          <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[var(--shadow-panel)]">
            <div className="flex items-center justify-between border-b border-[var(--border-subtle)] px-5 py-3.5">
              <div className="flex items-center gap-2 text-sm font-medium"><Buildings className="h-4 w-4" />기업 요약</div>
              <span className="rounded-full border border-amber-200 bg-amber-50 px-2.5 py-1 text-[11px] text-amber-800">샘플 데이터</span>
            </div>
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3 rounded-md border border-[var(--border)] bg-[var(--surface-subtle)] px-4 py-3 text-sm">
                <MagnifyingGlass className="h-4 w-4 text-[var(--foreground-muted)]" />
                <span>주식회사 두잇나우</span>
              </div>
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs text-[var(--foreground-muted)]">2025 재무 요약</p>
                  <h2 className="mt-1 text-xl font-medium tracking-tight">주식회사 두잇나우</h2>
                  <p className="mt-1 text-sm text-[var(--foreground-secondary)]">정보서비스 · 대한민국</p>
                </div>
                <span className="inline-flex items-center gap-1 text-xs text-[var(--accent-hover)]"><Check className="h-4 w-4" />출처 표시</span>
              </div>
              <div className="mt-6 grid grid-cols-3 divide-x divide-[var(--border-subtle)] rounded-lg border border-[var(--border-subtle)]">
                {metrics.map(([label, value]) => (
                  <div key={label} className="min-w-0 p-4">
                    <p className="truncate text-xs text-[var(--foreground-muted)]">{label}</p>
                    <p className="mt-2 truncate font-mono text-sm font-medium">{value}</p>
                  </div>
                ))}
              </div>
              <div className="surface-grid mt-5 rounded-lg border border-[var(--border-subtle)] p-5">
                <p className="text-xs text-[var(--foreground-muted)]">데이터 원칙</p>
                <p className="mt-2 text-sm leading-6 text-[var(--foreground-secondary)]">0원, 적자, 정보 없음, 미수집을 서로 다른 상태로 표시합니다.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
