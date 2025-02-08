const PaginationDoubleBtn = ({ className, isLeft, disabled, onClick }) => {
  return (
    <svg
      width="30"
      height="30"
      viewBox="0 0 30 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: isLeft ? "rotate(180deg)" : "",
      }}
      onClick={onClick}
    >
      <path
        d="M16 9L21.5 14.5L16 20"
        stroke={disabled ? "#c2c7d0" : "#191919"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M9.5 9L15 14.5L9.5 20"
        stroke={disabled ? "#c2c7d0" : "#191919"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PaginationDoubleBtn
