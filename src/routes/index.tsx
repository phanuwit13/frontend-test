import Nav from '@/components/nav'
import OnePage from '@/pages/one'
import TwoPage from '@/pages/two'
import { PathRouteProps } from 'react-router-dom'

export type RouteConfig = PathRouteProps & {
  path: string
  layout?: ({ children }: { children: React.ReactNode }) => React.ReactNode
}

const routeConfig: RouteConfig[] = [
  {
    path: '/',
    element: <OnePage />,
    layout: Nav,
  },
  {
    path: '/2',
    element: <TwoPage />,
    layout: Nav,
  },
]

export default routeConfig
