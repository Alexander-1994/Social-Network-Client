import type { FC } from 'react'
import { useParams } from 'react-router-dom'

import { LOCALE, ECardType } from '../../common/constants'
import { BackButton } from '../../common/components'
import { Card, CreateComment } from '../../components'
import { useGetPostQuery } from '../../services/api'

export const CurrentPost: FC = () => {
  const params = useParams<{ id: string }>()
  const { data } = useGetPostQuery(params.id ?? '')

  if (!data) {
    return <h2>{LOCALE.POST_NOT_EXIST}</h2>
  }

  const { id, authorId, author, content, comments, likes, likedByUser, createdAt } = data

  return (
    <>
      <BackButton />
      <Card
        cardFor={ECardType.currentPost}
        authorId={authorId}
        postId={id}
        avatarUrl={author.avatarUrl ?? ''}
        name={author.name ?? ''}
        content={content}
        likesCount={likes.length}
        commentsCount={comments.length}
        likedByUser={likedByUser}
        createdAt={createdAt}
      >
        <div className="flex flex-col gap-5 m-5">
          <CreateComment />
          {!!comments.length && <span>{LOCALE.COMMENTS_TO_POST}</span>}
          {comments.map(({ id, userId, user, content, postId }) => (
            <Card
              key={id}
              cardFor={ECardType.comment}
              authorId={userId}
              postId={postId}
              commentId={id}
              avatarUrl={user.avatarUrl ?? ''}
              name={user.name ?? ''}
              content={content}
            />
          ))}
        </div>
      </Card>
    </>
  )
}
