import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import usePaginationStore from "../../../../lib/store/usePaginationStore"

const useSearchController = () => {
  const navigate = useNavigate()
  const { setPagination } = usePaginationStore()

  // ===== 마운트 시 ===== //
  useEffect(() => {
    setPagination(0)
  }, []) // eslint-disable-line

  return {
    navigate,
  }
}

export default useSearchController
