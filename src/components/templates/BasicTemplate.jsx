import BodyContainer from "./BodyContainer"
import SkipLink from "../atoms/SkipLink"
import Header from "../organisms/Header"
import Footer from "../organisms/Footer"
import useBigFontSizeStore from "../../lib/store/useBigFontSizeStore"

const BasicTemplate = ({ isNone, isNoBack, isNoSearch, isNoLogo, isSquareLogo, headerText, noSkipLink, children }) => {
  const { bigFontSize, setBigFontSize } = useBigFontSizeStore()

  return (
    <BodyContainer>
      {!noSkipLink && <SkipLink id="main" />}
      <Header
        isNone={isNone}
        isNoBack={isNoBack}
        isNoSearch={isNoSearch}
        isNoLogo={isNoLogo}
        isSquareLogo={isSquareLogo}
        headerText={headerText}
      />
      <div className="sticky top-[105px] z-50 mt-[20px] flex h-fit w-full items-center justify-end px-[25px]">
        <button
          className="h-fit w-fit rounded-[5px] border-[1px] border-gray-300 bg-[#f8f9fa] p-[5px_10px] transition-colors hover:bg-gray-200"
          onClick={() => setBigFontSize(!bigFontSize)}
          title={`글씨 ${bigFontSize ? "작게" : "크게"} 변경하기`}
        >
          <p className={`${bigFontSize ? "large-font-size" : "medium-font-size"} font-bold`} aria-hidden="true">
            {bigFontSize ? "작은" : "큰"} 글씨
          </p>
        </button>
      </div>
      {children}
      <Footer />
    </BodyContainer>
  )
}

export default BasicTemplate
