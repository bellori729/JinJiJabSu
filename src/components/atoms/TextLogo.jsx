import { useNavigate } from "react-router-dom"
import route from "../../router/route"

const TextLogo = ({ className, style }) => {
  const navigate = useNavigate()
  return (
    <img
      className={className ? className : `w-[128px] h-[30px] hover:scale-[1.05] transition-transform cursor-pointer`}
      style={style}
      src={"/assets/images/text_logo.png"}
      alt={"홈"}
      aria-hidden="true"
      onClick={() => navigate(route.home)}
    />
  )
}

export default TextLogo
