const stages = [
  ["01", "검색", "기업명을 입력합니다."],
  ["02", "확인", "핵심 정보와 최근 재무를 확인합니다."],
  ["03", "저장", "관심기업을 저장하고 변화를 구독합니다."],
]

export function ProcessSection() {
  return (
    <section className="border-y border-[var(--color-baltic-sea-800)] bg-[var(--color-baltic-sea-950)]/40">
      <div className="mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-12">
        <div className="mb-14 text-center"><p className="text-sm text-[var(--color-keppel-400)]">HOW IT WORKS</p><h2 className="mt-3 text-3xl font-semibold sm:text-5xl">필요한 기업을 세 단계로</h2></div>
        <div className="grid gap-4 md:grid-cols-3">
          {stages.map(([number, title, text]) => <div key={number} className="relative rounded-2xl border border-[var(--color-baltic-sea-800)] bg-background p-7"><span className="font-mono text-sm text-[var(--color-keppel-400)]">{number}</span><h3 className="mt-8 text-2xl font-semibold">{title}</h3><p className="mt-3 text-[var(--color-baltic-sea-400)]">{text}</p></div>)}
        </div>
      </div>
    </section>
  )
}
