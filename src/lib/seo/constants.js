export const SITE_NAME = "진지잡수"
export const SITE_TITLE = `${SITE_NAME} | 경기도 어르신 무료급식소 안내`
export const SITE_DESCRIPTION =
  "경기도 어르신을 위한 무료급식소 정보를 지역별로 확인할 수 있는 서비스입니다. 시설명, 주소, 급식 시간, 휴무일, 연락처를 한눈에 살펴보세요."
export const SITE_URL = (import.meta.env.VITE_SITE_URL || "https://jinjijabsu.netlify.app").replace(/\/$/, "")
export const DEFAULT_OG_IMAGE = `${SITE_URL}/meta_img.png`
export const DEFAULT_OG_IMAGE_ALT = "진지잡수 서비스 대표 이미지"
export const DEFAULT_KEYWORDS = [
  "진지잡수",
  "경기도 무료급식소",
  "무료급식소",
  "경로식당",
  "어르신 복지",
  "복지 급식",
  "무료 급식 정보",
]
export const DEFAULT_ROBOTS = "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"

export const getAbsoluteUrl = (path = "/") => {
  try {
    return new URL(path, `${SITE_URL}/`).toString()
  } catch {
    return SITE_URL
  }
}

export const getPageTitle = (pageTitle) => {
  return pageTitle ? `${pageTitle} | ${SITE_NAME}` : SITE_TITLE
}

export const getMetaKeywords = (keywords = []) => {
  return Array.from(new Set([...DEFAULT_KEYWORDS, ...keywords].filter(Boolean))).join(", ")
}

