import { type FC, useState } from 'react'
import { useNavigate, Link, generatePath } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Card as NextUiCard, CardHeader, User, Spinner, CardBody, CardFooter } from '@heroui/react'
import { RiDeleteBinLine } from 'react-icons/ri'
import { FcDislike } from 'react-icons/fc'
import { MdOutlineFavoriteBorder } from 'react-icons/md'
import { FaRegComment } from 'react-icons/fa'

import { ECardType, ROUTE, BASE_URL } from '../../common/constants'
import { MetaInfo } from '../../common/components'
import {
  useLikePostMutation,
  useUnlikePostMutation,
  useLazyGetAllPostsQuery,
  useLazyGetPostQuery,
  useDeletePostMutation,
  useDeleteCommentMutation,
} from '../../services/api'
import { currentSelector } from '../../services/store'
import { clientDateFormat } from '../../services/utils'

type TProps = {
  avatarUrl: string
  name: string
  authorId: string
  content: string
  commentId?: string
  likesCount?: number
  commentsCount?: number
  createdAt?: Date
  id?: string
  cardFor?: ECardType
  likedByUser?: boolean
}

export const Card: FC<TProps> = ({
  avatarUrl,
  name,
  authorId,
  content,
  commentId,
  likesCount,
  commentsCount,
  createdAt,
  id,
  cardFor,
  likedByUser,
}) => {
  const navigate = useNavigate()
  const [errorMessage, setErrorMessage] = useState('')
  const currentUser = useSelector(currentSelector)
  const [likePost] = useLikePostMutation()
  const [unlikePost] = useUnlikePostMutation()
  const [triggerAllPosts] = useLazyGetAllPostsQuery()
  const [triggerPost] = useLazyGetPostQuery()
  const [deletePost, deletePostStatus] = useDeletePostMutation()
  const [deleteComment, deleteCommentStatus] = useDeleteCommentMutation()

  return (
    <NextUiCard className="mb-5">
      <CardHeader className="justify-between items-center bg-transparent">
        <Link to={generatePath(ROUTE.LAYOUT.OUTLET.CURRENT_USER, { id: authorId })}>
          <User
            className="text-small font-semibold lending-non text-default-600"
            name={name}
            description={clientDateFormat(createdAt)}
            avatarProps={{ src: `${BASE_URL}${avatarUrl}` }}
          />
        </Link>
        {authorId === currentUser?.id && (
          <div className="cursor-pointer">
            {deletePostStatus.isLoading || deleteCommentStatus.isLoading ? <Spinner /> : <RiDeleteBinLine />}
          </div>
        )}
      </CardHeader>
      <CardBody className="px-3 py-2 mb-5">
        <p className="text-xl">{content}</p>
      </CardBody>
      {cardFor === ECardType.comment && (
        <CardFooter className="gap-3">
          <div className="flex gap-5 items-center">
            <MetaInfo count={likesCount}>{likedByUser ? <FcDislike /> : <MdOutlineFavoriteBorder />}</MetaInfo>
          </div>
          <Link to={generatePath(ROUTE.LAYOUT.OUTLET.CURRENT_POST, { id: id! /* TODO */ })}>
            <MetaInfo count={commentsCount}>
              <FaRegComment />
            </MetaInfo>
          </Link>
          {errorMessage && <p className="text-red-500 mt-2 mb-5 text-small">{errorMessage}</p>}
        </CardFooter>
      )}
    </NextUiCard>
  )
}
