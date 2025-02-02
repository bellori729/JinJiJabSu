const PREFIX = "/"

const route = {
  default: PREFIX,

  home: PREFIX,
  search: PREFIX + "search",

  // ========== ETC ========== //
  ui: PREFIX + "ui",
  notFound: PREFIX + "*",
}

export default route
