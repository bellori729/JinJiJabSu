const PaginationDoubleBtn = ({ className, isLeft, disabled, onClick }) => {
  return (
    <button
      onClick={onClick}
      title={isLeft ? "이전 페이지 목록으로 건너뛰기" : "다음 페이지 목록으로 건너뛰기"}
      disabled={disabled}
    >
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
        aria-hidden="true"
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
    </button>
  )
}

export default PaginationDoubleBtn
