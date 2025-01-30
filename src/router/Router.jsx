import { Route, Routes } from "react-router-dom";
import route from "./route";
import Home from "../components/pages/home/Home";

const Router = () => {
  return (
    <Routes>
      <Route path={route.home} element={<Home />} />
    </Routes>
  );
};

export default Router;
