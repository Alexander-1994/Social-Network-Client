import type { FC, PropsWithChildren } from 'react'
import { Spinner } from '@heroui/react'

import { useCurrentQuery } from '../services/api'

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return (
      <div className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
        <Spinner />
      </div>
    )
  }

  return <>{children}</>
}
