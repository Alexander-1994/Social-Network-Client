import type { FC, PropsWithChildren } from 'react'

type TProps = PropsWithChildren & {
  count?: number
}

export const MetaInfo: FC<TProps> = ({ count, children }) => (
  <div className="flex items-center gap-2 cursor-pointer">
    {!!count && <p className="font-semibold text-default-400 text-l">{count}</p>}
    <p className="text-default-400 text-xl hover:text-2xl ease-in duration-100">{children}</p>
  </div>
)
