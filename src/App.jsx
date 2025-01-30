import { Router } from "react-router-dom";
import "./App.css";
import { useScrollToTop } from "./lib/hooks/useScrollToTop";

const App = () => {
  useScrollToTop();

  return (
    <>
      <Router />
    </>
  );
};

export default App;
