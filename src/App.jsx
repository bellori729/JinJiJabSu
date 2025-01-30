import "./App.css";
import { useScrollToTop } from "./lib/hooks/useScrollToTop";
import Router from "./router/Router";

const App = () => {
  useScrollToTop();

  return (
    <>
      <Router />
    </>
  );
};

export default App;
