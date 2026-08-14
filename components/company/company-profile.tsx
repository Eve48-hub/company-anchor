import Link from "next/link"
import { Bell, BookmarkSimple, Buildings, Export, Info, TrendDown, TrendUp } from "@phosphor-icons/react/dist/ssr"

import type { Company } from "@/lib/companies/types"
import { formatKoreanCurrency, formatYearOverYear } from "@/lib/format"

const tabs = ["대시보드", "투자 유치", "재무", "제품·서비스"]

export function CompanyProfile({ company }: { company: Company }) {
  const latest = company.financials[0]
  const previous = company.financials[1]
  const metrics = [
    ["매출", latest?.revenue ?? null, previous?.revenue ?? null],
    ["영업이익", latest?.operatingIncome ?? null, previous?.operatingIncome ?? null],
    ["당기순이익", latest?.netIncome ?? null, previous?.netIncome ?? null],
    ["자산", latest?.assets ?? null, previous?.assets ?? null],
    ["부채", latest?.liabilities ?? null, previous?.liabilities ?? null],
    ["자본", latest?.equity ?? null, previous?.equity ?? null],
  ] as const

  return <>
    <section className="border-b border-[var(--color-baltic-sea-800)] pt-28">
      <div className="mx-auto max-w-[1400px] px-4 pb-8 sm:px-6 lg:px-12">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex gap-5"><span className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[var(--color-baltic-sea-100)]"><Buildings weight="fill" className="h-8 w-8 text-[var(--color-baltic-sea-950)]" /></span><div><div className="flex flex-wrap items-center gap-2"><h1 className="text-3xl font-semibold sm:text-4xl">{company.name}</h1><span className="rounded-full border border-[var(--color-keppel-800)] bg-[var(--color-keppel-950)] px-2.5 py-1 text-xs text-[var(--color-keppel-300)]">{company.status}</span><span className="rounded-full border border-amber-800/60 bg-amber-950/50 px-2.5 py-1 text-xs text-amber-300">샘플 데이터</span></div><p className="mt-2 text-sm text-[var(--color-baltic-sea-400)]">{company.englishName} · {company.industry} · {company.location}</p></div></div>
          <div className="flex flex-wrap gap-2"><button className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-baltic-sea-700)] px-4 text-sm text-[var(--color-baltic-sea-200)]"><BookmarkSimple className="h-4 w-4" />관심기업</button><button className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-baltic-sea-700)] px-4 text-sm text-[var(--color-baltic-sea-200)]"><Bell className="h-4 w-4" />알림</button><button className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-baltic-sea-700)]" aria-label="공유"><Export className="h-4 w-4" /></button></div>
        </div>
        <nav className="mt-9 flex gap-7 overflow-x-auto" aria-label="기업 내부 메뉴">{tabs.map((tab, index) => <span key={tab} className={`whitespace-nowrap border-b-2 pb-4 text-sm ${index === 0 ? "border-[var(--color-keppel-400)] text-[var(--color-baltic-sea-100)]" : "border-transparent text-[var(--color-baltic-sea-500)]"}`}>{tab}</span>)}</nav>
      </div>
    </section>

    <div className="mx-auto grid max-w-[1400px] gap-6 px-4 py-10 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-12">
      <main className="min-w-0 space-y-6">
        <section className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-6"><p className="text-sm text-[var(--color-keppel-400)]">기업 개요</p><h2 className="mt-3 text-2xl font-semibold">{company.name}는 {company.industry} 기업입니다</h2><p className="mt-4 leading-relaxed text-[var(--color-baltic-sea-400)]">{company.description}</p></section>

        <section><div className="mb-4 flex items-end justify-between"><div><p className="text-sm text-[var(--color-keppel-400)]">주요 정보</p><h2 className="mt-1 text-2xl font-semibold">{latest?.year ?? "—"}년 재무 요약</h2></div><span className="text-xs text-[var(--color-baltic-sea-500)]">단위: 원 · {latest?.statementType}</span></div><div className="grid grid-cols-2 gap-3 md:grid-cols-3">{metrics.map(([label,value,prior]) => { const change = formatYearOverYear(value, prior); const up = change.startsWith("+"); return <article key={label} className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-5"><p className="text-xs text-[var(--color-baltic-sea-500)]">{label}</p><p className="mt-3 font-mono text-lg font-semibold">{formatKoreanCurrency(value)}</p><p className={`mt-2 flex items-center gap-1 text-xs ${up ? "text-[var(--color-keppel-400)]" : change.startsWith("-") ? "text-rose-400" : "text-[var(--color-baltic-sea-500)]"}`}>{up ? <TrendUp className="h-3.5 w-3.5" /> : change.startsWith("-") ? <TrendDown className="h-3.5 w-3.5" /> : null}{change} 전년 대비</p></article>})}</div></section>

        <section className="overflow-hidden rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)]"><div className="flex flex-col gap-2 border-b border-[var(--color-baltic-sea-800)] p-6 sm:flex-row sm:items-center sm:justify-between"><div><p className="text-sm text-[var(--color-keppel-400)]">재무</p><h2 className="mt-1 text-2xl font-semibold">최근 재무 추이</h2></div><div className="flex gap-2 text-xs"><span className="rounded-full bg-[var(--color-baltic-sea-800)] px-3 py-1.5">최근 3년</span><span className="rounded-full border border-[var(--color-baltic-sea-700)] px-3 py-1.5">손익계산서</span></div></div><div className="overflow-x-auto"><table className="w-full min-w-[720px] text-sm"><caption className="sr-only">최근 3개년 재무 샘플</caption><thead><tr className="border-b border-[var(--color-baltic-sea-800)] text-left text-xs text-[var(--color-baltic-sea-500)]"><th className="px-6 py-4">연도</th><th className="px-6 py-4">매출</th><th className="px-6 py-4">영업이익</th><th className="px-6 py-4">당기순이익</th><th className="px-6 py-4">구분</th></tr></thead><tbody>{company.financials.map((record) => <tr key={record.year} className="border-b border-[var(--color-baltic-sea-800)] last:border-0"><th className="px-6 py-4 text-left font-mono">{record.year}</th><td className="px-6 py-4 font-mono">{formatKoreanCurrency(record.revenue)}</td><td className="px-6 py-4 font-mono">{formatKoreanCurrency(record.operatingIncome)}</td><td className="px-6 py-4 font-mono">{formatKoreanCurrency(record.netIncome)}</td><td className="px-6 py-4 text-amber-300">{record.statementType}</td></tr>)}</tbody></table></div></section>

        <section className="rounded-2xl border border-dashed border-[var(--color-baltic-sea-700)] p-8 text-center"><p className="text-sm text-[var(--color-baltic-sea-400)]">투자 유치·제품·뉴스·유사기업 섹션은 공식 데이터 검증 후 같은 위치에 추가됩니다.</p></section>
      </main>

      <aside className="space-y-4"><section className="rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-5"><h2 className="font-semibold">기업 기본정보</h2><dl className="mt-5 space-y-4 text-sm">{[["설립일",company.foundedAt],["업종",company.industry],["지역",company.location],["홈페이지",company.website]].map(([term,value]) => <div key={term}><dt className="text-xs text-[var(--color-baltic-sea-500)]">{term}</dt><dd className="mt-1 break-all text-[var(--color-baltic-sea-200)]">{value}</dd></div>)}</dl></section><section className="rounded-2xl border border-[var(--color-keppel-900)] bg-[var(--color-keppel-950)] p-5"><div className="flex items-center gap-2 text-[var(--color-keppel-300)]"><Info className="h-4 w-4" /><h2 className="text-sm font-medium">데이터 안내</h2></div><p className="mt-3 text-xs leading-relaxed text-[var(--color-baltic-sea-400)]">{company.source.label}. 실제 API 연동 전이며 화면 구조 검증용으로만 사용합니다.</p><dl className="mt-4 space-y-2 text-xs"><div className="flex justify-between"><dt className="text-[var(--color-baltic-sea-500)]">기준일</dt><dd>{company.source.asOf}</dd></div><div className="flex justify-between"><dt className="text-[var(--color-baltic-sea-500)]">실제 데이터</dt><dd>아니오</dd></div></dl></section><Link href="/search" className="block rounded-xl border border-[var(--color-baltic-sea-700)] p-4 text-center text-sm transition hover:border-[var(--color-keppel-700)]">다른 기업 검색</Link></aside>
    </div>
  </>
}
