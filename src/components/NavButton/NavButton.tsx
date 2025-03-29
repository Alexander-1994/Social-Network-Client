import { FC } from 'react'
import { Button } from '@heroui/react'
import { useNavigate } from 'react-router-dom'

export type TProps = {
  icon: JSX.Element
  to: string
  text: string
}

export const NavButton: FC<TProps> = ({ icon, to, text }) => {
  const navigate = useNavigate()

  return (
    <Button
      className="flex justify-start text-xl"
      size="lg"
      startContent={icon}
      variant="light"
      onClick={() => navigate(to)}
    >
      {text}
    </Button>
  )
}
