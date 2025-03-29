import { useState, useCallback } from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Provider as RTKProvider } from 'react-redux'
import { HeroUIProvider } from '@heroui/react'
import classNames from 'classnames'

import { ROUTE, THEME } from '../common/constants'
import type { TTheme } from '../common/types'
import { ThemeProvider } from '../services/context'
import { store } from '../services/store'
import { Auth, Posts, CurrentPost, Following, Followers, UserProfile } from '../pages'
import { Layout } from './Layout'

const router = createBrowserRouter([
  { path: ROUTE.AUTH, element: <Auth /> },
  {
    path: ROUTE.LAYOUT.MAIN,
    element: <Layout />,
    children: [
      { path: ROUTE.LAYOUT.OUTLET.POSTS, element: <Posts /> },
      { path: ROUTE.LAYOUT.OUTLET.CURRENT_POST, element: <CurrentPost /> },
      { path: ROUTE.LAYOUT.OUTLET.FOLLOWING, element: <Following /> },
      { path: ROUTE.LAYOUT.OUTLET.FOLLOWERS, element: <Followers /> },
      { path: ROUTE.LAYOUT.OUTLET.CURRENT_USER, element: <UserProfile /> },
    ],
  },
])

export const App = () => {
  const savedTheme = localStorage.getItem('theme') as TTheme | null
  const [theme, setTheme] = useState<TTheme>(savedTheme || THEME.DARK)

  const toggleTheme = useCallback(() => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK

      localStorage.setItem('theme', newTheme)

      return newTheme
    })
  }, [])

  return (
    <RTKProvider store={store}>
      <HeroUIProvider>
        <ThemeProvider value={{ theme, toggleTheme }}>
          <main className={classNames(theme, 'text-foreground', 'bg-background')}>
            <RouterProvider router={router} />
          </main>
        </ThemeProvider>
      </HeroUIProvider>
    </RTKProvider>
  )
}
