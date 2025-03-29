import { type FC, useContext } from 'react'
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from '@heroui/react'
import { FaRegMoon } from 'react-icons/fa'
import { LuSunMedium } from 'react-icons/lu'

import { THEME, LOCALE } from '../../common/constants'
import { ThemeContext } from '../../services/context'

export const Header: FC = () => {
  const { theme, toggleTheme } = useContext(ThemeContext)

  const IconComponent = theme === THEME.DARK ? LuSunMedium : FaRegMoon

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">{LOCALE.HEADER}</p>
      </NavbarBrand>
      <NavbarContent justify="end">
        <NavbarItem className="lg:flex text-3xl cursor-pointer" onClick={toggleTheme}>
          <IconComponent />
        </NavbarItem>
        <NavbarItem>{/* TODO */}</NavbarItem>
      </NavbarContent>
    </Navbar>
  )
}
