import { Check, Hourglass, Warning } from "@phosphor-icons/react/dist/ssr"

const rows = [
  { area: "공시기업 재무", source: "OpenDART", status: "검증 예정", icon: Hourglass },
  { area: "사업자 상태", source: "공공데이터 공식 API", status: "검증 예정", icon: Hourglass },
  { area: "기업 식별·중복", source: "복수 공식 출처", status: "설계 중", icon: Warning },
  { area: "출처·기준일 모델", source: "기업앵커 데이터 계층", status: "1차 반영", icon: Check },
]

export function DataReadiness() {
  return (
    <section id="data" className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-12">
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
        <div><p className="text-sm font-medium text-[var(--color-keppel-400)]">DATA FIRST</p><h2 className="mt-3 text-3xl font-semibold leading-tight sm:text-5xl">코드보다 먼저<br />데이터 가능성을 봅니다</h2><p className="mt-6 leading-relaxed text-[var(--color-baltic-sea-400)]">API 사용권, 커버리지, 정확도와 비용을 먼저 검증합니다. 검증되지 않은 데이터는 실제 서비스에 공개하지 않습니다.</p></div>
        <div className="overflow-hidden rounded-2xl border border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-900)]">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3 border-b border-[var(--color-baltic-sea-800)] px-5 py-4 text-xs text-[var(--color-baltic-sea-500)]"><span>데이터</span><span>후보 출처</span><span>상태</span></div>
          {rows.map(({ area, source, status, icon: Icon }) => <div key={area} className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-b border-[var(--color-baltic-sea-800)] px-5 py-5 last:border-0"><strong className="text-sm">{area}</strong><span className="text-sm text-[var(--color-baltic-sea-400)]">{source}</span><span className="inline-flex items-center gap-1.5 text-xs text-[var(--color-keppel-300)]"><Icon className="h-4 w-4" />{status}</span></div>)}
        </div>
      </div>
    </section>
  )
}
