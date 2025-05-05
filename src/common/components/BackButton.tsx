import type { FC } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaRegArrowAltCircleLeft } from 'react-icons/fa'

import { LOCALE } from '../constants'

export const BackButton: FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="text-default-500 flex items-center gap-2 mb-10 cursor-pointer" onClick={handleBack}>
      <FaRegArrowAltCircleLeft />
      {LOCALE.BACK}
    </div>
  )
}
