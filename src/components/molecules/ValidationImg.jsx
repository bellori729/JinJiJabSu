import { LazyLoadImage } from "react-lazy-load-image-component"

const ValidationImg = ({
  isValid,
  imgUrl,
  altText,
  placeholderSrc,
  validClassName,
  validStyle,
  invalidClassName,
  invalidStyle,
  onClick,
}) => {
  return (
    <>
      {isValid ? (
        <LazyLoadImage
          className={validClassName || ""}
          src={imgUrl || ""}
          effect="opacity"
          placeholderSrc={placeholderSrc || ""}
          alt={altText || ""}
          style={{
            ...validStyle,
          }}
          onClick={onClick || (() => {})}
        />
      ) : (
        <div
          className={invalidClassName || ""}
          style={{
            ...invalidStyle,
          }}
          onClick={onClick || (() => {})}
        />
      )}
    </>
  )
}

export default ValidationImg
