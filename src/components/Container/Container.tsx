import type { FC, PropsWithChildren } from 'react'

export const Container: FC<PropsWithChildren> = ({ children }) => (
  <div className="flex max-w-screen-xl mx-auto mt-10">{children}</div>
)
