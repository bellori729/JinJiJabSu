import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import useCenterDetailController from "../controller/useCenterDetailController"
import KakaoMap from "./_components/kakaoMap"

const CenterDetail = () => {
  const { data } = useCenterDetailController()

  console.log(data)

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"검색하기"}>
      <MainContainer>
        <div className="w-[100%] px-[20px]">
          <div className="p-[20px] bg-white border-[1px] border-gray-200 rounded-[8px]">
            <KakaoMap />
          </div>
        </div>
      </MainContainer>
    </BasicTemplate>
  )
}

export default CenterDetail
