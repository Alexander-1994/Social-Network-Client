import { type FC } from 'react'
import { Card, CardHeader, Image, CardBody } from '@heroui/react'
import { Link, generatePath } from 'react-router-dom'
import { MdAlternateEmail } from 'react-icons/md'

import { BASE_URL, ROUTE } from '../../common/constants'
import { useAppSelector } from '../../services/hooks'
import { currentSelector } from '../../services/store'

export const Profile: FC = () => {
  const current = useAppSelector(currentSelector)

  if (!current) {
    return null
  }

  const { name, email, avatarUrl, id } = current

  return (
    <Card className="py-4 w-[302px]">
      <CardHeader className="pb-0 pt-2 px-4 flex-col items-center">
        <Image className="object-cover rounded-xl" alt="Card profile" src={`${BASE_URL}${avatarUrl}`} width={370} />
      </CardHeader>
      <CardBody>
        <Link to={generatePath(ROUTE.LAYOUT.OUTLET.CURRENT_USER, { id })}>
          <h4 className="font-bold text-large mb-2">{name}</h4>
        </Link>
        <p className="text-default-500 flex items-center gap-2">
          <MdAlternateEmail color="purple" />
          {email}
        </p>
      </CardBody>
    </Card>
  )
}
