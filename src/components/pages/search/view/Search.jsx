import { useMemo } from "react"
import siGunLogoPath from "../../../../lib/constants/siGunLogoPath"
import siGunCode from "../../../../lib/constants/siGunCode"
import route from "../../../../router/route"
import MoveUpAnimation from "../../../atoms/MoveUpAnimation"
import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import SiGunLogo from "../../../atoms/SiGunLogo"
import useSearchController from "../controller/useSearchController"
import useImagePreloader from "../../../../lib/hooks/useImagePreloader"
import LoadingSpinner from "../../../atoms/LoadingSpinner"
import useBigFontSizeStore from "../../../../lib/store/useBigFontSizeStore"
import Seo from "../../../shared/Seo"
import { buildBreadcrumbStructuredData } from "../../../../lib/seo/structuredData"

const Search = () => {
  const { bigFontSize } = useBigFontSizeStore()
  const { navigate } = useSearchController()

  const imageUrls = useMemo(() => Object.values(siGunLogoPath), [])
  const imageLoaded = useImagePreloader(imageUrls)

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"검색하기"}>
      <Seo
        title="무료급식소 검색"
        description="경기도 시군별 무료급식소 정보를 지역별로 찾아보세요. 원하는 지역을 선택해 운영 시간과 연락처를 확인할 수 있습니다."
        path={route.search}
        keywords={["무료급식소 검색", "경기도 시군", "어르신 복지", "경기도 무료급식소"]}
        structuredData={buildBreadcrumbStructuredData([
          { name: "홈", item: route.home },
          { name: "무료급식소 검색", item: route.search },
        ])}
      />
      <MainContainer>
        {imageLoaded ? (
          <>
            <MoveUpAnimation
              className="mt-[40px] mb-[60px] flex w-full justify-center px-[20px]"
              durationTime={0.8}
              delayTime={0}
            >
              <h1 className={`${bigFontSize ? "x-large-font-size" : "large-font-size"} text-basic-black font-bold`}>
                어르신이 계신 지역을 선택해 주세요
              </h1>
            </MoveUpAnimation>

            <p className="sr-only">
              경기도 시군별 무료급식소를 검색할 수 있는 페이지입니다. 지역 버튼을 선택하면 해당 지역의 무료급식소
              목록으로 이동합니다.
            </p>

            <div className="flex w-full flex-wrap items-center justify-center gap-[15px] px-[20px] sm:gap-[15px] md:gap-[20px] lg:gap-[30px]">
              {Object.keys(siGunLogoPath).map((key) => {
                return (
                  <MoveUpAnimation key={key} className="cursor-pointer" durationTime={0.8} delayTime={0}>
                    <button
                      title={`${key} 지역 무료급식소 검색하기`}
                      onClick={() => navigate(`${route.search_result}?cd=${siGunCode[key]}`)}
                    >
                      <SiGunLogo path={siGunLogoPath[key]} alt={`${key} 로고`} />
                    </button>
                  </MoveUpAnimation>
                )
              })}
            </div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </MainContainer>
    </BasicTemplate>
  )
}

export default Search
