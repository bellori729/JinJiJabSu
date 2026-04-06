import { mediumTextBold } from "../../../lib/constants/style/mediumText"
import ErrorIcon from "../../atoms/ErrorIcon"
import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"
import Seo from "../../shared/Seo"

const NotFound = () => {
  return (
    <BasicTemplate noSkipLink={true}>
      <Seo
        title="페이지를 찾을 수 없습니다"
        description="요청하신 페이지를 찾을 수 없습니다. 진지잡수의 홈 또는 검색 페이지로 이동해 원하는 무료급식소 정보를 다시 찾아보세요."
        noindex={true}
      />
      <MainContainer className={"flex flex-col items-center justify-center gap-[32px]"}>
        <ErrorIcon />
        <p className={`${mediumTextBold}`}>요청하신 페이지를 찾을 수 없습니다.</p>
      </MainContainer>
    </BasicTemplate>
  )
}

export default NotFound
