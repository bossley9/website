import React, { FC } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  IconPrefix as IPrefix,
  IconName as IName,
} from '@fortawesome/fontawesome-common-types'

// re-exporting to make it easier to find
export type IconName = IName
export type IconPrefix = IPrefix

interface Props {
  prefix?: IconPrefix
  icon: IconName
  className?: string
  style?: object
}

export const Icon: FC<Props> = ({ prefix = 'fas', icon, ...props }) => {
  return <FontAwesomeIcon icon={[prefix, icon]} {...props} />
}
