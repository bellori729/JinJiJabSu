import { basicTextBold } from "../../../../lib/constants/style/basicText"
import { largeTextBold } from "../../../../lib/constants/style/largeText"
import { mediumTextBold } from "../../../../lib/constants/style/mediumText"
import useBigFontSizeStore from "../../../../lib/store/useBigFontSizeStore"
import CallBtn from "../../../molecules/CallBtn"
import CopyBtn from "../../../molecules/CopyBtn"
import Empty from "../../../molecules/Empty"
import LoadingSpinner from "../../../atoms/LoadingSpinner"
import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import useCenterDetailController from "../controller/useCenterDetailController"
import KakaoMap from "./_components/KakaoMap"
import Seo from "../../../shared/Seo"
import { buildBreadcrumbStructuredData, buildPlaceStructuredData } from "../../../../lib/seo/structuredData"
import { buildCenterDetailPath, formatInfoText } from "../../../../lib/seo/utils"
import route from "../../../../router/route"

const CenterDetail = () => {
  const { bigFontSize } = useBigFontSizeStore()
  const {
    data,
    detailList,
    addressList,
    handleCall,
    handleCopy,
    isMapLoaded,
    isLoading,
    requestedFacilityName,
    requestedSigunName,
  } = useCenterDetailController()

  const styleMapping = {
    section: "flex w-full flex-col gap-[10px]",
    sectionTitle: `${mediumTextBold} ${bigFontSize && "large-font-size"}`,
    ul: "flex w-full flex-col gap-[20px]",
    list: "flex w-full flex-col",
    detailTitle: `${basicTextBold} ${bigFontSize && "medium-font-size"}`,
    detailContent: `${basicTextBold} ${bigFontSize && "medium-font-size"} break-words text-gray-500`,
  }

  const facilityName = data?.FACLT_NM || requestedFacilityName || "무료급식소 상세 정보"
  const sigunName = data?.SIGUN_NM || requestedSigunName || ""
  const summaryText = data
    ? `${sigunName ? `${sigunName} ` : ""}${facilityName}의 급식 대상 ${formatInfoText(
        data?.MEALSRV_TARGET_INFO,
        "정보 미등록",
      )}, 급식 시간 ${data?.MEALSRV_TM_INFO || "정보 미등록"}, 연락처와 위치를 확인할 수 있습니다.`
    : "선택한 무료급식소의 상세 운영 정보를 확인할 수 있는 페이지입니다."

  const structuredData = data
    ? [
        buildBreadcrumbStructuredData([
          { name: "홈", item: route.home },
          { name: "무료급식소 검색", item: route.search },
          {
            name: sigunName ? `${sigunName} 검색 결과` : "검색 결과",
            item: sigunName ? `${route.search_result}?nm=${encodeURIComponent(sigunName)}` : route.search_result,
          },
          { name: facilityName, item: buildCenterDetailPath({ facilityName, sigunCode: data?.SIGUN_CD, sigunName }) },
        ]),
        buildPlaceStructuredData({
          name: facilityName,
          description: summaryText,
          url: buildCenterDetailPath({ facilityName, sigunCode: data?.SIGUN_CD, sigunName }),
          telephone: data?.MANAGE_INST_TELNO,
          address: data?.REFINE_ROADNM_ADDR || data?.REFINE_LOTNO_ADDR,
        }),
      ]
    : undefined

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"시설정보"}>
      <Seo
        title={facilityName}
        description={summaryText}
        keywords={[facilityName, sigunName ? `${sigunName} 무료급식소` : "무료급식소 상세", "급식 시간", "급식 위치"]}
        noindex={!requestedFacilityName}
        structuredData={structuredData}
      />

      <MainContainer>
        {isLoading ? (
          <LoadingSpinner className={"h-[500px]"} />
        ) : data ? (
          <div className="mt-[20px] w-[100%] px-[20px]">
            <div className="flex flex-col gap-[20px] rounded-[8px] border-[1px] border-gray-200 bg-white p-[20px]">
              <section className="flex w-full items-center justify-between border-b-[1px] border-gray-200 pb-[10px]">
                <h1 className={`${largeTextBold} ${bigFontSize && "x-large-font-size"} max-w-[calc(100%-40px)]`}>
                  {data?.FACLT_NM || ""}
                </h1>
                {data?.MANAGE_INST_TELNO && (
                  <CallBtn
                    onClick={() => {
                      handleCall(data?.MANAGE_INST_TELNO)
                    }}
                  />
                )}
              </section>

              <section className={styleMapping.section}>
                <h2 className={styleMapping.sectionTitle}>상세 정보</h2>
                <ul className={`${styleMapping.ul} border-b-[1px] border-gray-200 pb-[20px]`}>
                  {detailList.map((item, index) => (
                    <li key={index} className={styleMapping.list}>
                      <p className={styleMapping.detailTitle}>{item.title}</p>
                      <p className={styleMapping.detailContent}>{item.content}</p>
                    </li>
                  ))}
                </ul>
              </section>

              <section className={styleMapping.section}>
                <h2 className={styleMapping.sectionTitle}>위치</h2>
                <ul className={styleMapping.ul}>
                  {addressList.map((item, index) => (
                    <li key={index} className={styleMapping.list}>
                      <div className="flex items-center gap-[10px]">
                        <p className={`${styleMapping.detailTitle} w-fit`}>{item.title}</p>
                        <CopyBtn
                          onClick={() => {
                            if (!item.copy) {
                              alert(item.content)
                              return
                            }

                            handleCopy(item.content)
                          }}
                        />
                      </div>
                      <p className={styleMapping.detailContent}>{item.content}</p>
                    </li>
                  ))}
                </ul>

                {isMapLoaded ? (
                  <KakaoMap />
                ) : (
                  <Empty className="!h-[500px]" text="지도를 불러오지 못했습니다." />
                )}
              </section>
            </div>
          </div>
        ) : (
          <Empty className="!h-[500px]" text="시설 정보를 불러오지 못했습니다." />
        )}
      </MainContainer>
    </BasicTemplate>
  )
}

export default CenterDetail
