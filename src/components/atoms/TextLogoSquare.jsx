import { useNavigate } from "react-router-dom"
import route from "../../router/route"

const TextLogoSquare = ({ className, style }) => {
  const navigate = useNavigate()

  return (
    <button
      className={className ? className : `w-[28px] h-[30px] hover:scale-[1.05] transition-transform cursor-pointer`}
      style={style}
      onClick={() => navigate(route.home)}
    >
      <img
        className={"w-full h-full"}
        src={"/assets/images/text_logo_square.png"}
        alt={"홈으로 이동"}
        title={"홈으로 이동"}
      />
    </button>
  )
}

export default TextLogoSquare
