import type { FC } from 'react'
import { type SubmitHandler, useForm, Controller } from 'react-hook-form'
import { Input, Link, Button } from '@heroui/react'

import type { TAuthField, TAuthForm } from '../types'
import { ErrorMessage } from './ErrorMessage'

type TProps = {
  fields: TAuthField[]
  onSwitch: VoidFunction
  onSubmit: SubmitHandler<TAuthForm>
  isLoading: boolean
  errorMessage?: string
  questionText: string
  linkText: string
  buttonText: string
}

export const AuthForm: FC<TProps> = ({
  fields,
  onSwitch,
  onSubmit,
  isLoading,
  errorMessage,
  questionText,
  linkText,
  buttonText,
}) => {
  const { control, handleSubmit: formSubmitHandler } = useForm<TAuthForm>({
    mode: 'onChange',
    defaultValues: { name: '', email: '', password: '' },
  })

  return (
    <form className="flex flex-col gap-4" onSubmit={formSubmitHandler(onSubmit)}>
      {fields.map(({ type, name, label, placeholder }) => (
        <Controller
          key={name}
          control={control}
          name={name}
          render={({ field, fieldState: { error } }) => (
            <Input
              type={type}
              label={label}
              placeholder={placeholder}
              required
              errorMessage={error?.message}
              {...field}
            />
          )}
        />
      ))}
      <ErrorMessage errorMessage={errorMessage} />
      <p className="text-center text-small">
        {questionText}{' '}
        <Link className="cursor-pointer" size="sm" onPress={onSwitch}>
          {linkText}
        </Link>
      </p>
      <div className="flex gap-2 justify-end">
        <Button type="submit" color="primary" isLoading={isLoading} fullWidth>
          {buttonText}
        </Button>
      </div>
    </form>
  )
}
