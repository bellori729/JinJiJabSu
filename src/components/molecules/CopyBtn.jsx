import useBigFontSizeStore from "../../lib/store/useBigFontSizeStore"

const CopyBtn = ({ btnClassName, onClick }) => {
  const { bigFontSize } = useBigFontSizeStore()

  return (
    <button className={`${btnClassName} ${bigFontSize ? "w-[32px] h-[32px]" : "w-[24px] h-[24px]"}`} onClick={onClick}>
      <img className="w-full h-full" src="/assets/icons/copy.png" title="복사하기" alt="복사하기" />
    </button>
  )
}

export default CopyBtn
