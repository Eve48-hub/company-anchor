import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CompanyProfile } from "@/components/company/company-profile"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { allCompanies } from "@/lib/companies/data"
import { getCompanyBySlug } from "@/lib/companies/repository"
import { buildCompanyMetadata } from "@/lib/seo/company-metadata"

export function generateStaticParams() {
  return allCompanies.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(allCompanies, slug)
  if (!company) return { title: "기업을 찾을 수 없습니다 | 기업앵커", robots: { index: false, follow: false } }
  return buildCompanyMetadata(company, "profile")
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const company = getCompanyBySlug(allCompanies, slug)
  if (!company) notFound()
  return <div className="min-h-screen bg-background"><Header /><CompanyProfile company={company} /><Footer /></div>
}
