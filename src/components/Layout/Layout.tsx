import { type FC, useEffect } from 'react'
import { useNavigate, Outlet } from 'react-router-dom'

import { ROUTE } from '../../common/constants'
import { useAppSelector } from '../../services/hooks'
import { isAuthenticatedSelector, userSelector } from '../../services/store/'

import { Header } from '../Header'
import { Container } from '../Container'
import { NavBar } from '../NavBar'
import { Profile } from '../Profile'

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
      <Container>
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
      </Container>
    </>
  )
}
