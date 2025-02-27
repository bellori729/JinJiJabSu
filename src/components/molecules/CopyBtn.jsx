const CopyBtn = ({ btnClassName, onClick }) => {
  return (
    <button className={`${btnClassName} w-[24px] h-[24px]`} onClick={onClick}>
      <img className="w-full h-full" src="/assets/icons/copy.png" title="복사하기" alt="복사하기" />
    </button>
  )
}

export default CopyBtn
