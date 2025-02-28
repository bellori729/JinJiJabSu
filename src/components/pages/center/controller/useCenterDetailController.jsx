import { useLocation, useNavigate } from "react-router-dom"
import route from "../../../../router/route"
import { useEffect, useMemo, useState } from "react"
import axios from "axios"
import { KAKAO_MAP_REST_API_KEY } from "../../../../lib/api/apj"

const useCenterDetailController = () => {
  const navigate = useNavigate()

  // ===== 상세 정보 ===== //
  const { state } = useLocation()
  const [data, setData] = useState(null)

  useEffect(() => {
    if (state?.item) {
      setData(state?.item)
    } else {
      navigate(route.search, { replace: true })
    }
  }, [state]) // eslint-disable-line

  const detailList = useMemo(
    () => [
      { title: "관리기관명", content: data?.MANAGE_INST_NM || "해당 시설의 관리기관명이 등록되어 있지 않습니다." },
      {
        title: "관리기관 전화번호",
        content: data?.MANAGE_INST_TELNO || "해당 시설의 관리기관 전화번호가 등록되어 있지 않습니다.",
      },
      { title: "급식장소", content: data?.MEALSRV_PLC || "해당 시설의 급식장소가 등록되어 있지 않습니다." },
      { title: "급식대상", content: data?.MEALSRV_TARGET_INFO || "해당 시설의 급식대상이 등록되어 있지 않습니다." },
      { title: "급식일", content: data?.RESTDAY_INFO || "해당 시설의 급식일이 등록되어 있지 않습니다." },
      { title: "급식시간", content: data?.MEALSRV_TM_INFO || "해당 시설의 급식시간이 등록되어 있지 않습니다." },
    ],
    [data],
  )

  // ===== 위치 관련 ===== //
  // 주소 정보
  const addressList = useMemo(
    () => [
      {
        title: "도로명 주소",
        content: data?.REFINE_ROADNM_ADDR || "해당 시설의 도로명 주소가 등록되어 있지 않습니다.",
        copy: data?.REFINE_ROADNM_ADDR ? true : false,
      },
      {
        title: "지번 주소",
        content: data?.REFINE_LOTNO_ADDR || "해당 시설의 지번 주소가 등록되어 있지 않습니다.",
        copy: data?.REFINE_LOTNO_ADDR ? true : false,
      },
    ],
    [data],
  )

  // 주소 복사하기
  const handleCopy = (address) => {
    navigator.clipboard.writeText(address)
    alert("주소가 복사되었습니다.")
  }

  // 지도 API 호출
  const [isMapLoaded, setIsMapLoaded] = useState(true)

  const kakaoMap = async () => {
    const addressData = {
      query: data?.REFINE_ROADNM_ADDR || data?.REFINE_LOTNO_ADDR || "",
    }

    console.log(addressData)

    try {
      const addressResponse = await axios.get(`https://dapi.kakao.com/v2/local/search/address.json`, {
        headers: {
          Authorization: `KakaoAK ${KAKAO_MAP_REST_API_KEY}`,
        },
        params: addressData,
      })

      const container = document.getElementById("map")
      const options = {
        center: new window.kakao.maps.LatLng(addressResponse.data.documents[0].y, addressResponse.data.documents[0].x),
        level: 3,
      }
      const map = new window.kakao.maps.Map(container, options)

      const markerPosition = new window.kakao.maps.LatLng(
        addressResponse.data.documents[0].y,
        addressResponse.data.documents[0].x,
      )

      const marker = new window.kakao.maps.Marker({
        position: markerPosition,
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

  // ===== 전화 걸기 ===== //
  const handleCall = (tel) => {
    if (!tel) {
      alert("연락처에 문제가 발생하였습니다.")
    } else {
      window.location.href = `tel:${tel}`
    }
  }

  return {
    data,
    detailList,
    addressList,
    handleCall,
    handleCopy,
    isMapLoaded,
  }
}
export default useCenterDetailController
