import useBigFontSizeStore from "../../lib/store/useBigFontSizeStore"

const CallBtn = ({ btnClassName, onClick }) => {
  const { bigFontSize } = useBigFontSizeStore()

  return (
    <button className={`${btnClassName} ${bigFontSize ? "w-[32px] h-[32px]" : "w-[24px] h-[24px]"}`} onClick={onClick}>
      <img className="w-full h-full" src="/assets/icons/tel.png" title="전화걸기" alt="전화걸기" />
    </button>
  )
}

export default CallBtn
