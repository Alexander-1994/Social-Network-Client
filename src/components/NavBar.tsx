import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@heroui/react'
import { BsPostcard } from 'react-icons/bs'
import { FiUsers } from 'react-icons/fi'
import { FaUsers } from 'react-icons/fa'

import { LOCALE, ROUTE } from '../common/constants'

const LINKS = [
  { text: LOCALE.POSTS, icon: <BsPostcard />, to: ROUTE.LAYOUT.OUTLET.POSTS },
  { text: LOCALE.FOLLOWING, icon: <FiUsers />, to: ROUTE.LAYOUT.OUTLET.FOLLOWING },
  { text: LOCALE.FOLLOWERS, icon: <FaUsers />, to: ROUTE.LAYOUT.OUTLET.FOLLOWERS },
]

export const NavBar: FC = () => {
  const navigate = useNavigate()

  return (
    <nav>
      <ul className="flex flex-col gap-5">
        {LINKS.map(({ icon, to, text }) => (
          <Button
            key={text}
            className="flex justify-start text-xl"
            size="lg"
            startContent={icon}
            variant="light"
            onPress={() => navigate(to)}
          >
            {text}
          </Button>
        ))}
      </ul>
    </nav>
  )
}
