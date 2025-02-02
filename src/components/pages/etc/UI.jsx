import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"
import NavIcon from "../../atoms/NavIcon"
import siGunLogoPath from "../../../lib/constants/siGunLogoPath"
import SiGunLogo from "../../atoms/SiGunLogo"
import NavItem from "../../molecules/NavItem"

const UI = () => {
  return (
    <BasicTemplate>
      <div className="h-[500px] w-full">dd</div>
      <MainContainer>
        <div className="w-full flex items-center justify-around">
          <NavItem isHome />
          <NavItem isHomeActive />
          <NavItem isSearch />
          <NavItem isSearchActive />
          <NavItem isBookmark />
          <NavItem isBookmarkActive />
          <NavItem isMore />
          <NavItem isMoreActive />
        </div>
        <div className="w-full flex items-center justify-around">
          <NavIcon type="home" />
          <NavIcon type="home_active" />
          <NavIcon type="search" />
          <NavIcon type="search_active" />
          <NavIcon type="bookmark" />
          <NavIcon type="bookmark_active" />
          <NavIcon type="more" />
          <NavIcon type="more_active" />
          <NavIcon type="more_activedd" />
        </div>
        <div className="w-full flex flex-col items-center gap-[5px]">
          {Object.keys(siGunLogoPath).map((key) => {
            return <SiGunLogo key={key} path={siGunLogoPath[key]} alt={key} />
          })}
        </div>
      </MainContainer>
    </BasicTemplate>
  )
}

export default UI
