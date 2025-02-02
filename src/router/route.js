const PREFIX = "/"

const route = {
  default: PREFIX,

  home: PREFIX,
  search: PREFIX + "search",
  bookmark: PREFIX + "bookmark",
  more: PREFIX + "more",

  result: PREFIX + "result",
  result_detail: PREFIX + "result/:id",

  // ========== ETC ========== //
  ui: PREFIX + "ui",
  notFound: PREFIX + "*",
}

export default route
