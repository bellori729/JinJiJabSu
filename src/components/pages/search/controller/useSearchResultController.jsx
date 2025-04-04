import { useNavigate, useSearchParams } from "react-router-dom"
import usePaginationStore from "../../../../lib/store/usePaginationStore"
import { useEffect, useMemo } from "react"
import { API_KEY, API_URL } from "../../../../lib/api/apj"
import axios from "axios"
import { useQuery } from "@tanstack/react-query"
import { minToMs } from "../../../../lib/utils/msConverter"

const useSearchResultController = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

  // componentDidMount
  useEffect(() => {
    const hasPageParam = searchParams.has("page")

    if (!hasPageParam) {
      const params = new URLSearchParams(searchParams)
      params.set("page", "1")

      navigate({ search: params.toString() }, { replace: true })
    }
  }, []) // eslint-disable-line

  const { totalCount, totalPages, setPagination } = usePaginationStore()

  const page = useMemo(() => {
    return searchParams.get("page") ? Number(searchParams.get("page")) : 1
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
      pIndex: Number(page),
      pSize: 5,

      SIGUN_NM,
      SIGUN_CD,
    }

    try {
      const response = await axios.get(API_URL, { params })
      const data = response.data?.OdsnFreemlsvM

      if (!data || !Array.isArray(data) || data.length < 2) {
        throw new Error("올바른 응답 구조가 아닙니다.")
      }

      const returnData = {
        totalCount: data[0]?.head?.[0]?.list_total_count || 0,
        list: data[1]?.row || [],
      }

      return returnData
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error)
      return {
        totalCount: 0,
        list: [],
      }
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryFn: getList,
    queryKey: ["getList", SIGUN_NM, SIGUN_CD, page],
    staleTime: minToMs(15),
    keepPreviousData: false,
  })

  useEffect(() => {
    if (data?.totalCount > 0) {
      setPagination(data.totalCount)
    }
  }, [data?.totalCount]) // eslint-disable-line

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
