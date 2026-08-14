import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { CompanyProfile } from "@/components/company/company-profile"
import { Footer } from "@/components/footer"
import { Header } from "@/components/header"
import { getCompanyBySlug } from "@/lib/companies/repository"
import { sampleCompanies } from "@/lib/companies/sample-data"

export function generateStaticParams() {
  return sampleCompanies.map((company) => ({ slug: company.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const company = getCompanyBySlug(sampleCompanies, slug)
  if (!company) return { title: "기업을 찾을 수 없습니다 | 기업앵커" }
  return { title: `${company.name} - 기업정보·재무 | 기업앵커`, description: `${company.name}의 기업 기본정보와 최근 재무 샘플을 확인하세요.` }
}

export default async function CompanyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const company = getCompanyBySlug(sampleCompanies, slug)
  if (!company) notFound()
  return <div className="min-h-screen bg-background"><Header /><CompanyProfile company={company} /><Footer /></div>
}
