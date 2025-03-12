const SkipLink = ({ id, text }) => {
  return (
    <a
      href={`#${id}`}
      className="z-100 absolute top-[-50px] focus-visible:top-0 focus-visible:left-0 focus-visible:right-0 h-10 bg-[#272829] font-[700] w-full flex items-center justify-center text-white transition-all duration-300 ease-in-out"
    >
      {text || "본문 바로가기"}
    </a>
  )
}

export default SkipLink
