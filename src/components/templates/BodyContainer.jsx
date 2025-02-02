const BodyContainer = ({ className, style, children }) => {
  return (
    <div
      className={`w-[360px] flex flex-col relative pb-[100px] ${className}`}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default BodyContainer
