import type { FC } from 'react'
import { Link } from 'react-router-dom'
import { Card as NextUiCard, CardBody, User } from '@heroui/react'

import { ROUTE, BASE_URL, LOCALE } from '../common/constants'
import { useAppSelector } from '../services/hooks'
import { currentSelector } from '../services/store'
import { generateLayoutPath } from '../services/utils'

export const Followers: FC = () => {
  const currentUser = useAppSelector(currentSelector)

  if (!currentUser) {
    return null
  }

  return currentUser.followers.length ? (
    <div className="flex flex-col gap-5">
      {currentUser.followers.map(({ id, follower }) => (
        <Link key={id} to={generateLayoutPath(ROUTE.LAYOUT.OUTLET.CURRENT_USER, follower.id)}>
          <NextUiCard>
            <CardBody className="block">
              <User
                name={follower.name}
                avatarProps={{ src: `${BASE_URL}${follower.avatarUrl}` }}
                description={follower.email}
              />
            </CardBody>
          </NextUiCard>
        </Link>
      ))}
    </div>
  ) : (
    <h2>{LOCALE.NO_FOLLOWERS}</h2>
  )
}
