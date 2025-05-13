import { type FC, useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useDisclosure, Card as NextUiCard, Image, Button } from '@heroui/react'
import { MdOutlinePersonAddAlt1, MdOutlinePersonAddDisabled } from 'react-icons/md'
import { CiEdit } from 'react-icons/ci'

import { BASE_URL, LOCALE } from '../common/constants'
import { BackButton, ErrorMessage, InfoRow, ValueColumn } from '../common/components'
import { useAppSelector, useAppDispatch } from '../services/hooks'
import { currentSelector, resetUser } from '../services/store'
import {
  useGetUserQuery,
  useFollowUserMutation,
  useUnfollowUserMutation,
  useLazyGetUserQuery,
  useLazyCurrentQuery,
} from '../services/api'
import { clientDateFormat, hasErrorField } from '../services/utils'
import { EditProfile } from '../components'

export const UserProfile: FC = () => {
  const params = useParams<{ id: string }>()
  const [errorMessage, setErrorMessage] = useState('')
  const dispatch = useAppDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const currentUser = useAppSelector(currentSelector)
  const { data } = useGetUserQuery(params.id ?? '')
  const [followUser] = useFollowUserMutation()
  const [unfollowUser] = useUnfollowUserMutation()
  const [triggerGetUserQuery] = useLazyGetUserQuery()
  const [triggerCurrentQuery] = useLazyCurrentQuery()

  useEffect(
    () => () => {
      dispatch(resetUser())
    },
    [],
  )

  const handleFollow = async () => {
    try {
      if (params.id) {
        data?.isFollowing
          ? await unfollowUser(params.id).unwrap()
          : await followUser({ followingId: params.id }).unwrap()
        await triggerGetUserQuery(params.id)
        await triggerCurrentQuery()
      }
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      }
    }
  }

  const handleModalClose = async () => {
    try {
      if (params.id) {
        await triggerGetUserQuery(params.id)
        await triggerCurrentQuery()
        onClose()
      }
    } catch (error) {
      console.error(error)
    }
  }

  if (!data) {
    return null
  }

  return (
    <>
      <BackButton />
      <div className="flex items-stretch gap-4">
        <NextUiCard className="flex flex-col items-center text-center space-y-5 p-5 flex-2">
          <Image
            className="object-cover border-4 border-white"
            width={200}
            height={200}
            src={`${BASE_URL}${data.avatarUrl}`}
            alt={data.name}
          />
          <div className="flex flex-col text-2xl font-bold gap-4 item-center">
            {data.name}
            {currentUser?.id !== params.id ? (
              <Button
                className="gap-2"
                color={data.isFollowing ? 'default' : 'primary'}
                variant="flat"
                endContent={data.isFollowing ? <MdOutlinePersonAddDisabled /> : <MdOutlinePersonAddAlt1 />}
                onPress={handleFollow}
              >
                {data.isFollowing ? LOCALE.UNSUBSCRIBE : LOCALE.SUBSCRIBE}
              </Button>
            ) : (
              <Button endContent={<CiEdit />} onPress={onOpen}>
                {LOCALE.EDIT}
              </Button>
            )}
          </div>
          <ErrorMessage errorMessage={errorMessage} />
        </NextUiCard>
        <NextUiCard className="flex flex-col space-y-4 p-5 flex-1">
          <InfoRow title={LOCALE.MAIL} info={data.email} />
          <InfoRow title={LOCALE.LOCATION} info={data.location} />
          <InfoRow title={LOCALE.DATA_0F_BIRTH} info={clientDateFormat(data.dateOfBirth)} />
          <InfoRow title={LOCALE.BIO} info={data.bio} />
          <div className="flex gap-2">
            <ValueColumn title={LOCALE.FOLLOWERS} value={data.followers.length} />
            <ValueColumn title={LOCALE.FOLLOWING} value={data.following.length} />
          </div>
        </NextUiCard>
      </div>
      <EditProfile isOpen={isOpen} user={data} onClose={handleModalClose} />
    </>
  )
}
