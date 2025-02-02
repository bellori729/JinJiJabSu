const MainContainer = ({ children, className, style }) => {
  return (
    <main id="main" className={className} style={style}>
      {children}
    </main>
  )
}

export default MainContainer
