import { Route, Routes } from "react-router-dom"
import route from "./route"
import Home from "../components/pages/home/Home"
import UI from "../components/pages/etc/UI"
import NotFound from "../components/pages/etc/NotFound"

const Router = () => {
  return (
    <Routes>
      <Route path={route.home} element={<Home />} />
      <Route path={route.ui} element={<UI />} />
      <Route path={route.notFound} element={<NotFound />} />
    </Routes>
  )
}

export default Router
