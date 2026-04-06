import route from "../../router/route"
import siGunCode from "../constants/siGunCode"

export const getSiGunNameByCode = (code) => {
  return Object.entries(siGunCode).find(([, value]) => String(value) === String(code))?.[0] ?? ""
}

export const buildCenterDetailPath = ({ facilityName = "", sigunCode = "", sigunName = "" }) => {
  const params = new URLSearchParams()

  if (facilityName) {
    params.set("facility", facilityName)
  }

  if (sigunCode) {
    params.set("cd", String(sigunCode))
  }

  if (sigunName) {
    params.set("sigun", sigunName)
  }

  const queryString = params.toString()

  return queryString ? `${route.center_detail}?${queryString}` : route.center_detail
}

export const formatInfoText = (value, fallback = "정보가 준비되지 않았습니다.") => {
  return value?.replaceAll("+", ", ") || fallback
}

