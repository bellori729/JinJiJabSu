import { useMemo } from "react"
import { useNavigate } from "react-router-dom"
import PaginationDoubleBtn from "../atoms/PaginationDoubleBtn"
import PaginationBtn from "../atoms/PaginationBtn"
import { basicTextBold, basicTextRegular } from "../../lib/constants/style/basicText"
import useBigFontSizeStore from "../../lib/store/useBigFontSizeStore"

const Pagination = ({ route, queryString, totalPages, currentPage, rangeSize, setPage }) => {
  const { bigFontSize } = useBigFontSizeStore()

  const navigate = useNavigate()

  const pageList = useMemo(() => {
    const pageGroup = Math.ceil(currentPage / rangeSize)

    let firstNumber = pageGroup * rangeSize - (rangeSize - 1)
    if (firstNumber <= 0) {
      firstNumber = 1
    }

    let lastNumber = pageGroup * rangeSize
    if (lastNumber > totalPages) {
      lastNumber = totalPages
    }

    const pageList = []
    for (let i = firstNumber; i <= lastNumber; i++) {
      pageList.push(i)
    }

    return pageList
  }, [totalPages, currentPage, rangeSize])

  return (
    <div className="flex h-[30px] w-full justify-center items-center gap-[8px] self-center mt-[50px]">
      <PaginationDoubleBtn
        isLeft={true}
        disabled={Number(currentPage) === 1}
        onClick={() => {
          const prevGroupLastPage = Math.max(Math.floor((currentPage - 1) / rangeSize) * rangeSize, 1)

          if (route) {
            navigate(route + `?page=${prevGroupLastPage}${queryString ? queryString : ""}`, { replace: true })
          } else {
            setPage(Number(prevGroupLastPage))
          }
        }}
      />
      <PaginationBtn
        className="cursor-pointer"
        isLeft={true}
        disabled={Number(currentPage) === 1}
        onClick={() => {
          if (Number(currentPage) === 1) {
            return
          }

          if (route) {
            navigate(route + `?page=${Number(currentPage) - 1}${queryString ? queryString : ""}`, { replace: true })
          } else {
            setPage(Number(currentPage) - 1)
          }
        }}
      />
      {pageList?.map((item, index) => (
        <button
          key={index}
          className={`flex h-[30px] w-[30px] cursor-pointer items-center justify-center ${item === Number(currentPage) ? basicTextBold : basicTextRegular} ${bigFontSize && "large-font-size"}`}
          style={{
            color: "#191919",
          }}
          onClick={() => {
            if (route) {
              navigate(route + `?page=${item}${queryString ? queryString : ""}`, {
                replace: true,
              })
            } else {
              setPage(Number(item))
            }
          }}
        >
          <span aria-hidden="true">{item}</span>
          <span className="sr-only">{item} 페이지로 이동하기</span>
        </button>
      ))}
      <PaginationBtn
        className="cursor-pointer"
        isLeft={false}
        disabled={Number(currentPage) === totalPages}
        onClick={() => {
          if (Number(currentPage) === totalPages) {
            return
          }

          if (route) {
            navigate(route + `?page=${Number(currentPage) + 1}${queryString ? queryString : ""}`, { replace: true })
          } else {
            setPage(Number(currentPage) + 1)
          }
        }}
      />
      <PaginationDoubleBtn
        className="cursor-pointer"
        isLeft={false}
        disabled={Number(currentPage) === totalPages}
        onClick={() => {
          const nextGroupFirstPage = Math.min(Math.ceil(currentPage / rangeSize) * rangeSize + 1, totalPages)

          if (route) {
            navigate(route + `?page=${nextGroupFirstPage}${queryString ? queryString : ""}`, { replace: true })
          } else {
            setPage(Number(nextGroupFirstPage))
          }
        }}
      />
    </div>
  )
}

export default Pagination
