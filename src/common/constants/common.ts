export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const

export const ROUTE = {
  LAYOUT: {
    MAIN: '/',
    OUTLET: {
      POSTS: '',
      CURRENT_POST: 'posts/:id',
      FOLLOWERS: 'followers',
      FOLLOWING: 'following',
      CURRENT_USER: 'users/:id',
    },
  },
  AUTH: '/auth',
  ANY: '*',
} as const

export const AUTH_VARIANT = {
  LOGIN: 'login',
  REGISTRATION: 'registration',
} as const

export const AUTH_FORM_FIELD = {
  NAME: 'name',
  EMAIL: 'email',
  PASSWORD: 'password',
} as const

export const INPUT_TYPE = {
  TEXT: 'text',
  EMAIL: 'email',
  PASSWORD: 'password',
  DATE: 'date',
  FILE: 'file',
} as const

export enum ECardType {
  post = 'post',
  currentPost = 'current-post',
  comment = 'comment',
}

export const EDIT_PROFILE_FIELD = {
  EMAIL: 'email',
  NAME: 'name',
  DATE_OF_BIRTH: 'dateOfBirth',
  BIO: 'bio',
  LOCATION: 'location',
} as const

export const EDIT_PROFILE_FORM_ID = 'edit-profile-form'
