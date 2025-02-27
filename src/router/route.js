const PREFIX = "/"

const route = {
  default: PREFIX,

  home: PREFIX,

  // ========== 검색 ========== //
  search: PREFIX + "search",
  search_result: PREFIX + "search/result",

  // ========== 급식소 상세 ========== //
  center_detail: PREFIX + "center",

  // bookmark: PREFIX + "bookmark",
  // more: PREFIX + "more",

  // ========== ETC ========== //
  ui: PREFIX + "ui",
  notFound: PREFIX + "*",
}

export default route
