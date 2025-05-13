import { type FC, type PropsWithChildren, useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Card as NextUiCard, CardHeader, Divider, User, Spinner, CardBody, CardFooter } from '@heroui/react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FcDislike } from 'react-icons/fc'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { FaRegComment } from 'react-icons/fa'
import classNames from 'classnames'

import { ECardType, ROUTE, BASE_URL } from '../common/constants'
import { ErrorMessage, MetaInfo } from '../common/components'
import { useAppSelector } from '../services/hooks'
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostQuery,
  useDeletePostMutation,
  useDeleteCommentMutation,
} from '../services/api'
import { currentSelector } from '../services/store'
import { generateLayoutPath, clientDateFormat, hasErrorField } from '../services/utils'

type TProps = PropsWithChildren & {
  cardFor: ECardType
  avatarUrl: string
  name: string
  authorId: string
  postId: string
  commentId?: string
  content: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  likedByUser?: boolean
}

export const Card: FC<TProps> = ({
  avatarUrl,
  name,
  authorId,
  postId,
  commentId,
  content,
  likesCount,
  commentsCount,
  createdAt,
  cardFor,
  likedByUser,
  children,
}) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const currentUser = useAppSelector(currentSelector)
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()
  const [triggerGetPost] = useLazyGetPostQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()

  const isPost = cardFor === ECardType.post
  const isCurrentPost = cardFor === ECardType.currentPost
  const isComment = cardFor === ECardType.comment

  const handleDelete = async () => {
    try {
      switch (true) {
        case isPost:
          await deletePost(postId).unwrap()
          await triggerGetAllPosts().unwrap()
          break
        case isCurrentPost:
          await deletePost(postId).unwrap()
          navigate(ROUTE.LAYOUT.MAIN)
          break
        case isComment:
          await deleteComment(commentId ?? '').unwrap()
          await triggerGetPost(postId).unwrap()
          break
        default:
          throw new Error('Неверный параметр <cardFor>')
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      } else {
        setErrorMessage(error as string)
      }
    }
  }

  const handleLike = async () => {
    try {
      likedByUser ? await unlikePost(postId).unwrap() : await likePost({ postId }).unwrap()

      if (isCurrentPost) {
        await triggerGetPost(postId).unwrap()
      }

      await triggerGetAllPosts().unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      } else {
        setErrorMessage(error as string)
      }
    }
  }

  return (
    <div
      className={classNames('flex flex-col', {
        'mb-5': !isComment,
      })}
    >
      <NextUiCard>
        <CardHeader className="justify-between items-center bg-transparent">
          <Link to={generateLayoutPath(ROUTE.LAYOUT.OUTLET.CURRENT_USER, authorId)}>
            <User
              className="text-small font-semibold lending-non text-default-600"
              name={name}
              description={clientDateFormat(createdAt, 'dateUiWithTime')}
              avatarProps={{ src: `${BASE_URL}${avatarUrl}` }}
            />
          </Link>
          {authorId === currentUser?.id && (
            <div className="cursor-pointer" onClick={handleDelete}>
              {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? <Spinner /> : <RiDeleteBinLine />}
            </div>
          )}
        </CardHeader>
        <CardBody className="px-3 py-2">
          <p className="text-xl">{content}</p>
        </CardBody>
        {!isComment && (
          <CardFooter className="gap-3">
            <div className="flex gap-5 items-center" onClick={handleLike}>
              <MetaInfo count={likesCount}>{likedByUser ? <FcDislike /> : <MdOutlineFavoriteBorder />}</MetaInfo>
            </div>
            {!isCurrentPost && (
              <Link to={generateLayoutPath(ROUTE.LAYOUT.OUTLET.CURRENT_POST, postId!)}>
                <MetaInfo count={commentsCount}>
                  <FaRegComment />
                </MetaInfo>
              </Link>
            )}
          </CardFooter>
        )}
        {!!children && <Divider />}
        {children}
      </NextUiCard>
      <ErrorMessage errorMessage={errorMessage} />
    </div>
  )
}
