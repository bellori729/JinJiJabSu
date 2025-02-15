const MainContainer = ({ children, className, style }) => {
  return (
    <main id="main" className={`min-h-[calc(100vh-170px)] ${className}`} style={style}>
      {children}
    </main>
  )
}

export default MainContainer
