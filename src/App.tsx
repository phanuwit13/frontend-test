import routeConfig, { RouteConfig } from '@/routes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Suspense } from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const RenderRoutes = ({ routes }: { routes: RouteConfig[] }) => {
  return (
    <Routes>
      {routes.map(({ element, layout: LayoutComponents, ...route }, index) => {
        const render = LayoutComponents ? (
          <LayoutComponents>{element}</LayoutComponents>
        ) : (
          element
        )
        return <Route key={index} {...route} element={render} />
      })}
    </Routes>
  )
}

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Router>
          <Suspense fallback={<div>Loading...</div>}>
            <RenderRoutes routes={routeConfig} />
          </Suspense>
        </Router>
      </QueryClientProvider>
    </>
  )
}

export default App
