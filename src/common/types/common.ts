import { THEME } from '../constants'

export type TTheme = (typeof THEME)[keyof typeof THEME]
