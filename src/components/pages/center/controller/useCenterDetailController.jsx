import { useLocation, useNavigate } from "react-router-dom"
import route from "../../../../router/route"
import { useEffect, useState } from "react"
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

  // ===== 지도 API 호출 ===== //
  const kakaoMap = async () => {
    const addressData = {
      query: data?.REFINE_ROADNM_ADDR || data?.REFINE_LOTNO_ADDR || "",
    }

    console.log("addressData", addressData)

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
  }

  useEffect(() => {
    if (data) {
      kakaoMap()
    }
  }, [data]) // eslint-disable-line

  return {
    data,
  }
}
export default useCenterDetailController
