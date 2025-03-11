import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"
import MoveUpAnimation from "../../atoms/MoveUpAnimation"
// import MoveUpOrderAnimationText from "../../atoms/MoveUpOrderAnimationText"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import route from "../../../router/route"
import useImagePreloader from "../../../lib/hooks/useImagePreloader"
import LoadingSpinner from "../../atoms/LoadingSpinner"
import useBigFontSizeStore from "../../../lib/store/useBigFontSizeStore"

const Home = () => {
  const { bigFontSize } = useBigFontSizeStore()

  const navigate = useNavigate()

  const imageUrls = [
    "/assets/images/phone.png",
    "/assets/images/si_gun_group.png",
    "/assets/images/uijeongbu_sijang.png",
  ]

  const imageLoaded = useImagePreloader(imageUrls)

  return (
    <BasicTemplate isNoBack={true}>
      <MainContainer className={"!min-h-[1528px] md:!min-h-[2074px] lg:!min-h-[2330px]"}>
        {imageLoaded ? (
          <>
            <div className="flex flex-col my-[40px] px-[20px]">
              <MoveUpAnimation durationTime={0.6}>
                <p className={`${bigFontSize ? "x-large-font-size" : "large-font-size"} font-bold`}>
                  어르신! 진지잡수~
                </p>
              </MoveUpAnimation>
            </div>

            <MoveUpAnimation className="px-[20px]" durationTime={0.6}>
              <p className={`${bigFontSize ? "large-font-size" : "medium-font-size"} text-basic-blue font-bold inline`}>
                진지잡수
              </p>
              는{" "}
              <p
                className={`${bigFontSize ? "large-font-size" : "medium-font-size"} text-basic-green font-bold inline`}
              >
                경기도
              </p>{" "}
              내 어르신을 대상으로 하는 무료급식소 현황을 확인할 수 있는 서비스입니다.
            </MoveUpAnimation>
            {/* <div >
          <MoveUpOrderAnimationText
            className="text-[#272829]"
            delayTime={1.6}
            text="진지잡수 는 경기도 내 어르신을 대상으로 하는 무료급식소 현황을 확인할 수 있는 서비스입니다."
            highlightWords={{
              진지잡수: "text-basic-blue font-bold", // 파란색 + 굵게
              경기도: "text-basic-green font-bold", // 초록색 + 굵게
            }}
          />
        </div> */}

            <div className="flex justify-end my-[40px] px-[20px]">
              <MoveUpAnimation durationTime={0.6}>
                <img className="w-[187px] h-[261px] md:w-[374px] md:h-[522px]" src={imageUrls[0]} alt="" />
              </MoveUpAnimation>
            </div>

            <MoveUpAnimation className={`px-[20px]`}>
              <p className={`${bigFontSize ? "large-font-size" : "medium-font-size"} text-[#272829]`}>
                어르신께서 거주하시는 시/군에서 운영 중인 무료급식소의 정보를 한 눈에 확인하실 수 있어요!
              </p>
            </MoveUpAnimation>

            <MoveUpAnimation className="w-full h-auto flex justify-center mt-[40px] px-[20px]" amountRatio={0.3}>
              <img
                className="w-[320px] h-[285px] md:w-[640px] md:h-[570px] lg:w-[960px] lg:h-[855px]"
                src={imageUrls[1]}
                alt="경기도 산하 시군구 별 로고"
              />
            </MoveUpAnimation>

            <MoveUpAnimation className="my-[40px] px-[20px]" durationTime={0.6} amountRatio={1}>
              <p className={`${bigFontSize ? "large-font-size" : "medium-font-size"} text-[#272829]`}>
                경기도 내 타 지역으로 가시더라도 검색을 통해 해당 지역의 무료 급식소를 확인하실 수 있습니다.
              </p>
            </MoveUpAnimation>

            <motion.div
              className="w-full h-[490px] relative"
              initial={{ opacity: 0 }}
              // animate={{ opacity: 1 }}
              whileInView={{ opacity: 1 }} // 화면에 보이면 나타나기
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              {/* 이미지 페이드인 */}
              <img
                className="w-full h-full object-cover"
                src={imageUrls[2]}
                alt="제33대 경기도 의정부시 김동근 시장이 어르신들에게 무료급식을 나눠주고 있습니다."
              />

              <MoveUpAnimation className="absolute top-0 left-0 w-full h-full pt-[171px] flex flex-col items-center gap-[45px] z-30">
                <p
                  className={`${bigFontSize ? "x-large-font-size" : "large-font-size"} text-[#272829] text-center font-bold drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}
                >
                  진지 거르시지 마시고
                  <br />
                  꼭! 진지 잡수세요
                </p>

                <motion.button
                  className={`${bigFontSize ? "x-large-font-size" : "large-font-size"} px-[26px] py-[13px] rounded-[20px] bg-basic-green text-white font-bold shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}
                  animate={{
                    y: [0, -10, 0], // 0 → 위로 10px → 다시 원래 위치 (반복)
                  }}
                  transition={{
                    duration: 1,
                    repeat: Infinity, // 무한 반복
                    repeatType: "reverse", // 위아래 왕복 (부드러운 반복)
                    ease: "easeInOut", // 부드러운 움직임
                  }}
                  onClick={() => {
                    navigate(route.search)
                  }}
                >
                  무료급식소 찾기
                </motion.button>
              </MoveUpAnimation>

              {/* 그라디언트 오버레이 */}
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#F8F9FA] to-transparent z-10" />
              <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#0A82AE00] via-[#0A82AE4D] to-[#0A82AE99] z-20" />
            </motion.div>
          </>
        ) : (
          <LoadingSpinner />
        )}
      </MainContainer>
    </BasicTemplate>
  )
}

export default Home
