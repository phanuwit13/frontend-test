import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

const ROUTE_MENU = [
  { title: '1.Auto Delete Todo List', path: '/' },
  { title: '2.Create data from API', path: '/2' },
]

const Nav = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='min-h-[80px] bg-gray-100 flex items-center justify-center'>
        <ul className='flex gap-4'>
          {ROUTE_MENU.map((item, index) => {
            return (
              <li key={`route-${index}`} className='underline'>
                <Link to={item.path} className='hover:text-blue-500'>{item.title}</Link>
              </li>
            )
          })}
        </ul>
      </div>
      {children}
    </>
  )
}

export default Nav
