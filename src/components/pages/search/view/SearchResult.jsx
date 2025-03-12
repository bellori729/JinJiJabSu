import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import LoadingSpinner from "../../../atoms/LoadingSpinner"
import Empty from "../../../molecules/Empty"
import route from "../../../../router/route"
import Pagination from "../../../molecules/Pagination"
import useSearchResultController from "../controller/useSearchResultController"
import CallBtn from "../../../molecules/CallBtn"
import useBigFontSizeStore from "../../../../lib/store/useBigFontSizeStore"

const SearchResult = () => {
  const { bigFontSize } = useBigFontSizeStore()

  const { totalCount, totalPages, data, isLoading, isError, navigate, handleCall, searchParams, page } =
    useSearchResultController()

  const styleMapping = {
    infoSubText: `${bigFontSize ? "medium-font-size" : "small-font-size"} text-gray-500`,
  }

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"검색하기"}>
      <MainContainer>
        <div className={`w-full pl-[20px] my-[20px]`}>
          <p className={`${bigFontSize ? "large-font-size" : "medium-font-size"}`} aria-hidden="true">
            전체 <b>{totalCount || 0}개</b>
          </p>
          <p className="sr-only">전체 시설 개수는 {totalCount || 0}개 입니다.</p>
        </div>
        {isLoading ? (
          <LoadingSpinner className={"h-[252px]"} />
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
                    <th
                      className={`${bigFontSize ? "large-font-size" : "medium-font-size"} pl-[20px] py-[10px] text-left`}
                    >
                      시설정보
                      <br />
                      <p
                        className={`${bigFontSize ? "medium-font-size" : "small-font-size"} text-gray-700`}
                        aria-hidden="true"
                      >
                        제목 클릭 시 상세 페이지 이동
                      </p>
                      <p className="sr-only">
                        시설 정보는 시설명, 급식 대상, 급식 요일, 급식 시간으로 구성되어 있습니다. 시설명을 클릭하면
                        상세 페이지로 이동합니다.
                      </p>
                    </th>
                    <th className={`${bigFontSize ? "large-font-size" : "medium-font-size"}`}>
                      연락처
                      <p className="sr-only">
                        시설의 연락처 정보가 있을 경우 전화 걸기 버튼을 클릭하면 전화를 걸 수 있습니다.
                      </p>
                    </th>
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
                          <button
                            className={`self-start`}
                            aria-label={`${item?.FACLT_NM} 시설의 상세 페이지로 이동하기`}
                          >
                            <p
                              className={`${bigFontSize ? "large-font-size" : "medium-font-size"} text-[#272829] font-[500]`}
                              aria-hidden="true"
                            >
                              {item?.FACLT_NM || "-"}
                            </p>
                          </button>
                          <p className={styleMapping.infoSubText}>
                            <span className="sr-only">급식 대상은 </span>
                            {item?.MEALSRV_TARGET_INFO.replaceAll("+", ", ") || "-"}
                            <span className="sr-only"> 입니다.</span>
                          </p>
                          <p className={styleMapping.infoSubText}>
                            <span className="sr-only">급식 요일은 </span>
                            {item?.RESTDAY_INFO.replaceAll("+", ", ") || "-"}
                            <span className="sr-only"> 입니다.</span>
                          </p>
                          <p className={styleMapping.infoSubText}>
                            <span className="sr-only">급식 시간은 </span>
                            {item?.MEALSRV_TM_INFO || "-"}
                            <span className="sr-only"> 입니다.</span>
                          </p>
                        </div>
                      </td>

                      <td>
                        <div className="p-[20px] w-full h-[50px] flex items-center justify-center">
                          {item?.MANAGE_INST_TELNO ? (
                            <CallBtn onClick={() => handleCall(item.MANAGE_INST_TELNO)} />
                          ) : (
                            <span className="font-[500]">-</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
          </>
        )}
      </MainContainer>
    </BasicTemplate>
  )
}

export default SearchResult
