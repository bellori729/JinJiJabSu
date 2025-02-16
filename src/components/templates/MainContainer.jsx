const MainContainer = ({ children, className, style }) => {
  return (
    <main id="main" className={`min-h-[calc(100vh-170px)] min-w-[calc(100vw-20px)] ${className}`} style={style}>
      {children}
    </main>
  )
}

export default MainContainer
