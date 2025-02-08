import { mediumTextBold } from "../../../lib/constants/style/mediumText"
import ErrorIcon from "../../atoms/ErrorIcon"
import BasicTemplate from "../../templates/BasicTemplate"

const NotFound = () => {
  return (
    <BasicTemplate noSkipLink={true}>
      <div className="flex flex-col items-center justify-center gap-[32px] w-full h-[calc(100vh-170px)]">
        <ErrorIcon />
        <p className={`${mediumTextBold}`}>요청하신 페이지를 찾을 수 없습니다.</p>
      </div>
    </BasicTemplate>
  )
}

export default NotFound
