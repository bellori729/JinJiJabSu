import { basicTextBold } from "../../../../lib/constants/style/basicText"
import { largeTextBold } from "../../../../lib/constants/style/largeText"
import { mediumTextBold } from "../../../../lib/constants/style/mediumText"
import useBigFontSizeStore from "../../../../lib/store/useBigFontSizeStore"
import CallBtn from "../../../molecules/CallBtn"
import CopyBtn from "../../../molecules/CopyBtn"
import Empty from "../../../molecules/Empty"
import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import useCenterDetailController from "../controller/useCenterDetailController"
import KakaoMap from "./_components/KakaoMap"

const CenterDetail = () => {
  const { bigFontSize } = useBigFontSizeStore()

  const { data, detailList, addressList, handleCall, handleCopy, isMapLoaded } = useCenterDetailController()

  const styleMapping = {
    section: "w-full flex flex-col gap-[10px]",
    sectionTitle: `${mediumTextBold} ${bigFontSize && "large-font-size"}`,
    ul: "w-full flex flex-col gap-[20px]",
    list: "w-full flex flex-col",
    detailTitle: `${basicTextBold} ${bigFontSize && "medium-font-size"}`,
    detailContent: `${basicTextBold} ${bigFontSize && "medium-font-size"} text-gray-500 break-words`,
  }

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"시설정보"}>
      <MainContainer>
        <div className="w-[100%] px-[20px] mt-[20px]">
          <div className="flex flex-col gap-[20px] p-[20px] bg-white border-[1px] border-gray-200 rounded-[8px]">
            <section className="w-full flex items-center justify-between border-b-[1px] border-gray-200 pb-[10px]">
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
              <h2 className={styleMapping.sectionTitle}>상세</h2>
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
                          if (!item.copy) return alert(item.content)

                          handleCopy(item.content)
                        }}
                      />
                    </div>
                    <p className={styleMapping.detailContent}>{item.content}</p>
                  </li>
                ))}
              </ul>
              {isMapLoaded ? <KakaoMap /> : <Empty className="!h-[500px]" text="지도를 불러오는 데 실패했습니다." />}
            </section>
          </div>
        </div>
      </MainContainer>
    </BasicTemplate>
  )
}

export default CenterDetail
