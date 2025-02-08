const PaginationBtn = ({ className, isLeft, disabled, onClick }) => {
  return (
    <svg
      width="31"
      height="30"
      viewBox="0 0 31 30"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      style={{
        transform: isLeft ? "rotate(180deg)" : "",
      }}
      onClick={onClick}
    >
      <path
        d="M13 9L18.5 14.5L13 20"
        stroke={disabled ? "#c2c7d0" : "#191919"}
        strokeWidth="1.3"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default PaginationBtn
