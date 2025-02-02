import navigationIconPath from "../../lib/constants/NavigationIconPath"

const NavIcon = ({ type, isActive, altText }) => {
  const defaultStyle = "w-[30px] h-[30px]"

  return (
    <>
      {Object.keys(navigationIconPath).map((key) => {
        if (type !== key) {
          return null
        } else {
          return (
            type === key && (
              <img
                className={defaultStyle}
                src={isActive ? navigationIconPath[`${key}_active`] : navigationIconPath[key]}
                alt={altText || ""}
              />
            )
          )
        }
      })}
    </>
  )
}

export default NavIcon
