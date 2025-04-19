export const THEME = {
  DARK: 'dark',
  LIGHT: 'light',
} as const

export const ROUTE = {
  AUTH: '/auth',
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
} as const

export enum ECardType {
  post = 'post',
  currentPost = 'current-post',
  comment = 'comment',
}
