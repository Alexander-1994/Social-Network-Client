import { createBrowserRouter, Navigate } from 'react-router-dom'

import { ROUTE } from '../common/constants'
import { Layout, ErrorElement } from '../components'
import { Auth, Posts, CurrentPost, Following, Followers, UserProfile } from '../pages'

export const router = createBrowserRouter([
  {
    path: ROUTE.LAYOUT.MAIN,
    element: <Layout />,
    errorElement: <ErrorElement />,
    children: [
      { path: ROUTE.LAYOUT.OUTLET.POSTS, element: <Posts /> },
      { path: ROUTE.LAYOUT.OUTLET.CURRENT_POST, element: <CurrentPost /> },
      { path: ROUTE.LAYOUT.OUTLET.FOLLOWING, element: <Following /> },
      { path: ROUTE.LAYOUT.OUTLET.FOLLOWERS, element: <Followers /> },
      { path: ROUTE.LAYOUT.OUTLET.CURRENT_USER, element: <UserProfile /> },
    ],
  },
  { path: ROUTE.AUTH, element: <Auth /> },
  { path: ROUTE.ANY, element: <Navigate to={ROUTE.LAYOUT.MAIN} /> },
])
