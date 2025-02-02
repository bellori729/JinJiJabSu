import { Route, Routes } from "react-router-dom"
import route from "./route"
import Home from "../components/pages/home/Home"
import UI from "../components/pages/etc/UI"
import NotFound from "../components/pages/etc/NotFound"
import Search from "../components/pages/search/Search"
import Bookmark from "../components/pages/bookmark/Bookmark"
import More from "../components/pages/more/More"

const Router = () => {
  return (
    <Routes>
      <Route path={route.home} element={<Home />} />
      <Route path={route.search} element={<Search />} />
      <Route path={route.bookmark} element={<Bookmark />} />
      <Route path={route.more} element={<More />} />

      <Route path={route.ui} element={<UI />} />
      <Route path={route.notFound} element={<NotFound />} />
    </Routes>
  )
}

export default Router
