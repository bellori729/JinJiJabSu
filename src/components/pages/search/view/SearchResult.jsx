import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import LoadingSpinner from "../../../atoms/LoadingSpinner"
import Empty from "../../../molecules/Empty"
import route from "../../../../router/route"
import Pagination from "../../../molecules/Pagination"
import useSearchResultController from "../controller/useSearchResultController"

const SearchResult = () => {
  const { totalCount, totalPages, data, isLoading, isError, navigate, handleCall, searchParams, page } =
    useSearchResultController()

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"검색하기"}>
      <MainContainer>
        <div className="w-full pl-[20px] my-[20px]">
          전체 <b>{totalCount || 0}개</b>
        </div>
        {isLoading ? (
          <LoadingSpinner className={"h-[1060px]"} />
        ) : isError ? (
          <Empty text="오류가 발생했습니다." />
        ) : (
          <>
            {data?.list.length === 0 ? (
              <Empty />
            ) : (
              <table className="w-full">
                <colgroup>
                  <col style={{ width: "80%" }} />
                  <col style={{ width: "20%" }} />
                </colgroup>
                <thead className="bg-gray-200 ">
                  <tr>
                    <th className="pl-[20px] py-[10px] text-left">
                      시설정보
                      <br />
                      <span className="small-font-size text-gray-400">제목을 클릭 시 상세 페이지로 이동</span>
                    </th>
                    <th>연락처</th>
                  </tr>
                </thead>

                <tbody className="">
                  {data?.list.map((item, index) => (
                    <tr key={index} className="border-y-[1px] border-gray-300">
                      <td>
                        <div
                          className="p-[20px] w-full min-h-[100px] h-fit flex flex-col justify-center cursor-pointer"
                          onClick={() => {
                            navigate(route.center_detail, { state: { item } })
                          }}
                        >
                          <div className="font-[500]">{item?.FACLT_NM || ""}</div>
                          <div className="small-font-size text-gray-500">
                            {item?.REFINE_ROADNM_ADDR || item?.REFINE_LOTNO_ADDR || ""}
                          </div>
                          <div className="small-font-size">{item?.RESTDAY_INFO || ""}</div>
                          <div className="small-font-size">{item?.MEALSRV_TM_INFO || ""}</div>
                        </div>
                      </td>

                      <td>
                        <div className="p-[20px] w-full h-[50px] flex items-center justify-center">
                          <img
                            className="w-[24px] h-[24px] cursor-pointer"
                            src="/assets/icons/tel.png"
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
          </>
        )}
        <Pagination
          route={route.search_result}
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

export default SearchResult
