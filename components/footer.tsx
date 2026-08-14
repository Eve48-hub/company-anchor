import { BrandMark } from "@/components/brand-mark"

export function Footer() {
  return <footer className="border-t border-[var(--color-baltic-sea-800)]"><div className="mx-auto flex max-w-[1400px] flex-col gap-5 px-4 py-10 text-sm text-[var(--color-baltic-sea-500)] sm:px-6 md:flex-row md:items-center md:justify-between lg:px-12"><BrandMark /><p>기업을 읽는 가장 빠른 기준점 · 1차 샘플 MVP</p><p>© 2026 Company Anchor</p></div></footer>
}
