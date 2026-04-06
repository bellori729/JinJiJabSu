import { useEffect, useMemo, useState } from "react"
import { useLocation, useNavigate, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import route from "../../../../router/route"
import { API_KEY, API_URL, KAKAO_MAP_REST_API_KEY } from "../../../../lib/api/apj"
import { minToMs } from "../../../../lib/utils/msConverter"
import { formatInfoText, getSiGunNameByCode } from "../../../../lib/seo/utils"

const useCenterDetailController = () => {
  const navigate = useNavigate()
  const { state } = useLocation()
  const [searchParams] = useSearchParams()
  const [data, setData] = useState(state?.item ?? null)

  const requestedFacilityName = searchParams.get("facility") || state?.item?.FACLT_NM || ""
  const requestedSigunCode = searchParams.get("cd") || state?.item?.SIGUN_CD || ""
  const requestedSigunName = searchParams.get("sigun") || state?.item?.SIGUN_NM || getSiGunNameByCode(requestedSigunCode)
  const hasDetailParams = Boolean(requestedFacilityName && requestedSigunCode)

  const getCenterDetail = async () => {
    const response = await axios.get(API_URL, {
      params: {
        KEY: API_KEY,
        Type: "json",
        pIndex: 1,
        pSize: 1000,
        SIGUN_CD: requestedSigunCode,
      },
    })

    const rows = response.data?.OdsnFreemlsvM?.[1]?.row || []
    const normalizedRequestedName = requestedFacilityName.replaceAll(" ", "")

    return (
      rows.find((item) => item?.FACLT_NM === requestedFacilityName) ||
      rows.find((item) => item?.FACLT_NM?.replaceAll(" ", "") === normalizedRequestedName) ||
      null
    )
  }

  const { data: fetchedData, isLoading: isFetchingDetail } = useQuery({
    queryFn: getCenterDetail,
    queryKey: ["centerDetail", requestedSigunCode, requestedFacilityName],
    enabled: !state?.item && hasDetailParams,
    staleTime: minToMs(15),
  })

  useEffect(() => {
    if (state?.item) {
      setData(state.item)
      return
    }

    if (fetchedData) {
      setData(fetchedData)
    }
  }, [fetchedData, state])

  useEffect(() => {
    if (state?.item || isFetchingDetail) {
      return
    }

    if (hasDetailParams && fetchedData) {
      return
    }

    navigate(route.search, { replace: true })
  }, [fetchedData, hasDetailParams, isFetchingDetail, navigate, state])

  const detailList = useMemo(
    () => [
      { title: "관리기관명", content: data?.MANAGE_INST_NM || "관리기관명이 등록되지 않았습니다." },
      { title: "관리기관 전화번호", content: data?.MANAGE_INST_TELNO || "관리기관 전화번호가 등록되지 않았습니다." },
      { title: "급식 장소", content: data?.MEALSRV_PLC || "급식 장소가 등록되지 않았습니다." },
      { title: "급식 대상", content: formatInfoText(data?.MEALSRV_TARGET_INFO, "급식 대상이 등록되지 않았습니다.") },
      { title: "급식 요일", content: formatInfoText(data?.RESTDAY_INFO, "급식 요일이 등록되지 않았습니다.") },
      { title: "급식 시간", content: data?.MEALSRV_TM_INFO || "급식 시간이 등록되지 않았습니다." },
    ],
    [data],
  )

  const addressList = useMemo(
    () => [
      {
        title: "도로명 주소",
        content: data?.REFINE_ROADNM_ADDR || "도로명 주소가 등록되지 않았습니다.",
        copy: Boolean(data?.REFINE_ROADNM_ADDR),
      },
      {
        title: "지번 주소",
        content: data?.REFINE_LOTNO_ADDR || "지번 주소가 등록되지 않았습니다.",
        copy: Boolean(data?.REFINE_LOTNO_ADDR),
      },
    ],
    [data],
  )

  const handleCopy = (address) => {
    navigator.clipboard.writeText(address)
    alert("주소가 복사되었습니다.")
  }

  const [isMapLoaded, setIsMapLoaded] = useState(true)

  const kakaoMap = async () => {
    const addressData = {
      query: data?.REFINE_ROADNM_ADDR || data?.REFINE_LOTNO_ADDR || "",
    }

    try {
      const addressResponse = await axios.get("https://dapi.kakao.com/v2/local/search/address.json", {
        headers: {
          Authorization: `KakaoAK ${KAKAO_MAP_REST_API_KEY}`,
        },
        params: addressData,
      })

      const container = document.getElementById("map")
      const mapCenter = new window.kakao.maps.LatLng(addressResponse.data.documents[0].y, addressResponse.data.documents[0].x)
      const map = new window.kakao.maps.Map(container, {
        center: mapCenter,
        level: 3,
      })

      const marker = new window.kakao.maps.Marker({
        position: mapCenter,
      })

      marker.setMap(map)
      setIsMapLoaded(true)
    } catch (error) {
      console.error(error)
      setIsMapLoaded(false)
    }
  }

  useEffect(() => {
    if (data) {
      kakaoMap()
    }
  }, [data]) // eslint-disable-line

  const handleCall = (tel) => {
    if (!tel) {
      alert("전화 연결에 문제가 발생했습니다.")
      return
    }

    window.location.href = `tel:${tel}`
  }

  return {
    data,
    detailList,
    addressList,
    handleCall,
    handleCopy,
    isMapLoaded,
    isLoading: !state?.item && hasDetailParams && isFetchingDetail,
    requestedFacilityName,
    requestedSigunName,
  }
}

export default useCenterDetailController
