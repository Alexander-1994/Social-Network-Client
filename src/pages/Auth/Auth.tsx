import { type FC, useState } from 'react'
import { Card, CardBody, Tabs, Tab } from '@heroui/react'

import { AUTH_VARIANT, LOCALE } from '../../common/constants'
import { Login, Registration } from '../../components'

export const Auth: FC = () => {
  const [variant, setVariant] = useState<string>(AUTH_VARIANT.LOGIN)

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs fullWidth size="md" selectedKey={variant} onSelectionChange={(key) => setVariant(key as string)}>
              <Tab key={AUTH_VARIANT.LOGIN} title={LOCALE.AUTH.TAB.LOGIN}>
                <Login onSwitch={() => setVariant(AUTH_VARIANT.REGISTRATION)} />
              </Tab>
              <Tab key={AUTH_VARIANT.REGISTRATION} title={LOCALE.AUTH.TAB.REGISTRATION}>
                <Registration onSwitch={() => setVariant(AUTH_VARIANT.LOGIN)} />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
  )
}
