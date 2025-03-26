import { createContext } from 'react'
import noop from 'lodash/noop'

import type { TTheme } from '../../common/types'
import { THEME } from '../../common/constants'

type TThemeContext = {
  theme: TTheme
  toggleTheme: VoidFunction
}

export const ThemeContext = createContext<TThemeContext>({ theme: THEME.DARK, toggleTheme: noop })
export const ThemeProvider = ThemeContext.Provider
