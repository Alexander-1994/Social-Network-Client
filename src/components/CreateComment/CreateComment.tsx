import { type FC, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useParams } from 'react-router-dom'

import { LOCALE } from '../../common/constants'
import type { TPostForm } from '../../common/types'
import { PostForm } from '../../common/components'
import { useCreateCommentMutation, useLazyGetPostQuery } from '../../services/api'
import { hasErrorField } from '../../services/utils'

export const CreateComment: FC = () => {
  const params = useParams<{ id: string }>()
  const [errorMessage, setErrorMessage] = useState('')
  const [createComment] = useCreateCommentMutation()
  const [triggerGetPost] = useLazyGetPostQuery()

  const handleSubmit: SubmitHandler<TPostForm> = async ({ content }) => {
    try {
      if (params.id) {
        await createComment({ content, postId: params.id }).unwrap()
        await triggerGetPost(params.id).unwrap()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      }
    }
  }

  return (
    <PostForm
      onSubmit={handleSubmit}
      buttonText={LOCALE.ADD_COMMENT}
      placeholder={LOCALE.COMMENT_PLACEHOLDER}
      errorMessage={errorMessage}
    />
  )
}
