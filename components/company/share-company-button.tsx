"use client"

import { Export } from "@phosphor-icons/react"
import { useState } from "react"

export function ShareCompanyButton({ companyName }: { companyName: string }) {
  const [announcement, setAnnouncement] = useState("")

  async function share() {
    const payload = { title: `${companyName} | 기업앵커`, url: window.location.href }
    try {
      if (navigator.share) {
        await navigator.share(payload)
        setAnnouncement("공유 메뉴를 열었습니다.")
        return
      }
      await navigator.clipboard.writeText(payload.url)
      setAnnouncement("기업 페이지 주소를 복사했습니다.")
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") return
      setAnnouncement("공유하지 못했습니다. 주소창의 링크를 복사해 주세요.")
    }
  }

  return <>
    <button type="button" onClick={share} title="기업 페이지 공유" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-baltic-sea-700)] text-[var(--color-baltic-sea-300)] transition hover:border-[var(--color-keppel-700)] hover:text-[var(--color-keppel-300)]" aria-label={`${companyName} 페이지 공유`}><Export className="h-4 w-4" /></button>
    <span className="sr-only" aria-live="polite">{announcement}</span>
  </>
}
