import BodyContainer from "./BodyContainer"
import SkipLink from "../atoms/SkipLink"
import Header from "../organisms/Header"

const BasicTemplate = ({ noSkipLink, children }) => {
  return (
    <BodyContainer>
      <Header />
      {!noSkipLink && <SkipLink id="main" />}
      {children}
    </BodyContainer>
  )
}

export default BasicTemplate
