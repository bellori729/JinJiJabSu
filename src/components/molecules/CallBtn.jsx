import useBigFontSizeStore from "../../lib/store/useBigFontSizeStore"

const CallBtn = ({ btnClassName, onClick }) => {
  const { bigFontSize } = useBigFontSizeStore()

  return (
    <button
      className={`${btnClassName} ${bigFontSize ? "w-[32px] h-[32px]" : "w-[24px] h-[24px]"}`}
      onClick={onClick}
      title="시설 연락처로 전화 걸기"
    >
      <img className="w-full h-full" src="/assets/icons/tel.png" alt="전화걸기" aria-hidden="true" />
    </button>
  )
}

export default CallBtn
