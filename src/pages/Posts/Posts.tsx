import type { FC } from 'react'

import { useGetAllPostsQuery } from '../../services/api'
import { CreatePost } from '../../components'

export const Posts: FC = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
    </>
  )
}
