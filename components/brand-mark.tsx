import Link from "next/link"
import { Buildings } from "@phosphor-icons/react/dist/ssr"

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="flex items-center gap-3" aria-label="기업앵커 홈">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-md border border-[var(--border)] bg-[var(--surface-subtle)]">
        <Buildings className="h-4 w-4 text-[var(--foreground)]" />
        <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-white bg-[var(--accent)]" />
      </span>
      {!compact && <span className="text-lg font-medium tracking-tight text-[var(--foreground)]">기업앵커</span>}
    </Link>
  )
}
