import TextLogo from "../atoms/TextLogo"
import TextLogoSquare from "../atoms/TextLogoSquare"
import BackBtn from "../molecules/BackBtn"
import SearchBtn from "../molecules/SearchBtn"

const Header = ({ isNone, isNoBack, isNoLogo, isSquareLogo, isNoSearch, headerText }) => {
  return (
    <header className={`w-full h-[85px] flex items-center px-[25px] justify-between`}>
      {!isNone && (
        <>
          {!isNoBack ? <BackBtn /> : isNoBack && !isSquareLogo ? <div className="w-[30px] h-[30px]"></div> : null}
          {isSquareLogo && <TextLogoSquare />}
          {!isNoLogo && <TextLogo />}
          {headerText && (
            <>
              <span className="sr-only">이곳은 {headerText} 페이지입니다.</span>

              <p
                aria-hidden="true"
                className="text-[#282828] text-[30px] leading-[100%] font-bold hover:scale-[1.05] transition-transform cursor-default"
              >
                {headerText}
              </p>
            </>
          )}
          {!isNoSearch ? <SearchBtn /> : <div className="w-[30px] h-[30px]"></div>}
        </>
      )}
    </header>
  )
}

export default Header
