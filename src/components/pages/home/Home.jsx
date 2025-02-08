import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_KEY, API_URL } from "../../../lib/api/apj"
import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"
import Empty from "../../molecules/Empty"
import { useMemo } from "react"
import { useSearchParams } from "react-router-dom"
import route from "../../../router/route"
import Pagination from "../../molecules/Pagination"
import LoadingSpinner from "../../atoms/LoadingSpinner"

const Home = () => {
  const [searchParams] = useSearchParams()

  const page = useMemo(() => {
    return searchParams.get("page") ? searchParams.get("page") : 1
  }, [searchParams])

  const getList = async () => {
    const params = {
      KEY: API_KEY,
      Type: "json",
      pIndex: page,
      pSize: 10,
    }

    try {
      const response = await axios.get(API_URL, { params })
      const data = response.data?.OdsnFreemlsvM

      if (!data || !Array.isArray(data) || data.length < 2) {
        throw new Error("올바른 응답 구조가 아닙니다.")
      }

      const totalCount = data[0]?.head?.[0]?.list_total_count || 0
      const totalPages = Math.ceil(totalCount / 10)
      const list = data[1]?.row || []

      return {
        totalPages,
        totalCount,
        list,
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error)
      return { totalCount: 0, list: [] }
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list", page],
    queryFn: getList,
    staleTime: Infinity, // 캐시 유지
  })

  return (
    <BasicTemplate isNoBack={true}>
      <MainContainer>
        <Empty />
        <div>총 결과 {data?.totalCount || 0}</div>
        {isLoading ? (
          <LoadingSpinner className={"h-[240px]"} />
        ) : isError ? null : (
          <>
            <ul>
              {data.list.map((item, index) => (
                <li key={index}>{item.FACLT_NM}</li>
              ))}
            </ul>
          </>
        )}
        <Pagination route={route.home} currentPage={page} totalPages={data?.totalPages || 1} rangeSize={5} />
      </MainContainer>
    </BasicTemplate>
  )
}

export default Home
