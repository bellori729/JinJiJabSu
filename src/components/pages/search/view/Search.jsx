import siGunLogoPath from "../../../../lib/constants/siGunLogoPath"
import route from "../../../../router/route"
import MoveUpAnimation from "../../../atoms/MoveUpAnimation"
import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import siGunCode from "../../../../lib/constants/siGunCode"
import SiGunLogo from "../../../atoms/SiGunLogo"
import useSearchController from "../controller/useSearchController"

const Search = () => {
  const { navigate } = useSearchController()

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"검색하기"}>
      <MainContainer>
        <MoveUpAnimation
          className="w-full px-[20px] flex justify-center mt-[40px] mb-[60px]"
          durationTime={0.8}
          delayTime={0}
        >
          <h1 className="text-basic-black font-bold large-font-size">어르신께서 계신 지역은 어디인가요?</h1>
        </MoveUpAnimation>

        <div className="w-full flex flex-wrap items-center justify-center px-[20px] gap-[15px] sm:gap-[15px] md:gap-[20px] lg:gap-[30px]">
          {Object.keys(siGunLogoPath).map((key) => {
            return (
              <MoveUpAnimation key={key} className="cursor-pointer" durationTime={0.8} delayTime={0}>
                <button
                  title={`클릭하시면 ${key} 지역의 어르신을 위한 시설을 검색할 수 있습니다.`}
                  onClick={() => navigate(`${route.search_result}?cd=${siGunCode[key]}`)}
                >
                  <SiGunLogo path={siGunLogoPath[key]} alt={`${key} 로고`} />
                </button>
              </MoveUpAnimation>
            )
          })}
        </div>
      </MainContainer>
    </BasicTemplate>
  )
}

export default Search
