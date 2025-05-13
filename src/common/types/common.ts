import type { InputProps } from '@heroui/react'

import { THEME, AUTH_FORM_FIELD, EDIT_PROFILE_FIELD } from '../constants'
import type { TUser } from './api'

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

export type TEditProfileForm = Pick<TUser, 'email' | 'name' | 'bio' | 'location'> & {
  dateOfBirth?: string
}

export type TEditProfileField = Pick<InputProps, 'label' | 'placeholder' | 'type' | 'endContent'> & {
  name: (typeof EDIT_PROFILE_FIELD)[keyof typeof EDIT_PROFILE_FIELD]
}
