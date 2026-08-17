import { Bell, Buildings, NotePencil } from "@phosphor-icons/react/dist/ssr"
import Link from "next/link"

import { ShareCompanyButton } from "@/components/company/share-company-button"
import { WatchlistButton } from "@/components/company/watchlist-button"
import type { Company } from "@/lib/companies/types"

const ISSUE_BASE = "https://github.com/Eve48-hub/company-anchor/issues/new"

type ActiveTab = "dashboard" | "financials"

export function CompanyHeader({ company, activeTab }: { company: Company; activeTab: ActiveTab }) {
  const tabs = [
    { id: "dashboard", label: "대시보드", href: `/company/${company.slug}` },
    { id: "investment", label: "투자 유치", disabled: true },
    { id: "financials", label: "재무", href: `/company/${company.slug}/financials` },
    { id: "products", label: "제품·서비스", disabled: true },
  ] as const
  const correctionUrl = `${ISSUE_BASE}?${new URLSearchParams({ title: `[정보 수정] ${company.name}`, body: `기업: ${company.name}\n페이지: /company/${company.slug}\n\n수정할 정보와 확인 가능한 공개 근거 URL을 적어주세요.` })}`

  return <section className="border-b border-[var(--border-subtle)] pt-20 sm:pt-24">
    <div className="mx-auto max-w-[1184px] px-4 pb-0 sm:px-6">
      <div className="flex flex-col gap-6 pb-6 sm:gap-8 sm:pb-8 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-4 sm:gap-5">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface-subtle)] sm:h-16 sm:w-16"><Buildings className="h-6 w-6 text-[var(--foreground)] sm:h-8 sm:w-8" /></span>
          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-medium tracking-tight sm:text-4xl">{company.name}</h1>
              <span className="rounded-full border border-[var(--color-keppel-800)] bg-[var(--color-keppel-950)] px-2.5 py-1 text-xs text-[var(--color-keppel-300)]">{company.status}</span>
              <span className={`rounded-full border px-2.5 py-1 text-xs ${company.source.isSample ? "border-amber-200 bg-amber-50 text-amber-800" : "border-sky-200 bg-sky-50 text-sky-800"}`}>{company.source.isSample ? "샘플 데이터" : "공식 데이터"}</span>
            </div>
            <p className="mt-2 text-sm text-[var(--color-baltic-sea-400)]">{company.englishName} · {company.industry} · {company.location}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2">
          <WatchlistButton companySlug={company.slug} />
          <button type="button" disabled title="회원 알림 기능 준비 중" className="inline-flex h-10 cursor-not-allowed items-center gap-2 rounded-full border border-[var(--color-baltic-sea-800)] px-4 text-sm text-[var(--color-baltic-sea-600)]"><Bell className="h-4 w-4" />업데이트 알림</button>
          <a href={correctionUrl} target="_blank" rel="noreferrer" className="inline-flex h-10 items-center gap-2 rounded-full border border-[var(--color-baltic-sea-700)] px-4 text-sm text-[var(--color-baltic-sea-300)] transition hover:border-[var(--color-keppel-700)] hover:text-[var(--color-keppel-300)]"><NotePencil className="h-4 w-4" />정보 수정</a>
          <ShareCompanyButton companyName={company.name} />
        </div>
      </div>
      <nav className="flex gap-7 overflow-x-auto" aria-label="기업 내부 메뉴">
        {tabs.map((tab) => "href" in tab
          ? <Link key={tab.id} href={tab.href} aria-current={activeTab === tab.id ? "page" : undefined} className={`whitespace-nowrap border-b-2 pb-4 text-sm ${activeTab === tab.id ? "border-[var(--color-keppel-400)] text-[var(--color-baltic-sea-100)]" : "border-transparent text-[var(--color-baltic-sea-400)] hover:text-[var(--color-keppel-300)]"}`}>{tab.label}</Link>
          : <span key={tab.id} aria-disabled="true" title="데이터 확보 후 제공" className="whitespace-nowrap border-b-2 border-transparent pb-4 text-sm text-[var(--color-baltic-sea-600)]">{tab.label}</span>)}
      </nav>
    </div>
  </section>
}
