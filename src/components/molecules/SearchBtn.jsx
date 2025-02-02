import { useNavigate } from "react-router-dom"
import route from "../../router/route"
import NavIcon from "../atoms/NavIcon"

const SearchBtn = ({ onClick }) => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      aria-label="검색하기"
      title="검색하기"
      className="w-[30px] h-[30px] hover:scale-[1.1] transition-transform"
      onClick={onClick || (() => navigate(route.search))}
    >
      <NavIcon type="search" altText="" />
    </button>
  )
}

export default SearchBtn
