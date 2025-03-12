import { useNavigate } from "react-router-dom"

const BackBtn = ({ onClick }) => {
  const navigate = useNavigate()

  return (
    <button
      type="button"
      title="이전 페이지로 이동"
      className="w-[30px] h-[30px] hover:scale-[1.1] transition-transform"
      onClick={onClick || (() => navigate(-1))}
    >
      <img className={`w-full h-full`} src="/assets/icons/back.png" alt="뒤로가기" aria-hidden="true" />
    </button>
  )
}

export default BackBtn
