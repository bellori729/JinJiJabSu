import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_KEY, API_URL } from "../../../lib/api/apj"
import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"

const getList = async () => {
  const params = {
    KEY: API_KEY,
    Type: "json",
    pIndex: 1,
    pSize: 10,
  }

  try {
    const response = await axios.get(API_URL, { params })
    const data = response.data?.OdsnFreemlsvM

    if (!data || !Array.isArray(data) || data.length < 2) {
      throw new Error("올바른 응답 구조가 아닙니다.")
    }

    return {
      totalCount: data[0]?.head?.[0]?.list_total_count || 0,
      list: data[1]?.row || [],
    }
  } catch (error) {
    console.error("API 호출 중 오류 발생:", error)
    return { totalCount: 0, list: [] }
  }
}

const Home = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["list"],
    queryFn: getList,
    staleTime: 600000, // 600초 동안 캐시 유지
  })

  return (
    <BasicTemplate isNoBack={true}>
      <div>총 결과 {data.totalCount}</div>
      <MainContainer>
        <ul>
          {data.list.map((item) => (
            <li key={item.MANAGE_INST_TELNO}>{item.FACLT_NM}</li>
          ))}
        </ul>
      </MainContainer>
    </BasicTemplate>
  )
}

export default Home
