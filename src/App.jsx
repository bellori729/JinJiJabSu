import "./App.css"
import { useScrollToTop } from "./lib/hooks/useScrollToTop"
import Router from "./router/Router"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

const App = () => {
  useScrollToTop()

  return (
    <QueryClientProvider client={queryClient}>
      <Router />
    </QueryClientProvider>
  )
}

export default App
