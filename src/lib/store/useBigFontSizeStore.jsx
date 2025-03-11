import { create } from "zustand"

const useBigFontSizeStore = create((set) => ({
  bigFontSize: false,
  setBigFontSize: (bigFontSize) =>
    set(() => ({
      bigFontSize,
    })),
}))

export default useBigFontSizeStore
