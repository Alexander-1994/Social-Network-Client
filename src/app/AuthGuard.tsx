import type { FC, PropsWithChildren } from 'react'
import { Spinner } from '@heroui/react'

import { useCurrentQuery } from '../services/api'

export const AuthGuard: FC<PropsWithChildren> = ({ children }) => {
  const { isLoading } = useCurrentQuery()

  if (isLoading) {
    return <Spinner />
  }

  return <>{children}</>
}
