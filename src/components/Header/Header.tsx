import { type FC, useContext, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Button } from '@heroui/react'
import { FaRegMoon } from 'react-icons/fa'
import { LuSunMedium } from 'react-icons/lu'
import { CiLogout } from 'react-icons/ci'

import { THEME, ROUTE, LOCALE } from '../../common/constants'
import { ThemeContext } from '../../services/context'
import { useAppDispatch } from '../../services/hooks'
import { logout } from '../../services/store'

export const Header: FC = () => {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { theme, toggleTheme } = useContext(ThemeContext)

  const IconComponent = theme === THEME.DARK ? LuSunMedium : FaRegMoon

  const handleLogout = useCallback(() => {
    dispatch(logout())
    localStorage.removeItem('token')
    navigate(ROUTE.AUTH)
  }, [])

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">{LOCALE.HEADER.TITLE}</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex text-3xl cursor-pointer" onClick={toggleTheme}>
          <IconComponent />
        </NavbarItem>
        <NavbarItem>
          <Button className="gap-2" color="default" variant="flat" onPress={handleLogout}>
            <CiLogout />
            <span>{LOCALE.HEADER.GO_OUT}</span>
          </Button>
        </NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
