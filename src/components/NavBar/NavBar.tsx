import type { FC } from 'react'
import { BsPostcard } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaUsers } from 'react-icons/fa'

import { LOCALE, ROUTE } from '../../common/constants'
import { type TNavButton, NavButton } from '../NavButton'

const LINKS: TNavButton[] = [
  { text: LOCALE.NAV.POSTS, icon: <BsPostcard />, to: ROUTE.LAYOUT.OUTLET.POSTS },
  { text: LOCALE.NAV.FOLLOWING, icon: <FiUsers />, to: ROUTE.LAYOUT.OUTLET.FOLLOWING },
  { text: LOCALE.NAV.FOLLOWERS, icon: <FaUsers />, to: ROUTE.LAYOUT.OUTLET.FOLLOWERS },
]

export const NavBar: FC = () => (
  <nav>
    <ul className="flex flex-col gap-5">
      {LINKS.map((link, index) => (
        <NavButton key={index} {...link} />
      ))}
    </ul>
  </nav>
)
