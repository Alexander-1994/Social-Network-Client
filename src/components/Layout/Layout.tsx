import { type FC } from 'react'
import { Outlet } from 'react-router-dom'

import { Header } from '../Header'
import { Container } from '../Container'
import { NavBar } from '../NavBar'

export const Layout: FC = () => {
  return (
    <>
      <Header />
      <Container>
        <div className="flex-2 p4">
          <NavBar />
        </div>
        <div className="flex-1 p4">
          <Outlet />
        </div>
      </Container>
    </>
  )
}
