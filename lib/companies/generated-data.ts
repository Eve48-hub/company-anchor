import type { Company } from "./types"

// `npm run data:fetch`가 공식 API 응답으로 이 파일을 교체합니다.
// 인증키가 없는 개발·PR 환경에서는 빈 배열을 유지합니다.
export const officialCompanies: Company[] = []

export const officialDataBuild = {
  status: "credentials-required" as const,
  generatedAt: null as string | null,
  targetCount: 0,
}
