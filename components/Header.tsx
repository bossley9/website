import React, { FC } from 'react'
import { BLink, Link } from 'components/Link'
import { Icon } from 'components/Icon'
import { APP_NAME } from 'constants/strings'
import 'constants/iconLibrary'

type Props = {
  hasTitle?: boolean
  hasHistory?: boolean
}

export const Header: FC<Props> = ({ hasTitle = true, hasHistory = false }) => (
  <header className="container posr my3 mb7 tc h-fs1">
    <div className="posr">
      {hasHistory && (
        <BLink>
          <Icon
            className="posa l-0 t-50 tf-sy-50 h-fs1 w-a"
            icon="arrow-left"
          />
        </BLink>
      )}
      {hasTitle && (
        <Link href="/" className="fs1">
          {APP_NAME}
        </Link>
      )}
    </div>
  </header>
)
