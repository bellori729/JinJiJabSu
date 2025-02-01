const BodyContainer = ({ className, style, children }) => {
  return (
    <div
      className={`w-full flex flex-col relative px-[20px] ${className}`}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default BodyContainer
