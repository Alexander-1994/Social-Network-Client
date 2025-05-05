import { type FC, useState } from 'react'
import { type SubmitHandler } from 'react-hook-form'

import { AUTH_FORM_FIELD, LOCALE, INPUT_TYPE } from '../../common/constants'
import type { TAuthField, TAuthForm } from '../../common/types'
import { AuthForm } from '../../common/components'
import { useRegisterMutation } from '../../services/api'
import { hasErrorField } from '../../services/utils'

const FIELDS: TAuthField[] = [
  {
    name: AUTH_FORM_FIELD.NAME,
    label: LOCALE.NAME,
    placeholder: '',
    type: INPUT_TYPE.TEXT,
  },
  {
    name: AUTH_FORM_FIELD.EMAIL,
    label: LOCALE.EMAIL,
    placeholder: '',
    type: INPUT_TYPE.EMAIL,
  },
  {
    name: AUTH_FORM_FIELD.PASSWORD,
    label: LOCALE.PASSWORD,
    placeholder: '',
    type: INPUT_TYPE.PASSWORD,
  },
]

type TProps = {
  onSwitch: VoidFunction
}

export const Registration: FC<TProps> = ({ onSwitch }) => {
  const [register, { isLoading }] = useRegisterMutation()
  const [errorMessage, setErrorMessage] = useState('')

  const handleSubmit: SubmitHandler<TAuthForm> = async (data) => {
    try {
      await register(data).unwrap()
      onSwitch()
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      }
    }
  }

  return (
    <AuthForm
      fields={FIELDS}
      onSwitch={onSwitch}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      errorMessage={errorMessage}
      questionText={LOCALE.HAS_ACCOUNT}
      linkText={LOCALE.LOGIN_TO_ACCOUNT}
      buttonText={LOCALE.REGISTER_ONESELF}
    />
  )
}
