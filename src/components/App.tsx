import { useState, useCallback } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { Provider as RTKProvider } from 'react-redux'
import { HeroUIProvider } from '@heroui/react'
import classNames from 'classnames'
import { Button } from '@heroui/button'

import { THEME } from '../common/constants'
import type { TTheme } from '../common/types'
import { ThemeProvider } from '../services/context'
import { store } from '../services/store'

const router = createBrowserRouter([
  { path: '/auth', element: <h1>Auth</h1> },
  { path: '/', element: <h1>Layout</h1> },
]) /* TODO */

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
            <Button color="primary">Button</Button>
          </main>
        </ThemeProvider>
      </HeroUIProvider>
    </RTKProvider>
  )
}
