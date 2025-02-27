const CallBtn = ({ btnClassName, onClick }) => {
  return (
    <button className={`${btnClassName} w-[24px] h-[24px]`} onClick={onClick}>
      <img className="w-full h-full" src="/assets/icons/tel.png" title="전화걸기" alt="전화걸기" />
    </button>
  )
}

export default CallBtn
