const stages = [
  ["01", "검색", "기업명을 입력합니다."],
  ["02", "확인", "핵심 정보와 최근 재무를 확인합니다."],
  ["03", "저장", "관심기업을 저장하고 변화를 구독합니다."],
]

export function ProcessSection() {
  return (
    <section className="border-y border-[var(--border-subtle)] bg-[var(--surface-subtle)]">
      <div className="mx-auto max-w-[1184px] px-4 py-24 sm:px-6 lg:py-28">
        <div className="mb-12"><p className="font-mono text-xs uppercase tracking-[0.14em] text-[var(--accent-hover)]">How it works</p><h2 className="mt-3 text-3xl font-normal tracking-[-0.03em] sm:text-4xl">필요한 기업을 세 단계로</h2></div>
        <div className="grid overflow-hidden rounded-xl border border-[var(--border)] bg-white md:grid-cols-3">
          {stages.map(([number, title, text]) => <div key={number} className="border-b border-[var(--border-subtle)] p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"><span className="font-mono text-xs text-[var(--foreground-muted)]">{number}</span><h3 className="mt-12 text-xl font-medium">{title}</h3><p className="mt-3 text-sm text-[var(--foreground-secondary)]">{text}</p></div>)}
        </div>
      </div>
    </section>
  )
}
