import { type FC, type ChangeEvent, useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useForm, Controller, type SubmitHandler } from 'react-hook-form'
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Input, Textarea, Button } from '@heroui/react'
import classNames from 'classnames'
import { MdOutlineEmail } from 'react-icons/md'

import type { TEditProfileForm, TEditProfileField, TUser } from '../common/types'
import { EDIT_PROFILE_FIELD, LOCALE, INPUT_TYPE, EDIT_PROFILE_FORM_ID } from '../common/constants'
import { ErrorMessage } from '../common/components'
import { ThemeContext } from '../services/context'
import { useUpdateUserMutation } from '../services/api'
import { clientDateFormat, hasErrorField } from '../services/utils'

const FIELDS: TEditProfileField[] = [
  {
    name: EDIT_PROFILE_FIELD.EMAIL,
    label: LOCALE.EMAIL,
    endContent: <MdOutlineEmail />,
    type: INPUT_TYPE.EMAIL,
  },
  {
    name: EDIT_PROFILE_FIELD.NAME,
    label: LOCALE.NAME,
    type: INPUT_TYPE.TEXT,
  },
  {
    name: EDIT_PROFILE_FIELD.DATE_OF_BIRTH,
    label: LOCALE.DATA_0F_BIRTH,
    type: INPUT_TYPE.DATE,
  },
  {
    name: EDIT_PROFILE_FIELD.BIO,
    label: LOCALE.BIO,
    placeholder: LOCALE.BIO_PLACEHOLDER,
    type: INPUT_TYPE.TEXT,
  },
  {
    name: EDIT_PROFILE_FIELD.LOCATION,
    label: LOCALE.LOCATION,
    type: INPUT_TYPE.TEXT,
  },
]

type TProps = {
  isOpen: boolean
  user?: TUser
  onClose: VoidFunction
}

export const EditProfile: FC<TProps> = ({ isOpen, user, onClose }) => {
  const params = useParams<{ id: string }>()
  const { theme } = useContext(ThemeContext)
  const [errorMessage, setErrorMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [updateUser, { isLoading }] = useUpdateUserMutation()

  const { email, name, dateOfBirth, bio, location } = user ?? {}

  const { handleSubmit: formSubmitHandler, control } = useForm<TEditProfileForm>({
    mode: 'onChange',
    reValidateMode: 'onBlur',
    defaultValues: {
      email,
      name,
      dateOfBirth: clientDateFormat(dateOfBirth, 'dateInput'),
      bio,
      location,
    },
  })

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { files } = event.target

    if (files) {
      setSelectedFile(files[0])
    }
  }

  const handleSubmit: SubmitHandler<TEditProfileForm> = async ({ email, name, dateOfBirth, bio, location }) => {
    if (!params.id) {
      return
    }

    try {
      const formData = new FormData()

      email && email !== user?.email && formData.append(EDIT_PROFILE_FIELD.EMAIL, email)
      name && formData.append(EDIT_PROFILE_FIELD.NAME, name)
      dateOfBirth && formData.append(EDIT_PROFILE_FIELD.DATE_OF_BIRTH, new Date(dateOfBirth).toISOString())
      bio && formData.append(EDIT_PROFILE_FIELD.BIO, bio)
      location && formData.append(EDIT_PROFILE_FIELD.LOCATION, location)
      selectedFile && formData.append('avatar', selectedFile)

      await updateUser({ id: params.id, userData: formData }).unwrap()
      onClose()
    } catch (error) {
      if (hasErrorField(error)) {
        setErrorMessage(error.data.error)
      }
    }
  }

  return (
    <Modal className={classNames(theme, 'text-foreground')} isOpen={isOpen} isDismissable={false} onClose={onClose}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">{LOCALE.EDIT_PROFILE}</ModalHeader>
        <ModalBody>
          <form id={EDIT_PROFILE_FORM_ID} className="flex flex-col gap-4" onSubmit={formSubmitHandler(handleSubmit)}>
            {FIELDS.map(({ name, label, placeholder, endContent, type }) => (
              <Controller
                key={name}
                control={control}
                name={name}
                render={({ field, fieldState: { error } }) =>
                  name === EDIT_PROFILE_FIELD.BIO ? (
                    <Textarea
                      required
                      type={type}
                      label={label}
                      placeholder={placeholder}
                      rows={4}
                      errorMessage={error?.message}
                      {...field}
                    />
                  ) : (
                    <Input
                      required
                      type={type}
                      label={label}
                      placeholder={placeholder}
                      endContent={endContent}
                      errorMessage={error?.message}
                      {...field}
                    />
                  )
                }
              />
            ))}
            <Input type={INPUT_TYPE.FILE} onChange={handleFileChange} />
            <ErrorMessage errorMessage={errorMessage} />
          </form>
        </ModalBody>
        <ModalFooter>
          <Button variant="bordered" color="danger" fullWidth onPress={onClose}>
            {LOCALE.CLOSE}
          </Button>
          <Button
            type="submit"
            form={EDIT_PROFILE_FORM_ID}
            isLoading={isLoading}
            variant="bordered"
            color="primary"
            fullWidth
          >
            {LOCALE.UPDATE_PROFILE}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}
