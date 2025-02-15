const PREFIX = "/"

const route = {
  default: PREFIX,

  home: PREFIX,
  search: PREFIX + "search",
  search_result: PREFIX + "search/result",

  center_detail: PREFIX + "center", // 급식소 상세 페이지

  // bookmark: PREFIX + "bookmark",
  // more: PREFIX + "more",

  // ========== ETC ========== //
  ui: PREFIX + "ui",
  notFound: PREFIX + "*",
}

export default route
