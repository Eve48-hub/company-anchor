import Link from "next/link"
import { ArrowRight } from "@phosphor-icons/react/dist/ssr"
import { Button } from "@/components/ui/button"

const faqs = [
  ["재무정보는 정말 무료인가요?", "핵심 재무정보는 가입 후에도 무료로 제공하는 것이 제품 원칙입니다."],
  ["지금 보이는 수치는 실제 데이터인가요?", "샘플 표시가 있는 수치는 화면 검증용입니다. 공식 API 데이터는 별도 배지와 출처로 구분합니다."],
  ["어떤 출처를 사용하나요?", "OpenDART와 금융위원회 공공데이터 등 공식·허가된 API를 우선 검증합니다."],
]

export function FaqAndCta() {
  return <>
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">{faqs.map(([q,a]) => <details key={q} className="group border-b border-[var(--border-subtle)] py-6"><summary className="cursor-pointer list-none text-base font-medium">{q}<span className="float-right text-[var(--foreground-muted)] group-open:rotate-45">+</span></summary><p className="mt-4 pr-10 text-sm leading-7 text-[var(--foreground-secondary)]">{a}</p></details>)}</section>
    <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-subtle)]"><div className="mx-auto flex max-w-[1184px] flex-col gap-8 px-4 py-20 sm:px-6 lg:flex-row lg:items-center lg:justify-between"><div><p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-hover)]">Company Anchor</p><h2 className="mt-3 text-3xl font-normal tracking-[-0.03em] sm:text-4xl">지금 필요한 기업부터 확인하세요.</h2><p className="mt-4 text-[var(--foreground-secondary)]">기업 기본정보와 최근 재무를 같은 기준으로 봅니다.</p></div><Button asChild size="lg" className="w-fit rounded-md border border-[var(--accent-hover)] bg-[var(--accent)] px-5 text-[var(--accent-foreground)] shadow-none hover:bg-[var(--accent-hover)] hover:text-white"><Link href="/search">기업 검색하기<ArrowRight className="h-4 w-4" /></Link></Button></div></section>
  </>
}
