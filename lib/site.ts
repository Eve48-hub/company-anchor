export const SITE_URL = "https://eve48-hub.github.io/company-anchor"
export const SITE_NAME = "기업앵커"

export function absoluteUrl(pathname: string): string {
  const normalized = pathname.startsWith("/") ? pathname : `/${pathname}`
  return `${SITE_URL}${normalized}`
}
