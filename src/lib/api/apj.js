export const API_URL = import.meta.env.VITE_API_URL
export const API_KEY = import.meta.env.VITE_API_KEY
export const KAKAO_MAP_REST_API_KEY = import.meta.env.VITE_KAKAO_MAP_REST_API_KEY

export const FREE_MEAL_PAGE_SIZE = 5
export const FREE_MEAL_MAX_ROWS = 1000

const OLD_RESPONSE_ROOT = "OdsnFreemlsvM"

export const buildFreeMealApiParams = ({ pageNo = 1, numOfRows = FREE_MEAL_PAGE_SIZE, fcltyNm = "", rdnmadr = "" } = {}) => {
  const params = {
    serviceKey: API_KEY,
    pageNo,
    numOfRows,
    type: "json",
  }

  if (fcltyNm) {
    params.fcltyNm = fcltyNm
  }

  if (rdnmadr) {
    params.rdnmadr = rdnmadr
  }

  return params
}

export const parseFreeMealApiResponse = (responseData, fallback = {}) => {
  const oldData = responseData?.[OLD_RESPONSE_ROOT]

  if (Array.isArray(oldData)) {
    return {
      totalCount: Number(oldData[0]?.head?.[0]?.list_total_count || 0),
      list: (oldData[1]?.row || []).map((item) => normalizeFreeMealItem(item, fallback)),
    }
  }

  const body = responseData?.response?.body
  const items = Array.isArray(body?.items) ? body.items : Array.isArray(body?.items?.item) ? body.items.item : []

  return {
    totalCount: Number(body?.totalCount || items.length || 0),
    list: items.map((item) => normalizeFreeMealItem(item, fallback)),
  }
}

export const filterFreeMealItemsByRegion = (items = [], regionName = "") => {
  if (!regionName) {
    return items
  }

  const normalizedRegionName = normalizeText(regionName.replace("특례시", "시"))

  return items.filter((item) => {
    const searchableText = normalizeText(
      [item.SIGUN_NM, item.REFINE_ROADNM_ADDR, item.REFINE_LOTNO_ADDR, item.MANAGE_INST_NM].filter(Boolean).join(" "),
    )

    return searchableText.includes(normalizedRegionName)
  })
}

export const paginateFreeMealItems = (items = [], pageNo = 1, pageSize = FREE_MEAL_PAGE_SIZE) => {
  const startIndex = (pageNo - 1) * pageSize

  return items.slice(startIndex, startIndex + pageSize)
}

export const normalizeFreeMealItem = (item, fallback = {}) => {
  if (!item) {
    return item
  }

  const roadAddress = item.rdnmadr || item.REFINE_ROADNM_ADDR || ""
  const lotAddress = item.lnmadr || item.REFINE_LOTNO_ADDR || ""
  const sigunName = item.SIGUN_NM || getSigunNameFromAddress(roadAddress || lotAddress)

  return {
    ...item,
    FACLT_NM: item.FACLT_NM || item.fcltyNm || "",
    REFINE_ROADNM_ADDR: roadAddress,
    REFINE_LOTNO_ADDR: lotAddress,
    MANAGE_INST_NM: item.MANAGE_INST_NM || item.operInstitutionNm || "",
    MANAGE_INST_TELNO: item.MANAGE_INST_TELNO || item.phoneNumber || "",
    MEALSRV_PLC: item.MEALSRV_PLC || item.mlsvPlace || "",
    MEALSRV_TARGET_INFO: item.MEALSRV_TARGET_INFO || item.mlsvTrget || "",
    MEALSRV_TM_INFO: item.MEALSRV_TM_INFO || item.mlsvTime || "",
    RESTDAY_INFO: item.RESTDAY_INFO || item.mlsvDate || "",
    OPER_OPEN_DATE: item.OPER_OPEN_DATE || item.operOpenDate || "",
    OPER_CLOSE_DATE: item.OPER_CLOSE_DATE || item.operCloseDate || "",
    REFINE_WGS84_LAT: item.REFINE_WGS84_LAT || item.latitude || "",
    REFINE_WGS84_LOGT: item.REFINE_WGS84_LOGT || item.longitude || "",
    DATA_STD_DE: item.DATA_STD_DE || item.referenceDate || "",
    SIGUN_CD: item.SIGUN_CD || fallback.sigunCode || "",
    SIGUN_NM: sigunName,
  }
}

const getSigunNameFromAddress = (address = "") => {
  return address.match(/(?:경기도\s*)?([가-힣]+시|[가-힣]+군)/)?.[1] || ""
}

const normalizeText = (value = "") => {
  return String(value).replace(/\s/g, "")
}
