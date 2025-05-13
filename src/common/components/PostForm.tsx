import { type FC, useEffect } from 'react'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { useLocation } from 'react-router-dom'
import { Button, Textarea } from '@heroui/react'
import { IoMdCreate } from 'react-icons/io'

import { ROUTE } from '../constants'
import type { TPostForm } from '../types'
import { ErrorMessage } from './ErrorMessage'

type TProps = {
  onSubmit: SubmitHandler<TPostForm>
  placeholder?: string
  buttonText: string
  errorMessage?: string
}

export const PostForm: FC<TProps> = ({ onSubmit, placeholder, buttonText, errorMessage }) => {
  const {
    control,
    handleSubmit: formSubmitHandler,
    formState: { isSubmitted },
    reset,
  } = useForm<TPostForm>({ mode: 'onChange', defaultValues: { content: '' } })
  const location = useLocation()

  useEffect(() => {
    if (isSubmitted) {
      reset()
    }
  }, [isSubmitted, reset])

  return (
    <form className="flex-grow" onSubmit={formSubmitHandler(onSubmit)}>
      <Controller
        name="content"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <Textarea
            className="mb-5"
            required
            labelPlacement="outside"
            placeholder={placeholder}
            errorMessage={error?.message}
            {...field}
          />
        )}
      />
      <ErrorMessage errorMessage={errorMessage} />
      <Button
        className="flex-end"
        type="submit"
        color={location.pathname === ROUTE.LAYOUT.MAIN ? 'secondary' : 'primary'}
        endContent={<IoMdCreate />}
      >
        {buttonText}
      </Button>
    </form>
  )
}
