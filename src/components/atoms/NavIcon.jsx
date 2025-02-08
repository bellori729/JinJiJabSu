import navigationIconPath from "../../lib/constants/navigationIconPath"

const NavIcon = ({ type, isActive, altText }) => {
  const defaultStyle = "w-[30px] h-[30px]"

  return (
    <>
      {Object.keys(navigationIconPath).map((key, index) => {
        if (type !== key) {
          return null
        } else {
          return (
            type === key && (
              <img
                key={index}
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
