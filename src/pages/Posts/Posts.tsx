import type { FC } from 'react'

import { ECardType } from '../../common/constants'
import { useGetAllPostsQuery } from '../../services/api'
import { CreatePost, Card } from '../../components'

export const Posts: FC = () => {
  const { data } = useGetAllPostsQuery()

  return (
    <>
      <div className="mb-10 w-full">
        <CreatePost />
      </div>
      {data?.map(({ author, authorId, comments, content, createdAt, id, likedByUser, likes, updatedAt }) => (
        <Card
          key={id}
          cardFor={ECardType.post}
          id={id}
          authorId={authorId}
          avatarUrl={author.avatarUrl ?? ''}
          name={author.name ?? ''}
          content={content}
          likesCount={likes.length}
          commentsCount={comments.length}
          likedByUser={likedByUser}
          createdAt={createdAt}
        />
      ))}
    </>
  )
}
