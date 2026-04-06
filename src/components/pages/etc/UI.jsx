import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"
import NavIcon from "../../atoms/NavIcon"
import siGunLogoPath from "../../../lib/constants/siGunLogoPath"
import SiGunLogo from "../../atoms/SiGunLogo"
import NavItem from "../../molecules/NavItem"
import Seo from "../../shared/Seo"
import route from "../../../router/route"

const UI = () => {
  return (
    <BasicTemplate>
      <Seo
        title="UI 테스트"
        description="진지잡수 내부 UI 컴포넌트를 확인하는 테스트 페이지입니다."
        path={route.ui}
        noindex={true}
      />
      <div className="h-[500px] w-full">dd</div>
      <MainContainer>
        <div className="flex w-full items-center justify-around">
          <NavItem isHome />
          <NavItem isHomeActive />
          <NavItem isSearch />
          <NavItem isSearchActive />
          <NavItem isBookmark />
          <NavItem isBookmarkActive />
          <NavItem isMore />
          <NavItem isMoreActive />
        </div>
        <div className="flex w-full items-center justify-around">
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
        <div className="flex w-full flex-col items-center gap-[5px]">
          {Object.keys(siGunLogoPath).map((key) => {
            return <SiGunLogo key={key} path={siGunLogoPath[key]} alt={key} />
          })}
        </div>
      </MainContainer>
    </BasicTemplate>
  )
}

export default UI
