import type { Company } from "./types"

export function mergeCompanyCatalog({
  official,
  sample,
}: {
  official: Company[]
  sample: Company[]
}) {
  const catalog = new Map<string, Company>()
  for (const company of official) catalog.set(company.slug, company)
  for (const company of sample) {
    if (!catalog.has(company.slug)) catalog.set(company.slug, company)
  }
  return Array.from(catalog.values()).sort((left, right) => Number(left.source.isSample) - Number(right.source.isSample))
}
