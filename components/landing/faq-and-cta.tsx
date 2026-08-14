import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

const faqs = [
  ["재무정보는 정말 무료인가요?", "핵심 재무정보는 가입 후에도 무료로 제공하는 것이 제품 원칙입니다."],
  ["지금 보이는 수치는 실제 데이터인가요?", "아닙니다. 1차 UI 검증 버전의 수치는 화면 구조를 확인하기 위한 샘플이며 모든 화면에 표시합니다."],
  ["어떤 출처를 사용하나요?", "OpenDART와 공공데이터 등 공식·허가된 API를 우선 검증합니다. 공개 범위는 사용권 확인 후 결정합니다."],
]

export function FaqAndCta() {
  return <><section className="mx-auto max-w-4xl px-4 py-24 sm:px-6">{faqs.map(([q,a]) => <details key={q} className="group border-b border-[var(--color-baltic-sea-800)] py-6"><summary className="cursor-pointer list-none text-lg font-medium">{q}<span className="float-right text-[var(--color-keppel-400)] group-open:rotate-45">+</span></summary><p className="mt-4 pr-10 leading-relaxed text-[var(--color-baltic-sea-400)]">{a}</p></details>)}</section><section className="mx-auto mb-12 max-w-[1400px] px-4 sm:px-6 lg:px-12"><div className="relative overflow-hidden rounded-3xl border border-[var(--color-keppel-800)] bg-[var(--color-keppel-950)] px-6 py-20 text-center"><div className="absolute inset-0 bg-[radial-gradient(circle_at_center,var(--color-keppel-900),transparent_65%)] opacity-70" /><div className="relative"><p className="text-sm text-[var(--color-keppel-300)]">COMPANY ANCHOR</p><h2 className="mt-4 text-3xl font-semibold sm:text-5xl">지금, 기업을 검색해 보세요</h2><p className="mx-auto mt-5 max-w-xl text-[var(--color-baltic-sea-300)]">무료 기업정보가 다시 찾고 싶은 B2B 기준점이 됩니다.</p><Button asChild size="lg" className="mt-8 bg-[var(--color-keppel-400)] text-[var(--color-keppel-950)] hover:bg-[var(--color-keppel-300)]"><Link href="/search">기업 검색하기<ArrowRight className="h-4 w-4" /></Link></Button></div></div></section></>
}
