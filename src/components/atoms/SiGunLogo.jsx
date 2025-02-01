const SiGunLogo = ({ className, style, path, siGunName }) => {
  console.log(path)

  return (
    <img
      className={className ? className : `w-[268px] h-[98px] bg-white`}
      style={style}
      src={path}
      alt={siGunName}
      title={siGunName}
    >
      {siGunName}
    </img>
  )
}

export default SiGunLogo
