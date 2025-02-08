import { useNavigate } from "react-router-dom"
import route from "../../router/route"

const TextLogoSquare = ({ className, style }) => {
  const navigate = useNavigate()

  return (
    <img
      className={className ? className : `w-[30px] h-[30px] hover:scale-[1.05] transition-transform cursor-pointer`}
      style={style}
      src={"/assets/images/text_logo_square.png"}
      alt={"홈으로 이동"}
      title={"홈으로 이동"}
      onClick={() => navigate(route.home)}
    />
  )
}

export default TextLogoSquare
