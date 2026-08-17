import { Check, Hourglass, Warning } from "@phosphor-icons/react/dist/ssr"

const rows = [
  { area: "공시기업 재무", source: "OpenDART", status: "연결 대기", icon: Hourglass },
  { area: "기업 기본정보", source: "금융위원회 공식 API", status: "연결 대기", icon: Hourglass },
  { area: "기업 식별·중복", source: "복수 공식 출처", status: "검증 중", icon: Warning },
  { area: "출처·기준일 모델", source: "기업앵커 데이터 계층", status: "반영", icon: Check },
]

export function DataReadiness() {
  return (
    <section id="data" className="mx-auto max-w-[1184px] px-4 py-24 sm:px-6 lg:py-32">
      <div className="grid gap-12 lg:grid-cols-[0.78fr_1.22fr] lg:items-center">
        <div><p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-hover)]">Data first</p><h2 className="mt-3 text-3xl font-normal leading-tight tracking-[-0.03em] sm:text-4xl">코드보다 먼저<br />데이터 가능성을 봅니다</h2><p className="mt-6 max-w-md text-base leading-7 text-[var(--foreground-secondary)]">API 사용권, 커버리지, 정확도와 비용을 먼저 검증합니다. 검증되지 않은 데이터는 실제 정보처럼 공개하지 않습니다.</p></div>
        <div className="overflow-hidden rounded-xl border border-[var(--border)] bg-white shadow-[var(--shadow-panel)]">
          <div className="grid grid-cols-[1fr_1fr_auto] gap-3 border-b border-[var(--border-subtle)] bg-[var(--surface-subtle)] px-5 py-3.5 text-xs text-[var(--foreground-muted)]"><span>데이터</span><span>출처</span><span>상태</span></div>
          {rows.map(({ area, source, status, icon: Icon }) => <div key={area} className="grid grid-cols-[1fr_1fr_auto] items-center gap-3 border-b border-[var(--border-subtle)] px-5 py-5 last:border-0"><strong className="text-sm font-medium">{area}</strong><span className="text-sm text-[var(--foreground-secondary)]">{source}</span><span className="inline-flex items-center gap-1.5 text-xs text-[var(--accent-hover)]"><Icon className="h-4 w-4" />{status}</span></div>)}
        </div>
      </div>
    </section>
  )
}
