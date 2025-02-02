import { useNavigate } from "react-router-dom"

const BackBtn = ({ onClick }) => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      aria-label="뒤로가기"
      title="뒤로가기"
      className="w-[30px] h-[30px]"
      onClick={onClick || (() => navigate(-1))}
    >
      <img className="w-full h-full" src="/assets/icons/back.png" alt="" />
    </button>
  )
}

export default BackBtn
