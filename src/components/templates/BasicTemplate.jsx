import BodyContainer from "./BodyContainer"
import SkipLink from "../atoms/SkipLink"
import Header from "../organisms/Header"
// import Navigation from "../organisms/Navigation"
import Footer from "../organisms/Footer"
import useBigFontSizeStore from "../../lib/store/useBigFontSizeStore"

const BasicTemplate = ({ isNone, isNoBack, isNoSearch, isNoLogo, isSquareLogo, headerText, noSkipLink, children }) => {
  const { bigFontSize, setBigFontSize } = useBigFontSizeStore()

  return (
    <BodyContainer>
      {!noSkipLink && (
        <>
          <SkipLink id="main" />
          {/* <SkipLink id="navigation" text="네비게이션 바로가기" /> */}
        </>
      )}
      <Header
        isNone={isNone}
        isNoBack={isNoBack}
        isNoSearch={isNoSearch}
        isNoLogo={isNoLogo}
        isSquareLogo={isSquareLogo}
        headerText={headerText}
      />
      <div className="w-full h-fit px-[25px] flex justify-end items-center mt-[20px] sticky top-[105px] z-50">
        <button
          className={`w-fit h-fit p-[5px_10px] bg-[#f8f9fa] border-[1px] border-gray-300 rounded-[5px] hover:bg-gray-200 transition-colors`}
          onClick={() => setBigFontSize(!bigFontSize)}
          aria-label={`이 버튼은 글씨 크기를 변경하는 버튼입니다. 클릭하면 글씨 크기가 ${bigFontSize ? "작아집니다" : "커집니다"}.`}
        >
          <p className={`${bigFontSize ? "large-font-size" : "medium-font-size"} font-bold`} aria-hidden="true">
            {bigFontSize ? "작은" : "큰"} 글씨
          </p>
        </button>
      </div>
      {children}
      <Footer />
      {/* <Navigation /> */}
    </BodyContainer>
  )
}

export default BasicTemplate
