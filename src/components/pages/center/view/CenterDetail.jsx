import { basicTextBold } from "../../../../lib/constants/style/basicText"
import { largeTextBold } from "../../../../lib/constants/style/largeText"
import { mediumTextBold } from "../../../../lib/constants/style/mediumText"
import CallBtn from "../../../molecules/CallBtn"
import CopyBtn from "../../../molecules/CopyBtn"
import BasicTemplate from "../../../templates/BasicTemplate"
import MainContainer from "../../../templates/MainContainer"
import useCenterDetailController from "../controller/useCenterDetailController"
import KakaoMap from "./_components/KakaoMap"

const CenterDetail = () => {
  const { data, detailList, addressList, handleCall, handleCopy } = useCenterDetailController()

  const styleMapping = {
    section: "w-full flex flex-col gap-[10px]",
    sectionTitle: `${mediumTextBold}`,
    ul: "w-full flex flex-col gap-[10px]",
    list: "w-full flex flex-col",
    detailTitle: `${basicTextBold} w-[130px]`,
    detailContent: `${basicTextBold} text-gray-500 break-words`,
  }

  return (
    <BasicTemplate isNoBack={false} isNoLogo={true} isNoSearch={true} isSquareLogo={true} headerText={"시설정보"}>
      <MainContainer>
        <div className="w-[100%] px-[20px]">
          <div className="flex flex-col gap-[20px] p-[20px] bg-white border-[1px] border-gray-200 rounded-[8px]">
            <section className="w-full flex items-center justify-between border-b-[1px] border-gray-200 pb-[10px]">
              <h1 className={largeTextBold}>{data?.FACLT_NM || ""}</h1>
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
              <ul className={`${styleMapping.ul} border-b-[1px] border-gray-200 pb-[10px]`}>
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
                          handleCopy(item.content)
                        }}
                      />
                    </div>
                    <p className={styleMapping.detailContent}>{item.content}</p>
                  </li>
                ))}
              </ul>
              <KakaoMap />
            </section>
          </div>
        </div>
      </MainContainer>
    </BasicTemplate>
  )
}

export default CenterDetail
