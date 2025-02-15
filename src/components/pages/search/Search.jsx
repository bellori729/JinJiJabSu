import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { API_KEY, API_URL } from "../../../lib/api/apj"
import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"
import Empty from "../../molecules/Empty"
import { useMemo } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import route from "../../../router/route"
import Pagination from "../../molecules/Pagination"
import LoadingSpinner from "../../atoms/LoadingSpinner"
import usePaginationStore from "../../../lib/store/usePaginationStore"

const Search = () => {
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

      if (totalCount === null) {
        setPagination(data[0]?.head?.[0]?.list_total_count || 0)
      }

      const list = data[1]?.row || []

      return {
        list,
      }
    } catch (error) {
      console.error("API 호출 중 오류 발생:", error)
      return { list: [] }
    }
  }

  const { data, isLoading, isError } = useQuery({
    queryKey: ["list", page],
    queryFn: getList,
    staleTime: Infinity, // 캐시 유지
    keepPreviousData: true, // 이전 데이터 유지
  })

  const handleCall = (tel) => {
    if (!tel) {
      alert("연락처에 문제가 발생하였습니다.")
    } else {
      window.location.href = `tel:${tel}`
    }
  }

  return (
    <BasicTemplate isNoBack={true} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"검색하기"}>
      <MainContainer>
        <div className="w-full pl-[20px] my-[20px]">
          전체 <b>{totalCount || 0}개</b>
        </div>
        {isLoading ? (
          <LoadingSpinner className={"h-[1060px]"} />
        ) : isError ? (
          <Empty text="오류가 발생했습니다." />
        ) : (
          <table className="w-full">
            <colgroup>
              <col style={{ width: "70%" }} />
              <col style={{ width: "25%" }} />
            </colgroup>
            <thead className="bg-gray-200 h-[85px]">
              <tr>
                <th>
                  시설정보
                  <br />
                  <span className="small-font-size text-gray-400">(제목을 클릭 시 상세 페이지로 이동)</span>
                </th>
                <th>연락처</th>
              </tr>
            </thead>

            <tbody className="">
              {data.list.length === 0 && <Empty />}

              {data.list.map((item, index) => (
                <tr key={index} className="border-y-[1px] border-gray-300">
                  <td>
                    <div
                      className="pl-[20px] py-[20px] w-full min-h-[100px] h-fit flex flex-col justify-center cursor-pointer"
                      onClick={() => {
                        navigate(route.center_detail, { state: { item } })
                      }}
                    >
                      <div className="">{item.FACLT_NM}</div>
                      <div className="small-font-size text-gray-500">{item.REFINE_ROADNM_ADDR}</div>
                    </div>
                  </td>
                  <td>
                    <div className="w-full h-[50px] flex items-center justify-center">
                      <img
                        className="w-[24px] h-[24px] cursor-pointer"
                        src="assets/icons/tel.png"
                        alt="전화걸기"
                        title="전화걸기"
                        onClick={() => handleCall(item.MANAGE_INST_TELNO)}
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <Pagination
          route={route.search}
          currentPage={page}
          queryString={`${searchParams.get("nm") ? "&nm=" + searchParams.get("nm") : ""}${
            searchParams.get("cd") ? "&cd=" + searchParams.get("cd") : ""
          }`}
          totalPages={totalPages || 1}
          rangeSize={5}
        />
      </MainContainer>
    </BasicTemplate>
  )
}

export default Search
