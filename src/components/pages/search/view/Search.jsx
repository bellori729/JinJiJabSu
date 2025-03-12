import siGunLogoPath from "../../../../lib/constants/siGunLogoPath"
import route from "../../../../router/route"
import MoveUpAnimation from "../../../atoms/MoveUpAnimation"
import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import siGunCode from "../../../../lib/constants/siGunCode"
import SiGunLogo from "../../../atoms/SiGunLogo"
import useSearchController from "../controller/useSearchController"
import useImagePreloader from "../../../../lib/hooks/useImagePreloader"
import LoadingSpinner from "../../../atoms/LoadingSpinner"
import { useMemo } from "react"
import useBigFontSizeStore from "../../../../lib/store/useBigFontSizeStore"

const Search = () => {
  const { bigFontSize } = useBigFontSizeStore()

  const { navigate } = useSearchController()

  const imageUrls = useMemo(() => Object.values(siGunLogoPath), [])

  const imageLoaded = useImagePreloader(imageUrls)

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"검색하기"}>
      <MainContainer>
        {imageLoaded ? (
          <>
            <p className="sr-only">이곳은 검색하기 페이지입니다.</p>
            <MoveUpAnimation
              className="w-full px-[20px] flex justify-center mt-[40px] mb-[60px]"
              durationTime={0.8}
              delayTime={0}
            >
              <h1 className={`${bigFontSize ? "x-large-font-size" : "large-font-size"} text-basic-black font-bold`}>
                어르신께서 계신 지역은 어디인가요?
              </h1>
            </MoveUpAnimation>
            <p className="sr-only">
              아래에는 경기도 내의 시군구별로 어르신을 위한 시설을 검색할 수 있는 버튼들이 있습니다. 버튼을 클릭하면
              해당 지역의 어르신을 위한 무료 급식소를 검색할 수 있습니다.
            </p>

            <div className="w-full flex flex-wrap items-center justify-center px-[20px] gap-[15px] sm:gap-[15px] md:gap-[20px] lg:gap-[30px]">
              {Object.keys(siGunLogoPath).map((key) => {
                return (
                  <MoveUpAnimation key={key} className="cursor-pointer" durationTime={0.8} delayTime={0}>
                    <button
                      title={`${key} 지역 무료 급식소 검색하기`}
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
