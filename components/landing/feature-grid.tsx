import { Bell, BookmarkSimple, ChartLineUp, Database, MagnifyingGlass, ShieldCheck } from "@phosphor-icons/react/dist/ssr"

const features = [
  { icon: MagnifyingGlass, title: "기업 통합검색", text: "회사명과 별칭으로 원하는 기업을 빠르게 찾습니다." },
  { icon: ChartLineUp, title: "핵심 재무 무료", text: "매출·영업이익·순이익과 최근 추이를 무료로 확인합니다." },
  { icon: Database, title: "출처가 보이는 데이터", text: "기준연도·업데이트일·연결/별도 여부를 함께 표시합니다." },
  { icon: BookmarkSimple, title: "관심기업 저장", text: "다시 보고 싶은 기업을 저장하고 비교할 준비를 합니다." },
  { icon: Bell, title: "변화 알림", text: "관심기업의 공시·재무·뉴스 변화를 놓치지 않게 확장합니다." },
  { icon: ShieldCheck, title: "과장 없는 정보", text: "0원·적자·정보 없음·미수집을 명확히 구분합니다." },
]

export function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-12">
      <div className="mb-12 max-w-2xl"><p className="text-sm font-medium text-[var(--color-keppel-400)]">무료 기업정보의 새로운 기준</p><h2 className="mt-3 text-3xl font-semibold tracking-tight sm:text-5xl">검색부터 재방문까지,<br />하나의 흐름으로</h2></div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map(({ icon: Icon, title, text }, index) => (
          <article key={title} className={`group min-h-56 rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)] p-7 shadow-[var(--bento-shadow)] transition hover:-translate-y-1 hover:border-[var(--color-keppel-800)] ${index === 0 || index === 5 ? "lg:col-span-2" : ""}`}>
            <Icon weight="duotone" className="h-7 w-7 text-[var(--color-keppel-400)]" /><h3 className="mt-10 text-xl font-semibold">{title}</h3><p className="mt-3 max-w-md leading-relaxed text-[var(--color-baltic-sea-400)]">{text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
