import Link from "next/link"
import { Buildings } from "@phosphor-icons/react/dist/ssr"

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="기업앵커 홈">
      <span className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-baltic-sea-100)]">
        <Buildings weight="fill" className="h-5 w-5 text-[var(--color-baltic-sea-950)]" />
        <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-[var(--color-baltic-sea-950)] bg-[var(--color-keppel-400)]" />
      </span>
      {!compact && <span className="text-xl font-semibold tracking-tight text-[var(--color-baltic-sea-50)]">기업앵커</span>}
    </Link>
  )
}
