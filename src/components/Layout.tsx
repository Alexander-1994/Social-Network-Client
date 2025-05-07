import { type FC, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import { ROUTE } from '../common/constants'
import { LayoutContainer } from '../common/components'
import { useAppSelector } from '../services/hooks'
import { isAuthenticatedSelector, userSelector } from '../services/store/'

import { Header } from './Header'
import { NavBar } from './NavBar'
import { Profile } from './Profile'

export const Layout: FC = () => {
  const navigate = useNavigate()
  const isAuthenticated = useAppSelector(isAuthenticatedSelector)
  const user = useAppSelector(userSelector)

  useEffect(() => {
    if (!isAuthenticated) {
      navigate(ROUTE.AUTH)
    }
  }, [isAuthenticated])

  return (
    <>
      <Header />
      <LayoutContainer>
        <div className="flex-2 p-4">
          <NavBar />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
        {!user && (
          <div className="flex-2 p-4">
            <div className="flex flex-col gap-5">
              <Profile />
            </div>
          </div>
        )}
      </LayoutContainer>
    </>
  )
}
