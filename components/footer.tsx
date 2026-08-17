import { BrandMark } from "@/components/brand-mark"

export function Footer() {
  return <footer><div className="mx-auto flex max-w-[1184px] flex-col gap-5 px-4 py-10 text-sm text-[var(--foreground-muted)] sm:px-6 md:flex-row md:items-center md:justify-between"><BrandMark /><p>기업 기본정보와 재무를 출처와 함께</p><p>© 2026 Company Anchor</p></div></footer>
}
