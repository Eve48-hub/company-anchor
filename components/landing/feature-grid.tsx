import { Bell, BookmarkSimple, ChartLineUp, Database, MagnifyingGlass, ShieldCheck } from "@phosphor-icons/react/dist/ssr"

const features = [
  { icon: MagnifyingGlass, title: "기업 통합검색", text: "회사명과 별칭으로 원하는 기업을 빠르게 찾습니다." },
  { icon: ChartLineUp, title: "핵심 재무 무료", text: "매출·영업이익·순이익과 최근 추이를 무료로 확인합니다." },
  { icon: Database, title: "출처가 보이는 데이터", text: "기준연도·업데이트일·연결/별도 여부를 함께 표시합니다." },
  { icon: BookmarkSimple, title: "관심기업 저장", text: "다시 보고 싶은 기업을 저장하고 비교할 준비를 합니다." },
  { icon: Bell, title: "변화 알림", text: "관심기업의 공시·재무 변화를 놓치지 않게 확장합니다." },
  { icon: ShieldCheck, title: "과장 없는 정보", text: "0원·적자·정보 없음·미수집을 명확히 구분합니다." },
]

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-[1184px] px-4 py-24 sm:px-6 lg:py-32">
      <div className="mb-12 grid gap-5 lg:grid-cols-2 lg:items-end">
        <div><p className="text-sm font-medium text-[var(--accent-hover)]">무료 기업정보</p><h2 className="mt-3 text-3xl font-normal tracking-[-0.03em] sm:text-4xl">검색부터 재방문까지</h2></div>
        <p className="max-w-xl text-base leading-7 text-[var(--foreground-secondary)] lg:justify-self-end">필요한 기능만 선명하게 제공합니다. 화려한 효과보다 출처, 기준일, 숫자의 의미를 우선합니다.</p>
      </div>
      <div className="grid overflow-hidden rounded-xl border border-[var(--border-subtle)] md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }) => (
          <article key={title} className="min-h-52 border-b border-r border-[var(--border-subtle)] bg-white p-6 last:border-b-0">
            <Icon className="h-5 w-5 text-[var(--foreground)]" />
            <h3 className="mt-10 text-lg font-medium tracking-tight">{title}</h3>
            <p className="mt-3 max-w-sm text-sm leading-6 text-[var(--foreground-secondary)]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
