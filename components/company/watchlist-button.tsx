"use client"

import { BookmarkSimple, Check } from "@phosphor-icons/react"
import { useEffect, useRef, useState } from "react"

import { acquireStorage, readWatchlist, toggleWatchlistCompany } from "@/lib/watchlist/storage"

export function WatchlistButton({ companySlug }: { companySlug: string }) {
  const storageRef = useRef<Storage | null>(null)
  const [saved, setSaved] = useState(false)
  const [ready, setReady] = useState(false)
  const [available, setAvailable] = useState(true)
  const [announcement, setAnnouncement] = useState("")

  useEffect(() => {
    const storage = acquireStorage(() => window.localStorage)
    storageRef.current = storage
    setAvailable(storage !== null)
    if (storage) setSaved(readWatchlist(storage).includes(companySlug))
    setReady(true)
  }, [companySlug])

  function toggleSaved() {
    const storage = storageRef.current
    if (!storage) {
      setAnnouncement("이 브라우저에서는 관심기업 저장을 사용할 수 없습니다.")
      return
    }

    const wasSaved = readWatchlist(storage).includes(companySlug)
    const next = toggleWatchlistCompany(storage, companySlug)
    const nextSaved = next.includes(companySlug)
    if (nextSaved === wasSaved) {
      setAvailable(false)
      setAnnouncement("브라우저 저장 공간을 사용할 수 없어 변경하지 못했습니다.")
      return
    }
    setSaved(nextSaved)
    setAnnouncement(nextSaved ? "이 브라우저의 관심기업에 저장했습니다." : "관심기업에서 제거했습니다.")
  }

  const unavailable = ready && !available

  return (
    <div>
      <button
        type="button"
        aria-pressed={saved}
        disabled={!ready || unavailable}
        title={unavailable ? "브라우저 저장 공간을 사용할 수 없습니다" : undefined}
        onClick={toggleSaved}
        className={`inline-flex h-10 items-center gap-2 rounded-full border px-4 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-keppel-400)] disabled:cursor-not-allowed disabled:border-[var(--color-baltic-sea-800)] disabled:text-[var(--color-baltic-sea-600)] ${saved ? "border-[var(--color-keppel-700)] bg-[var(--color-keppel-950)] text-[var(--color-keppel-300)]" : "border-[var(--color-baltic-sea-700)] text-[var(--color-baltic-sea-200)] hover:border-[var(--color-keppel-700)]"}`}
      >
        {saved ? <Check className="h-4 w-4" weight="bold" /> : <BookmarkSimple className="h-4 w-4" />}
        {unavailable ? "저장 불가" : saved ? "저장됨" : "관심기업"}
      </button>
      <span className="sr-only" aria-live="polite">{announcement}</span>
    </div>
  )
}
