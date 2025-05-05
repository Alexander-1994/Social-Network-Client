import type { InputProps } from '@heroui/react'

import { THEME, AUTH_FORM_FIELD } from '../constants'

export type TTheme = (typeof THEME)[keyof typeof THEME]

export type TAuthForm = {
  name: string
  email: string
  password: string
}

export type TAuthField = Pick<InputProps, 'label' | 'placeholder' | 'type'> & {
  name: (typeof AUTH_FORM_FIELD)[keyof typeof AUTH_FORM_FIELD]
}

export type TPostForm = { content: string }
