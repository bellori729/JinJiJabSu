import { ClipLoader } from "react-spinners"

const LoadingSpinner = ({ style, className }) => {
  return (
    <div
      className={`flex items-center justify-center w-full h-[50px] ${className}`}
      style={{
        ...style,
      }}
    >
      <ClipLoader color={"#282828"} height={15} width={5} radius={2} margin={2} />
    </div>
  )
}

export default LoadingSpinner
