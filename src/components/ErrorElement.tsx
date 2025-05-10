import type { FC } from 'react'

import { LOCALE } from '../common/constants'

export const ErrorElement: FC = () => (
  <div className="w-screen h-screen flex flex-col justify-center items-center">
    <span>{LOCALE.SOMETHING_BROKE} &#128546;</span>
    <span>{LOCALE.TRY_LATER}</span>
    <a className="text-blue-300" href="mailto:kisliy.doma@gmail.com">
      {LOCALE.WRITE} &#9993;
    </a>
  </div>
)
