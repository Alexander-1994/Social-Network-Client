import { type FC, useState, useCallback } from 'react'
import type { SubmitHandler } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

import { AUTH_FORM_FIELD, LOCALE, INPUT_TYPE, ROUTE } from '../../common/constants'
import type { TAuthField, TAuthForm } from '../../common/types'
import { AuthForm } from '../../common/components'
import { useLoginMutation, useLazyCurrentQuery } from '../../services/api'
import { hasErrorField } from '../../services/utils'

const FIELDS: TAuthField[] = [
  {
    name: AUTH_FORM_FIELD.EMAIL,
    label: LOCALE.AUTH.LABEL.EMAIL,
    placeholder: '',
    type: INPUT_TYPE.EMAIL,
  },
  {
    name: AUTH_FORM_FIELD.PASSWORD,
    label: LOCALE.AUTH.LABEL.PASSWORD,
    placeholder: '',
    type: INPUT_TYPE.PASSWORD,
  },
]

type TProps = {
  onSwitch: VoidFunction
}

export const Login: FC<TProps> = ({ onSwitch }) => {
  const navigate = useNavigate()
  const [login, { isLoading }] = useLoginMutation()
  const [triggerCurrentQuery] = useLazyCurrentQuery()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit = useCallback<SubmitHandler<TAuthForm>>(async ({ email, password }) => {
    try {
      await login({ email, password }).unwrap()
      await triggerCurrentQuery()
      navigate(ROUTE.LAYOUT.MAIN)
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      }
    }
  }, [])

  return (
    <AuthForm
      fields={FIELDS}
      onSwitch={onSwitch}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      questionText={LOCALE.AUTH.QUESTION.NO_ACCOUNT}
      linkText={LOCALE.AUTH.LINK.REGISTER}
      buttonText={LOCALE.AUTH.LINK.LOGIN}
    />
  )
}
