import { readFileSync } from "node:fs"
import { resolve } from "node:path"

import { describe, expect, it } from "vitest"

const root = resolve(process.cwd())
const globals = readFileSync(resolve(root, "app/globals.css"), "utf8")
const hero = readFileSync(resolve(root, "components/hero-section.tsx"), "utf8")
const header = readFileSync(resolve(root, "components/header.tsx"), "utf8")

describe("Supabase-inspired global design contract", () => {
  it("uses a restrained light neutral canvas with semantic surface tokens", () => {
    expect(globals).toContain("--background: #ffffff")
    expect(globals).toContain("--surface: #ffffff")
    expect(globals).toContain("--surface-subtle: #f8f8f8")
    expect(globals).toContain("--foreground: #1c1c1c")
    expect(globals).toContain("--accent: #24b47e")
  })

  it("defines a narrow border hierarchy and avoids decorative shadows", () => {
    expect(globals).toContain("--border-subtle: #ededed")
    expect(globals).toContain("--border-strong: #d6d6d6")
    expect(globals).toContain("--shadow-panel: 0 1px 2px rgba(0, 0, 0, 0.04)")
    expect(globals).not.toContain("--bento-shadow")
  })

  it("removes generated-looking animated grid theatre from the primary hero", () => {
    expect(hero).not.toContain("Array.from({ length: 240 })")
    expect(hero).not.toContain("visibleSteps")
    expect(hero).not.toContain("shadow-2xl")
    expect(header).not.toContain("backdrop-blur-xl")
  })
})
