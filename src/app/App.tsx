import { type FC, useState } from 'react'
import { RouterProvider } from 'react-router-dom'
import { Provider as RTKProvider } from 'react-redux'
import { HeroUIProvider } from '@heroui/react'
import classNames from 'classnames'

import { THEME } from '../common/constants'
import type { TTheme } from '../common/types'
import { ThemeProvider } from '../services/context'
import { store } from '../services/store'

import { AuthGuard } from './AuthGuard'
import { router } from './router'

export const App: FC = () => {
  const savedTheme = localStorage.getItem('theme') as TTheme | null
  const [theme, setTheme] = useState<TTheme>(savedTheme || THEME.DARK)

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = prevTheme === THEME.DARK ? THEME.LIGHT : THEME.DARK

      localStorage.setItem('theme', newTheme)

      return newTheme
    })
  }

  return (
    <RTKProvider store={store}>
      <HeroUIProvider>
        <ThemeProvider value={{ theme, toggleTheme }}>
          <main className={classNames(theme, 'text-foreground', 'bg-background')}>
            <AuthGuard>
              <RouterProvider router={router} />
            </AuthGuard>
          </main>
        </ThemeProvider>
      </HeroUIProvider>
    </RTKProvider>
  )
}
