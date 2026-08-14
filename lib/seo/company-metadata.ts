import type { Metadata } from "next"

import type { Company } from "@/lib/companies/types"
import { absoluteUrl } from "../site"

export type CompanyPageKind = "profile" | "financials"

export function getCompanyIndexability(company: Company): { index: boolean; follow: boolean } {
  const hasCoreIdentity = Boolean(company.name && company.industry && company.location && company.description)
  const hasFinancialSource = company.financials.length > 0 && Boolean(company.source.label)
  const indexable = company.source.indexingApproved && !company.source.isSample && hasCoreIdentity && hasFinancialSource
  return { index: indexable, follow: indexable }
}

export function buildCompanyMetadata(company: Company, kind: CompanyPageKind): Metadata {
  const latestYear = company.financials.length > 0
    ? Math.max(...company.financials.map((record) => record.year))
    : undefined
  const isFinancials = kind === "financials"
  const pathname = isFinancials ? `/company/${company.slug}/financials/` : `/company/${company.slug}/`
  const title = isFinancials
    ? `${company.name} - ${latestYear ?? "최근"}년 재무 | 매출·영업이익·재무제표`
    : `${company.name} - 기업정보 | 매출·재무·기본정보`
  const description = isFinancials
    ? `${company.name}의 연도별 매출, 영업이익, 당기순이익, 자산·부채·자본과 데이터 출처를 확인하세요.`
    : `${company.name} 기업정보입니다. 소재지 ${company.location}, 업종 ${company.industry}. 기업 기본정보와 최근 재무정보를 확인하세요.`

  return {
    title,
    description,
    alternates: { canonical: absoluteUrl(pathname) },
    robots: getCompanyIndexability(company),
  }
}
