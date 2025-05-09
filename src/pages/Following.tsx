import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Card as NextUiCard, CardBody, User } from '@heroui/react'

import { ROUTE, BASE_URL, LOCALE } from '../common/constants'
import { useAppSelector } from '../services/hooks'
import { currentSelector } from '../services/store'
import { generateLayoutPath } from '../services/utils'

export const Following: FC = () => {
  const currentUser = useAppSelector(currentSelector)

  if (!currentUser) {
    return null
  }

  return currentUser.following.length ? (
    <div className="flex flex-col gap-5">
      {currentUser.following.map(({ id, following }) => (
        <Link key={id} to={generateLayoutPath(ROUTE.LAYOUT.OUTLET.CURRENT_USER, following.id)}>
          <NextUiCard>
            <CardBody className="block">
              <User
                name={following.name}
                avatarProps={{ src: `${BASE_URL}${following.avatarUrl}` }}
                description={following.email}
              />
            </CardBody>
          </NextUiCard>
        </Link>
      ))}
    </div>
  ) : (
    <h2>{LOCALE.NO_FOLLOWING}</h2>
  )
}
