const PREFIX = "/"

const route = {
  default: PREFIX,
  home: PREFIX,
  search: `${PREFIX}search`,
  search_result: `${PREFIX}search/result`,
  center_detail: `${PREFIX}center`,
  ui: `${PREFIX}ui`,
  notFound: `${PREFIX}*`,
}

export default route
