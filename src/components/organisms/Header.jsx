import TextLogo from "../atoms/TextLogo"
import TextLogoSquare from "../atoms/TextLogoSquare"
import BackBtn from "../molecules/BackBtn"
import SearchBtn from "../molecules/SearchBtn"

const Header = ({ isNone, isNoBack, isNoLogo, isSquareLogo, isNoSearch, headerText }) => {
  return (
    <header
      className={`w-full h-[85px] flex items-center px-[25px] justify-between sticky top-0 bg-[#f8f9fa] z-50
    border-b-[1px] border-[#e9ecef]
    `}
    >
      {!isNone && (
        <>
          {!isNoBack ? <BackBtn /> : isNoBack && !isSquareLogo ? <div className="w-[30px] h-[30px]"></div> : null}
          {!isNoLogo && (
            <button title={"홈으로 이동"}>
              <TextLogo />
            </button>
          )}
          {headerText && (
            <>
              <p
                aria-hidden="true"
                className="text-[#282828] text-[30px] leading-[100%] font-bold hover:scale-[1.05] transition-transform cursor-default"
              >
                {headerText}
              </p>
            </>
          )}
          {isSquareLogo && <TextLogoSquare />}
          {!isNoSearch && <SearchBtn />}
        </>
      )}
    </header>
  )
}

export default Header
