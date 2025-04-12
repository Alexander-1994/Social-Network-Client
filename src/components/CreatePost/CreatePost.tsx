import { type FC, useState, useCallback } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { Button, Textarea } from '@heroui/react'
import { IoMdCreate } from 'react-icons/io'

import { LOCALE } from '../../common/constants'
import type { TCreatePostForm } from '../../common/types'
import { useCreatePostMutation, useLazyGetAllPostsQuery } from '../../services/api'
import { hasErrorField } from '../../services/utils'

export const CreatePost: FC = () => {
  const [errorMessage, setErrorMessage] = useState('')
  const {
    control,
    handleSubmit: formSubmitHandler,
    reset,
  } = useForm<TCreatePostForm>({ defaultValues: { content: '' } })
  const [createPost] = useCreatePostMutation()
  const [triggerAllPost] = useLazyGetAllPostsQuery()

  const handleSubmit = useCallback<SubmitHandler<TCreatePostForm>>(async ({ content }) => {
    try {
      await createPost({ content }).unwrap()
      reset()
      await triggerAllPost()
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      }
    }
  }, [])

  return (
    <form className="flex-grow" onSubmit={formSubmitHandler(handleSubmit)}>
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Textarea
            className="mb-5"
            required
            labelPlacement="outside"
            placeholder={LOCALE.LAYOUT.POSTS.PLACEHOLDER}
            errorMessage={error?.message}
            {...field}
          />
        )}
      />
      {errorMessage && <p className="text-red-500 mt-2 mb-5 text-small">{errorMessage}</p>}
      <Button className="flex-end" type="submit" color="success" endContent={<IoMdCreate />}>
        {LOCALE.LAYOUT.POSTS.ADD_POST}
      </Button>
    </form>
  )
}
