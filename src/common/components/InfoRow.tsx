import type { FC } from 'react'

type TProps = {
  title: string
  info?: string
}

export const InfoRow: FC<TProps> = ({ title, info }) => {
  if (!info) {
    return null
  }

  return (
    <p className="font-semibold">
      <span className="text-gray-500 mr-2">{title}</span>
      {info}
    </p>
  )
}
