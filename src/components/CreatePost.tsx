import { type FC, useState } from 'react'
import type { SubmitHandler } from 'react-hook-form'

import { LOCALE } from '../common/constants'
import type { TPostForm } from '../common/types'
import { PostForm } from '../common/components'
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../services/api'
import { hasErrorField } from '../services/utils'

export const CreatePost: FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const [createPost] = useCreatePostMutation()
  const [triggerGetAllPosts] = useLazyGetAllPostsQuery()

  const handleSubmit: SubmitHandler<TPostForm> = async ({ content }) => {
    try {
      await createPost({ content }).unwrap()
      await triggerGetAllPosts().unwrap()
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      }
    }
  }

  return (
    <PostForm
      onSubmit={handleSubmit}
      buttonText={LOCALE.ADD_POST}
      placeholder={LOCALE.POST_PLACEHOLDER}
      errorMessage={errorMessage}
    />
  )
}
