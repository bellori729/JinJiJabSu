const SiGunLogo = ({ className, style, path, siGunName }) => {
  return (
    <img
      className={
        className
          ? className
          : `w-[152px] sm:w-[152px] md:w-[200px] lg:w-[268px] rounded-[8px] shadow-[0px_4px_4px_0px_rgba(0,0,0,0.25)]`
      }
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
