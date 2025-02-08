import BodyContainer from "./BodyContainer"
import SkipLink from "../atoms/SkipLink"
import Header from "../organisms/Header"
import Navigation from "../organisms/Navigation"

const BasicTemplate = ({ isNone, isNoBack, isNoSearch, isNoLogo, isSquareLogo, headerText, noSkipLink, children }) => {
  return (
    <BodyContainer>
      {!noSkipLink && (
        <>
          <SkipLink id="main" />
          <SkipLink id="navigation" text="네비게이션 바로가기" />
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
      {children}
      <Navigation />
    </BodyContainer>
  )
}

export default BasicTemplate
