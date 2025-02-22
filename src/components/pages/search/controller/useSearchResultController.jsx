import { useNavigate, useSearchParams } from "react-router-dom"
import usePaginationStore from "../../../../lib/store/usePaginationStore"
import { useMemo } from "react"
import { API_KEY, API_URL } from "../../../../lib/api/apj"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"

const useSearchResultController = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  const { totalCount, totalPages, setPagination } = usePaginationStore()

  const page = useMemo(() => {
    return searchParams.get("page") ? searchParams.get("page") : 1
  }, [searchParams])

  const SIGUN_NM = useMemo(() => {
    return searchParams.get("nm") ? searchParams.get("nm") : ""
  }, [searchParams])

  const SIGUN_CD = useMemo(() => {
    return searchParams.get("cd") ? searchParams.get("cd") : ""
  }, [searchParams])

  const getList = async () => {
    const params = {
      KEY: API_KEY,
      Type: "json",
      pIndex: page,
      pSize: 10,

      SIGUN_NM,
      SIGUN_CD,
    }

    try {
      const response = await axios.get(API_URL, { params })
      const data = response.data?.OdsnFreemlsvM

      if (!data || !Array.isArray(data) || data.length < 2) {
        throw new Error("올바른 응답 구조가 아닙니다.")
      }

      setPagination(data[0]?.head?.[0]?.list_total_count || 0)

      const list = data[1]?.row || []

      console.log("list", list)

      return {
        list,
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error)
      return { list: [] }
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list", page, SIGUN_NM, SIGUN_CD],
    queryFn: getList,
    staleTime: 0,
    keepPreviousData: false,
  })

  const handleCall = (tel) => {
    if (!tel) {
      alert("연락처에 문제가 발생하였습니다.")
    } else {
      window.location.href = `tel:${tel}`
    }
  }

  return {
    totalCount,
    totalPages,
    isLoading,
    isError,
    data,
    navigate,
    handleCall,
    searchParams,
    page,
  }
}

export default useSearchResultController
