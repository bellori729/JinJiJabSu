import BasicTemplate from "../../templates/BasicTemplate"
import MainContainer from "../../templates/MainContainer"
import NavIcon from "../../atoms/NavIcon"
import siGunLogoPath from "../../../lib/constants/siGunLogoPath"
import SiGunLogo from "../../atoms/SiGunLogo"

const UI = () => {
  return (
    <BasicTemplate>
      <MainContainer>
        <NavIcon type="home" />
        <NavIcon type="home_active" />
        <NavIcon type="search" />
        <NavIcon type="search_active" />
        <NavIcon type="bookmark" />
        <NavIcon type="bookmark_active" />
        <NavIcon type="more" />
        <NavIcon type="more_active" />
        <NavIcon type="more_activedd" />
        <div className="flex flex-col gap-[5px]">
          {Object.keys(siGunLogoPath).map((key) => {
            return <SiGunLogo key={key} path={siGunLogoPath[key]} alt={key} />
          })}
        </div>
      </MainContainer>
    </BasicTemplate>
  )
}

export default UI
