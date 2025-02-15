const BodyContainer = ({ className, style, children }) => {
  return (
    <div
      className={`w-[100vw] flex flex-col justify-center relative ${className}`}
      style={{
        ...style,
      }}
    >
      {children}
    </div>
  )
}

export default BodyContainer
