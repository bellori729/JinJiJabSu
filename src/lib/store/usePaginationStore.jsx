import { create } from "zustand"

const usePaginationStore = create((set) => ({
  totalCount: null,
  totalPages: null,
  setPagination: (totalCount) =>
    set(() => ({
      totalCount,
      totalPages: Math.ceil(totalCount / 10),
    })),
}))

export default usePaginationStore
