const WATCHLIST_KEY = "company-anchor:watchlist"

function normalizeSlugs(value: unknown): string[] {
  if (!Array.isArray(value)) return []
  return [...new Set(value.filter((item): item is string => typeof item === "string" && item.trim().length > 0))]
}

export function acquireStorage(getStorage: () => Storage): Storage | null {
  try {
    return getStorage()
  } catch {
    return null
  }
}

export function readWatchlist(storage: Storage): string[] {
  try {
    const stored = storage.getItem(WATCHLIST_KEY)
    return stored ? normalizeSlugs(JSON.parse(stored)) : []
  } catch {
    return []
  }
}

export function toggleWatchlistCompany(storage: Storage, slug: string): string[] {
  const current = readWatchlist(storage)
  const next = current.includes(slug) ? current.filter((item) => item !== slug) : [...current, slug]
  try {
    storage.setItem(WATCHLIST_KEY, JSON.stringify(next))
    return next
  } catch {
    return current
  }
}
