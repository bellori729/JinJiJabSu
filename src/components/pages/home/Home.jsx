import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"
import MoveUpAnimation from "../../atoms/MoveUpAnimation"
import MoveUpOrderAnimationText from "../../atoms/MoveUpOrderAnimationText"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import route from "../../../router/route"

const Home = () => {
  const navigate = useNavigate()

  const [imagesLoaded, setImagesLoaded] = useState(false)

  const imageUrls = [
    "/assets/images/phone.png",
    "/assets/images/si_gun_group.png",
    "/assets/images/uijeongbu_sijang.png",
  ]

  // 이미지 미리 로드 함수
  useEffect(() => {
    const preloadImages = async () => {
      const promises = imageUrls.map((src) => {
        return new Promise((resolve) => {
          const img = new Image()
          img.src = src
          img.onload = resolve // 이미지가 로드되면 resolve 호출
        })
      })

      await Promise.all(promises)
      setImagesLoaded(true) // 모든 이미지가 로드되면 상태 변경
    }

    preloadImages()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps

  const [animationController, setAnimationController] = useState({
    first: false,
    second: false,
    third: false,
    fourth: false,
    fifth: false,
    sixth: false,
  })

  return (
    <BasicTemplate isNoBack={true}>
      <MainContainer className={"h-fit min-h-[1663px]"}>
        <div className="flex flex-col my-[40px] px-[20px]">
          <MoveUpAnimation className="large-font-size font-bold" durationTime={0.8} delayTime={0}>
            어르신!
          </MoveUpAnimation>

          <MoveUpAnimation
            className="large-font-size font-bold"
            durationTime={0.8}
            delayTime={0.8}
            onAnimationComplete={() => {
              setAnimationController((prev) => {
                return { ...prev, first: true }
              })
            }}
          >
            진지잡수~
          </MoveUpAnimation>
        </div>

        {animationController.first && (
          <div className="px-[20px]">
            <MoveUpOrderAnimationText
              className="text-[#272829]"
              text="진지잡수 는 경기도 내 어르신을 대상으로 하는 무료급식소 현황을 확인할 수 있는 서비스입니다."
              highlightWords={{
                진지잡수: "text-basic-blue font-bold", // 파란색 + 굵게
                경기도: "text-basic-green font-bold", // 초록색 + 굵게
              }}
              onAnimationComplete={() => {
                setAnimationController((prev) => {
                  return { ...prev, second: true }
                })
              }}
            />
          </div>
        )}

        {animationController.second && (
          <div className="flex justify-end my-[40px] px-[20px]">
            {imagesLoaded && (
              <MoveUpAnimation
                durationTime={0.8}
                onAnimationComplete={() => {
                  setAnimationController((prev) => {
                    return { ...prev, third: true }
                  })
                }}
              >
                <img
                  className="w-[187px] h-[261px] md:w-[374px] md:h-[522px] lg:w-[561px] lg:h-[783px]"
                  src={imageUrls[0]}
                  alt="phone"
                />
              </MoveUpAnimation>
            )}
          </div>
        )}

        {animationController.third && (
          // <MoveUpOrderAnimationText
          //   className="text-[#272829]"
          //   text="어르신께서 거주하시는 시/군에서 운영 중인 무료급식소의 정보를 한 눈에 확인하실 수 있어요!"
          //   highlightWords={{}}
          //   onAnimationComplete={() => {
          //     setAnimationController((prev) => {
          //       return { ...prev, fourth: true }
          //     })
          //   }}
          // />
          <MoveUpAnimation
            className="text-[#272829] px-[20px]"
            onAnimationComplete={() => {
              setAnimationController((prev) => {
                return { ...prev, fourth: true }
              })
            }}
          >
            어르신께서 거주하시는 시/군에서 운영 중인 무료급식소의 정보를 한 눈에 확인하실 수 있어요!
          </MoveUpAnimation>
        )}

        {animationController.fourth && imagesLoaded && (
          <MoveUpAnimation
            className="w-full h-auto flex justify-center mt-[40px] px-[20px]"
            onAnimationComplete={() => {
              setAnimationController((prev) => {
                return { ...prev, fifth: true }
              })
            }}
          >
            <img
              className="w-[320px] h-[285px] md:w-[640px] md:h-[570px] lg:w-[960px] lg:h-[855px]"
              src={imageUrls[1]}
              alt="경기도 산하 시군구가 모여있는 그룹 이미지"
            />
          </MoveUpAnimation>
        )}

        {animationController.fifth && (
          <div className="flex mt-[40px]">
            {/* <MoveUpOrderAnimationText
              className="text-[#272829]"
              text="경기도 내 타 지역으로 가시더라도 검색을 통해 해당 지역의 무료 급식소를 확인하실 수 있습니다."
              highlightWords={{}}
              onAnimationComplete={() => {
                setAnimationController((prev) => {
                  return { ...prev, fifth: true }
                })
              }}
            /> */}

            <MoveUpAnimation
              className="text-[#272829] px-[20px]"
              onAnimationComplete={() => {
                setAnimationController((prev) => {
                  return { ...prev, sixth: true }
                })
              }}
            >
              경기도 내 타 지역으로 가시더라도 검색을 통해 해당 지역의 무료 급식소를 확인하실 수 있습니다.
            </MoveUpAnimation>
          </div>
        )}
        {animationController.sixth && imagesLoaded && (
          <motion.div
            className="w-full h-[490px] relative"
            initial={{ opacity: 0 }}
            // animate={{ opacity: 1 }}
            whileInView={{ opacity: 1 }} // 화면에 보이면 나타나기
            viewport={{ once: true, amount: 0.3 }} // 한 번만 애니메이션 (화면에 30% 들어오면 애니메이션)
            transition={{ duration: 1.0, ease: "easeOut" }}
          >
            {/* 이미지 페이드인 */}
            <img
              className="w-full h-full object-cover"
              src={imageUrls[2]}
              alt="제33대 경기도 의정부시 김동근 시장이 어르신들에게 무료급식을 나눠주고 있습니다."
            />

            <MoveUpAnimation className="absolute top-0 left-0 w-full h-full pt-[171px] flex flex-col items-center gap-[45px] z-30">
              <p className="text-[#272829] text-center large-font-size font-bold drop-shadow-[0px_4px_4px_rgba(0,0,0,0.25)]">
                진지 거르시지 마시고
                <br />
                꼭! 진지 잡수세요
              </p>

              <motion.button
                className={`px-[26px] py-[13px] rounded-[20px] bg-basic-green text-white large-font-size font-bold shadow-[0px_4px_4px_rgba(0,0,0,0.25)]`}
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
        )}
      </MainContainer>
    </BasicTemplate>
  )
}

export default Home
