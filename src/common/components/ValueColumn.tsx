import type { FC } from 'react'

type TProps = {
  title: string
  value: number
}

export const ValueColumn: FC<TProps> = ({ title, value }) => (
  <div className="flex flex-col items-center space-x-2 p-4">
    <span className="text-4xl font-semibold">{value}</span>
    <span>{title}</span>
  </div>
)
