import BackBtn from "../molecules/BackBtn"
import SearchBtn from "../molecules/SearchBtn"

const Header = ({ isNone, isNoBack, isNoSearch }) => {
  return (
    <header className="w-full h-[50px] flex items-center justify-between px-[20px]">
      {!isNone && (
        <>
          {!isNoBack && <BackBtn />}

          {!isNoSearch && <SearchBtn />}
        </>
      )}
    </header>
  )
}

export default Header
