import { Link } from "react-router-dom"
import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import LoadingSpinner from "../../../atoms/LoadingSpinner"
import Empty from "../../../molecules/Empty"
import route from "../../../../router/route"
import Pagination from "../../../molecules/Pagination"
import useSearchResultController from "../controller/useSearchResultController"
import CallBtn from "../../../molecules/CallBtn"
import useBigFontSizeStore from "../../../../lib/store/useBigFontSizeStore"
import Seo from "../../../shared/Seo"
import { buildBreadcrumbStructuredData } from "../../../../lib/seo/structuredData"
import { buildCenterDetailPath, formatInfoText, getSiGunNameByCode } from "../../../../lib/seo/utils"

const SearchResult = () => {
  const { bigFontSize } = useBigFontSizeStore()
  const { totalCount, totalPages, data, isLoading, isError, handleCall, searchParams, page } = useSearchResultController()

  const sigunCode = searchParams.get("cd") || ""
  const querySigunName = searchParams.get("nm") || ""
  const sigunName = querySigunName || getSiGunNameByCode(sigunCode)

  const styleMapping = {
    infoSubText: `${bigFontSize ? "medium-font-size" : "small-font-size"} text-gray-500`,
  }

  const paginationParams = new URLSearchParams()

  if (sigunCode) {
    paginationParams.set("cd", sigunCode)
  }

  if (querySigunName) {
    paginationParams.set("nm", querySigunName)
  }

  const paginationQueryString = paginationParams.toString() ? `?${paginationParams.toString()}` : ""
  const pageTitle = sigunName ? `${sigunName} 무료급식소 검색 결과` : "무료급식소 검색 결과"
  const pageDescription = sigunName
    ? `${sigunName} 지역 무료급식소의 운영 정보, 급식 시간, 휴무일, 연락처를 확인할 수 있는 검색 결과 페이지입니다.`
    : "경기도 무료급식소 검색 결과와 운영 정보를 확인할 수 있는 페이지입니다."

  return (
    <>
      <Seo
        title={pageTitle}
        description={pageDescription}
        keywords={[sigunName ? `${sigunName} 무료급식소` : "경기도 무료급식소", "급식 시간", "급식 연락처"]}
        noindex={true}
        structuredData={buildBreadcrumbStructuredData([
          { name: "홈", item: route.home },
          { name: "무료급식소 검색", item: route.search },
          {
            name: sigunName ? `${sigunName} 검색 결과` : "검색 결과",
            item: paginationQueryString ? `${route.search_result}${paginationQueryString}` : route.search_result,
          },
        ])}
      />

      <a
        href="#pagination"
        className="absolute top-[-50px] z-100 flex h-10 w-full items-center justify-center bg-[#272829] font-[700] text-white transition-all duration-300 ease-in-out focus-visible:left-0 focus-visible:right-0 focus-visible:top-0"
      >
        페이지네이션 바로가기
      </a>

      <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"검색하기"}>
        <MainContainer>
          <div className="my-[20px] w-full pl-[20px]">
            <p className={`${bigFontSize ? "large-font-size" : "medium-font-size"}`} aria-hidden="true">
              전체 <b>{totalCount || 0}개</b>
            </p>
            <p className="sr-only">{`전체 시설 개수는 ${totalCount || 0}개입니다.`}</p>
          </div>

          {isLoading ? (
            <LoadingSpinner className={"h-[252px]"} />
          ) : isError ? (
            <Empty text="검색 결과를 불러오는 중 오류가 발생했습니다." />
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
                  <thead className="bg-gray-200">
                    <tr>
                      <th
                        className={`${bigFontSize ? "large-font-size" : "medium-font-size"} py-[10px] pl-[20px] text-left`}
                      >
                        시설 정보
                        <p className={`${bigFontSize ? "medium-font-size" : "small-font-size"} text-gray-700`}>
                          제목을 누르면 상세 페이지로 이동합니다.
                        </p>
                      </th>
                      <th className={`${bigFontSize ? "large-font-size" : "medium-font-size"}`}>연락처</th>
                    </tr>
                  </thead>

                  <tbody>
                    {data?.list.map((item, index) => {
                      const mealTargetInfo = formatInfoText(item?.MEALSRV_TARGET_INFO, "-")
                      const restDayInfo = formatInfoText(item?.RESTDAY_INFO, "-")
                      const detailPath = buildCenterDetailPath({
                        facilityName: item?.FACLT_NM,
                        sigunCode: item?.SIGUN_CD || sigunCode,
                        sigunName: item?.SIGUN_NM || sigunName,
                      })

                      return (
                        <tr key={index} className="border-y-[1px] border-gray-300">
                          <td>
                            <Link
                              className="flex min-h-[100px] h-fit w-full flex-col justify-center p-[20px]"
                              to={detailPath}
                              state={{ item }}
                              aria-label={`${item?.FACLT_NM} 상세 페이지로 이동하기`}
                            >
                              <p
                                className={`${bigFontSize ? "large-font-size" : "medium-font-size"} self-start text-left font-[500] text-[#272829]`}
                              >
                                {item?.FACLT_NM || "-"}
                              </p>
                              <p className={styleMapping.infoSubText}>{mealTargetInfo}</p>
                              <span className="sr-only">
                                {item?.MEALSRV_TARGET_INFO
                                  ? `급식 대상은 ${mealTargetInfo}입니다.`
                                  : "급식 대상 정보가 등록되지 않았습니다."}
                              </span>
                              <p className={styleMapping.infoSubText}>{restDayInfo}</p>
                              <span className="sr-only">
                                {item?.RESTDAY_INFO ? `휴무 요일은 ${restDayInfo}입니다.` : "휴무 요일 정보가 등록되지 않았습니다."}
                              </span>
                              <p className={styleMapping.infoSubText}>{item?.MEALSRV_TM_INFO || "-"}</p>
                              <span className="sr-only">
                                {item?.MEALSRV_TM_INFO
                                  ? `급식 시간은 ${item?.MEALSRV_TM_INFO}입니다.`
                                  : "급식 시간 정보가 등록되지 않았습니다."}
                              </span>
                            </Link>
                          </td>

                          <td>
                            <div className="flex h-[50px] w-full items-center justify-center p-[20px]">
                              {item?.MANAGE_INST_TELNO ? (
                                <CallBtn onClick={() => handleCall(item.MANAGE_INST_TELNO)} />
                              ) : (
                                <>
                                  <span className="font-[500]" aria-hidden="true">
                                    -
                                  </span>
                                  <span className="sr-only">전화번호 정보가 등록되지 않았습니다.</span>
                                </>
                              )}
                            </div>
                          </td>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              )}

              <Pagination
                route={route.search_result}
                currentPage={page}
                queryString={paginationQueryString}
                totalPages={totalPages || 1}
                rangeSize={5}
              />
            </>
          )}
        </MainContainer>
      </BasicTemplate>
    </>
  )
}

export default SearchResult
