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
