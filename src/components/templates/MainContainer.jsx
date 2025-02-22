const MainContainer = ({ children, className, style }) => {
  return (
    <main id="main" className={`min-h-[calc(100vh-170px)] min-w-[100vw] ${className}`} style={style}>
      {children}
    </main>
  )
}

export default MainContainer
