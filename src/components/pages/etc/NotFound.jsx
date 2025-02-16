import { mediumTextBold } from "../../../lib/constants/style/mediumText"
import ErrorIcon from "../../atoms/ErrorIcon"
import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"

const NotFound = () => {
  return (
    <BasicTemplate noSkipLink={true}>
      <MainContainer className={"flex flex-col items-center justify-center gap-[32px]"}>
        <ErrorIcon />
        <p className={`${mediumTextBold}`}>요청하신 페이지를 찾을 수 없습니다.</p>
      </MainContainer>
    </BasicTemplate>
  )
}

export default NotFound
