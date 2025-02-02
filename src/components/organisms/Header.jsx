import TextLogo from "../atoms/TextLogo"
import BackBtn from "../molecules/BackBtn"
import SearchBtn from "../molecules/SearchBtn"

const Header = ({ isNone, isNoBack, isNoLogo, isNoSearch }) => {
  return (
    <header className={`w-full h-[50px] flex items-center px-[20px] justify-between`}>
      {!isNone && (
        <>
          {!isNoBack ? <BackBtn /> : <div className="w-[30px] h-[30px]"></div>}
          {!isNoLogo && <TextLogo />}
          {!isNoSearch ? <SearchBtn /> : <div className="w-[30px] h-[30px]"></div>}
        </>
      )}
    </header>
  )
}

export default Header
