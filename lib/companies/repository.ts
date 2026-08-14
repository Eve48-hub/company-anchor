import type { Company } from "./types"

export function searchCompanies(companies: readonly Company[], rawQuery: string): Company[] {
  const query = rawQuery.trim().toLocaleLowerCase("ko-KR")
  if (!query) return [...companies]

  return companies.filter((company) => {
    const searchableText = [company.name, company.englishName, ...company.aliases, company.industry]
      .join(" ")
      .toLocaleLowerCase("ko-KR")

    return searchableText.includes(query)
  })
}

export function getCompanyBySlug(companies: readonly Company[], slug: string): Company | undefined {
  return companies.find((company) => company.slug === slug)
}
