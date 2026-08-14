import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { FinancialExplorer } from "@/components/financial/financial-explorer"
import { getCompanyBySlug } from "@/lib/companies/repository"
import { sampleCompanies } from "@/lib/companies/sample-data"
import { buildCompanyMetadata } from "@/lib/seo/company-metadata"

export function generateStaticParams() {
  return sampleCompanies.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(sampleCompanies, slug)
  return company ? buildCompanyMetadata(company, "financials") : { title: "기업을 찾을 수 없습니다 | 기업앵커", robots: { index: false, follow: false } }
}

export default async function CompanyFinancialsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const company = getCompanyBySlug(sampleCompanies, slug)
  if (!company) notFound()

  return <div className="min-h-screen bg-background"><Header /><main className="mx-auto max-w-[1400px] px-4 pb-20 pt-32 sm:px-6 lg:px-12"><FinancialExplorer company={company} /></main><Footer /></div>
}
