import { Route, Routes } from "react-router-dom"
import route from "./route"
import Home from "../components/pages/home/Home"
import UI from "../components/pages/etc/UI"
import NotFound from "../components/pages/etc/NotFound"
import Search from "../components/pages/search/view/Search"
import SearchResult from "../components/pages/search/view/SearchResult"
import CenterDetail from "../components/pages/center/view/CenterDetail"
// import Bookmark from "../components/pages/bookmark/Bookmark"
// import More from "../components/pages/more/More"

const Router = () => {
  return (
    <Routes>
      <Route path={route.home} element={<Home />} />

      {/* ========== 검색 ========== */}
      <Route path={route.search} element={<Search />} />
      <Route path={route.search_result} element={<SearchResult />} />

      {/* ========== 급식소 상세 ========== */}
      <Route path={route.center_detail} element={<CenterDetail />} />

      {/* ========== ETC ========== */}
      {/* <Route path={route.bookmark} element={<Bookmark />} /> */}
      {/* <Route path={route.more} element={<More />} /> */}

      <Route path={route.ui} element={<UI />} />
      <Route path={route.notFound} element={<NotFound />} />
    </Routes>
  )
}

export default Router
