import { useEffect, useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import {
  API_URL,
  FREE_MEAL_MAX_ROWS,
  FREE_MEAL_PAGE_SIZE,
  buildFreeMealApiParams,
  filterFreeMealItemsByRegion,
  paginateFreeMealItems,
  parseFreeMealApiResponse,
} from "../../../../lib/api/apj"
import usePaginationStore from "../../../../lib/store/usePaginationStore"
import { getSiGunNameByCode } from "../../../../lib/seo/utils"
import { minToMs } from "../../../../lib/utils/msConverter"

const useSearchResultController = () => {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()

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

  const SIGUN_CD = useMemo(() => {
    return searchParams.get("cd") ? searchParams.get("cd") : ""
  }, [searchParams])

  const SIGUN_NM = useMemo(() => {
    return searchParams.get("nm") || getSiGunNameByCode(SIGUN_CD)
  }, [SIGUN_CD, searchParams])

  const getList = async () => {
    const fallback = {
      sigunCode: SIGUN_CD,
      sigunName: SIGUN_NM,
    }
    const params = buildFreeMealApiParams({
      pageNo: SIGUN_NM ? 1 : Number(page),
      numOfRows: SIGUN_NM ? FREE_MEAL_MAX_ROWS : FREE_MEAL_PAGE_SIZE,
    })

    try {
      const response = await axios.get(API_URL, { params })
      const parsedData = parseFreeMealApiResponse(response.data, fallback)

      if (!SIGUN_NM) {
        return parsedData
      }

      const totalPages = Math.ceil(parsedData.totalCount / FREE_MEAL_MAX_ROWS)
      const remainingResponses =
        totalPages > 1
          ? await Promise.all(
              Array.from({ length: totalPages - 1 }, (_, index) =>
                axios.get(API_URL, {
                  params: buildFreeMealApiParams({
                    pageNo: index + 2,
                    numOfRows: FREE_MEAL_MAX_ROWS,
                  }),
                }),
              ),
            )
          : []
      const fullList = remainingResponses.reduce(
        (list, pageResponse) => list.concat(parseFreeMealApiResponse(pageResponse.data, fallback).list),
        parsedData.list,
      )
      const filteredList = filterFreeMealItemsByRegion(fullList, SIGUN_NM)

      return {
        totalCount: filteredList.length,
        list: paginateFreeMealItems(filteredList, Number(page)),
      }
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
      alert("연락처에 문제가 발생했습니다.")
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
