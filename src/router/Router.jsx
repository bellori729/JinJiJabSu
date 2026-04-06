import { Route, Routes } from "react-router-dom"
import route from "./route"
import Home from "../components/pages/home/Home"
import UI from "../components/pages/etc/UI"
import NotFound from "../components/pages/etc/NotFound"
import Search from "../components/pages/search/view/Search"
import SearchResult from "../components/pages/search/view/SearchResult"
import CenterDetail from "../components/pages/center/view/CenterDetail"

const Router = () => {
  return (
    <Routes>
      <Route path={route.home} element={<Home />} />
      <Route path={route.search} element={<Search />} />
      <Route path={route.search_result} element={<SearchResult />} />
      <Route path={route.center_detail} element={<CenterDetail />} />
      <Route path={route.ui} element={<UI />} />
      <Route path={route.notFound} element={<NotFound />} />
    </Routes>
  )
}

export default Router
