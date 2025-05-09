import type { FC } from 'react'

type TProps = { errorMessage?: string }

export const ErrorMessage: FC<TProps> = ({ errorMessage }) =>
  errorMessage ? <p className="text-red-500 mt-2 mb-5 text-small">{errorMessage}</p> : null
