import BodyContainer from "./BodyContainer"
import SkipLink from "../atoms/SkipLink"
import Header from "../organisms/Header"
import Navigation from "../organisms/Navigation"

const BasicTemplate = ({ isNone, isNoBack, isNoSearch, noSkipLink, children }) => {
  return (
    <BodyContainer>
      {!noSkipLink && (
        <>
          <SkipLink id="main" />
          <SkipLink id="navigation" text="네비게이션 바로가기" />
        </>
      )}
      <Header isNone={isNone} isNoBack={isNoBack} isNoSearch={isNoSearch} />
      {children}
      <Navigation />
    </BodyContainer>
  )
}

export default BasicTemplate
