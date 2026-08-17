import type { Company } from "../types"

const FSC_API_BASE = "https://apis.data.go.kr/1160100/service/GetCorpBasicInfoService_V2/getCorpOutline_V2"
const FSC_SOURCE_URL = "https://www.data.go.kr/data/15043184/openapi.do"

export interface FscCompanyItem {
  basDt?: string
  crno?: string
  corpNm?: string
  corpEnsnNm?: string
  enpRprFnm?: string
  corpRegMrktDcdNm?: string
  enpBsadr?: string
  enpDtadr?: string
  enpHmpgUrl?: string
  sicNm?: string
  enpEstbDt?: string
  enpEmpeCnt?: string
  enpMainBizNm?: string
  enpStacMm?: string
  fssCorpUnqNo?: string
  [key: string]: unknown
}

function decodeServiceKeyOnce(serviceKey: string) {
  try {
    return decodeURIComponent(serviceKey)
  } catch {
    return serviceKey
  }
}

export function buildFscCompanyUrl({
  serviceKey,
  corpName,
}: {
  serviceKey: string
  corpName: string
}) {
  const params = new URLSearchParams({
    ServiceKey: decodeServiceKeyOnce(serviceKey.trim()),
    pageNo: "1",
    numOfRows: "100",
    resultType: "json",
    corpNm: corpName.trim(),
  })
  return `${FSC_API_BASE}?${params.toString()}`
}

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null
}

export function parseFscCompanyResponse(payload: unknown): FscCompanyItem[] {
  const root = record(payload)
  const response = record(root?.response) ?? root
  const header = record(response?.header)
  const code = String(header?.resultCode ?? "")
  if (code && code !== "00" && code !== "0") {
    throw new Error(String(header?.resultMsg ?? `금융위원회 API 오류: ${code}`))
  }

  const body = record(response?.body)
  const items = record(body?.items)
  const item = items?.item
  if (!item) return []
  return (Array.isArray(item) ? item : [item]).filter((value): value is FscCompanyItem => record(value) !== null)
}

function date(value: string | undefined) {
  const digits = value?.replace(/\D/g, "") ?? ""
  return digits.length === 8
    ? `${digits.slice(0, 4)}-${digits.slice(4, 6)}-${digits.slice(6, 8)}`
    : "정보 없음"
}

function text(value: string | undefined, fallback = "정보 없음") {
  return value?.trim() || fallback
}

function integer(value: string | undefined) {
  if (!value?.trim()) return null
  const parsed = Number(value.replace(/,/g, ""))
  return Number.isFinite(parsed) ? parsed : null
}

function website(value: string | undefined) {
  const trimmed = value?.trim() ?? ""
  if (!trimmed) return ""
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`
}

export function mapFscCompany({
  item,
  slug,
  retrievedAt,
}: {
  item: FscCompanyItem
  slug: string
  retrievedAt: string
}): Company {
  const mainBusiness = text(item.enpMainBizNm)
  return {
    slug,
    name: text(item.corpNm),
    englishName: text(item.corpEnsnNm, "영문명 정보 없음"),
    aliases: [],
    status: "정보 없음",
    industry: text(item.sicNm),
    location: [item.enpBsadr?.trim(), item.enpDtadr?.trim()].filter(Boolean).join(" ") || "정보 없음",
    foundedAt: date(item.enpEstbDt),
    website: website(item.enpHmpgUrl),
    description: mainBusiness === "정보 없음"
      ? "금융위원회 기업기본정보에서 수집한 기업 개요입니다."
      : `주요 사업은 ${mainBusiness}입니다.`,
    representative: text(item.enpRprFnm),
    employeeCount: integer(item.enpEmpeCnt),
    market: text(item.corpRegMrktDcdNm),
    mainBusiness,
    fiscalMonth: integer(item.enpStacMm),
    source: {
      label: "금융위원회 기업기본정보",
      provider: "금융위원회",
      url: FSC_SOURCE_URL,
      asOf: date(item.basDt),
      retrievedAt,
      isSample: false,
      indexingApproved: false,
    },
    financials: [],
  }
}
