import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CompanyHeader } from "@/components/company/company-header"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { FinancialExplorer } from "@/components/financial/financial-explorer"
import { allCompanies } from "@/lib/companies/data"
import { getCompanyBySlug } from "@/lib/companies/repository"
import { buildCompanyMetadata } from "@/lib/seo/company-metadata"

export function generateStaticParams() {
  return allCompanies.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(allCompanies, slug)
  return company ? buildCompanyMetadata(company, "financials") : { title: "기업을 찾을 수 없습니다 | 기업앵커", robots: { index: false, follow: false } }
}

export default async function CompanyFinancialsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const company = getCompanyBySlug(allCompanies, slug)
  if (!company) notFound()

  return <div className="min-h-screen bg-background"><Header /><CompanyHeader company={company} activeTab="financials" /><main id="main-content" className="mx-auto max-w-[1184px] px-4 py-10 sm:px-6"><FinancialExplorer company={company} /></main><Footer /></div>
}
