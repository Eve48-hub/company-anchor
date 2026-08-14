import { describe, expect, it } from "vitest"

import { acquireStorage, readWatchlist, toggleWatchlistCompany } from "./storage"

class MemoryStorage implements Storage {
  private values = new Map<string, string>()
  get length() { return this.values.size }
  clear() { this.values.clear() }
  getItem(key: string) { return this.values.get(key) ?? null }
  key(index: number) { return [...this.values.keys()][index] ?? null }
  removeItem(key: string) { this.values.delete(key) }
  setItem(key: string, value: string) { this.values.set(key, value) }
}

describe("watchlist storage", () => {
  it("localStorage 속성 접근이 거부되면 사용할 수 없음으로 처리한다", () => {
    expect(acquireStorage(() => { throw new DOMException("blocked", "SecurityError") })).toBeNull()
    const storage = new MemoryStorage()
    expect(acquireStorage(() => storage)).toBe(storage)
  })

  it("기업을 저장하고 다시 누르면 제거한다", () => {
    const storage = new MemoryStorage()

    expect(toggleWatchlistCompany(storage, "doitnow")).toEqual(["doitnow"])
    expect(readWatchlist(storage)).toEqual(["doitnow"])
    expect(toggleWatchlistCompany(storage, "doitnow")).toEqual([])
  })

  it("저장소 쓰기가 거부되면 기존 값을 유지한다", () => {
    const storage = new MemoryStorage()
    storage.setItem("company-anchor:watchlist", JSON.stringify(["doitnow"]))
    const rejectingStorage = new Proxy(storage, {
      get(target, property, receiver) {
        if (property === "setItem") return () => { throw new Error("quota") }
        const value = Reflect.get(target, property, receiver)
        return typeof value === "function" ? value.bind(target) : value
      },
    })

    expect(toggleWatchlistCompany(rejectingStorage, "anchor-labs")).toEqual(["doitnow"])
  })

  it("중복과 잘못된 저장값을 안전하게 정리한다", () => {
    const storage = new MemoryStorage()
    storage.setItem("company-anchor:watchlist", JSON.stringify(["doitnow", "", "doitnow", 3]))
    expect(readWatchlist(storage)).toEqual(["doitnow"])

    storage.setItem("company-anchor:watchlist", "not-json")
    expect(readWatchlist(storage)).toEqual([])
  })
})
