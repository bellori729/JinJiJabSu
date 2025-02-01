import BodyContainer from "./BodyContainer"
import SkipLink from "../atoms/SkipLink"

const BasicTemplate = ({ children }) => {
  return (
    <BodyContainer>
      <SkipLink id="main" />
      {children}
    </BodyContainer>
  )
}

export default BasicTemplate
