import { TbMoodEmpty } from "react-icons/tb"
import { mediumTextBold } from "../../lib/constants/style/mediumText"

const Empty = ({ className, style, textClassName, textStyle, text }) => {
  return (
    <div
      className={`w-full h-fit gap-[10px] flex flex-col items-center justify-center ${className}`}
      style={{
        ...style,
      }}
    >
      <TbMoodEmpty color={"#272829"} size={20} />
      <p
        className={`${mediumTextBold} text-[#272829] ${textClassName}`}
        style={{
          ...textStyle,
        }}
      >
        {text || "표시할 데이터가 없습니다."}
      </p>
    </div>
  )
}

export default Empty
