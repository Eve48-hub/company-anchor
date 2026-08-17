import { readFile, rename, writeFile } from "node:fs/promises"
import { dirname, resolve } from "node:path"
import { fileURLToPath } from "node:url"

import { mapDartFinancials, type DartFinancialRow } from "../lib/companies/official/dart-financials.ts"
import { buildFscCompanyUrl, mapFscCompany, parseFscCompanyResponse } from "../lib/companies/official/fsc-company.ts"
import type { Company, DataSource } from "../lib/companies/types.ts"

interface Target {
  slug: string
  corpName: string
  businessYear: number
}

interface DartResponse {
  status?: string
  message?: string
  list?: DartFinancialRow[]
}

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..")
const targetPath = resolve(root, "config/official-company-targets.json")
const outputPath = resolve(root, "lib/companies/generated-data.ts")
const fscServiceKey = process.env.DATA_GO_KR_SERVICE_KEY?.trim()
const dartApiKey = process.env.OPEN_DART_API_KEY?.trim()
const retrievedAt = new Date().toISOString()

if (!fscServiceKey) {
  throw new Error("DATA_GO_KR_SERVICE_KEY가 없습니다. 공식 데이터 파일을 변경하지 않았습니다.")
}

async function fetchJson(url: string) {
  const response = await fetch(url, { signal: AbortSignal.timeout(20_000) })
  if (!response.ok) throw new Error(`공식 API HTTP 오류: ${response.status}`)
  return response.json() as Promise<unknown>
}

function normalizedName(value: string | undefined) {
  return value?.replace(/\s|주식회사|\(주\)|㈜/g, "").toLocaleLowerCase("ko-KR") ?? ""
}

function chooseCompany(items: ReturnType<typeof parseFscCompanyResponse>, corpName: string) {
  const expected = normalizedName(corpName)
  return items.find((item) => normalizedName(item.corpNm) === expected)
    ?? (items.length === 1 ? items[0] : null)
}

async function fetchDartFinancials(corpCode: string, businessYear: number) {
  if (!dartApiKey) return { records: [], source: undefined }

  for (const fsDiv of ["CFS", "OFS"] as const) {
    const params = new URLSearchParams({
      crtfc_key: dartApiKey,
      corp_code: corpCode,
      bsns_year: String(businessYear),
      reprt_code: "11011",
      fs_div: fsDiv,
    })
    const payload = await fetchJson(`https://opendart.fss.or.kr/api/fnlttSinglAcnt.json?${params}`) as DartResponse
    if (payload.status === "013") continue
    if (payload.status !== "000") throw new Error(payload.message || `OpenDART API 오류: ${payload.status ?? "unknown"}`)

    const statementType = fsDiv === "CFS" ? "연결" : "별도"
    const records = mapDartFinancials({ rows: payload.list ?? [], businessYear, statementType })
    if (records.length === 0) continue
    const source: DataSource = {
      label: "OpenDART 단일회사 주요계정",
      provider: "금융감독원 OpenDART",
      url: "https://opendart.fss.or.kr/guide/main.do?apiGrpCd=DS003",
      asOf: `${businessYear}-12-31`,
      retrievedAt,
      isSample: false,
      indexingApproved: false,
    }
    return { records, source }
  }

  return { records: [], source: undefined }
}

const targets = JSON.parse(await readFile(targetPath, "utf8")) as Target[]
const companies: Company[] = []

for (const target of targets) {
  const payload = await fetchJson(buildFscCompanyUrl({ serviceKey: fscServiceKey, corpName: target.corpName }))
  const item = chooseCompany(parseFscCompanyResponse(payload), target.corpName)
  if (!item) throw new Error(`${target.corpName}: 정확히 일치하는 금융위원회 기업개요를 찾지 못했습니다.`)

  const company = mapFscCompany({ item, slug: target.slug, retrievedAt })
  const corpCode = item.fssCorpUnqNo?.trim()
  if (corpCode) {
    const financial = await fetchDartFinancials(corpCode, target.businessYear)
    company.financials = financial.records
    company.financialSource = financial.source
  }
  companies.push(company)
}

const source = `import type { Company } from "./types"\n\n// 공식 API를 빌드 타임에 호출해 생성한 파일입니다. 인증키는 포함되지 않습니다.\nexport const officialCompanies: Company[] = ${JSON.stringify(companies, null, 2)}\n\nexport const officialDataBuild = ${JSON.stringify({
  status: dartApiKey ? "fsc-and-opendart" : "fsc-only",
  generatedAt: retrievedAt,
  targetCount: companies.length,
}, null, 2)}\n`
const temporaryPath = `${outputPath}.tmp`
await writeFile(temporaryPath, source, "utf8")
await rename(temporaryPath, outputPath)
console.log(`공식 기업 ${companies.length}개 생성 완료 (${dartApiKey ? "기업개요+재무" : "기업개요"})`)
