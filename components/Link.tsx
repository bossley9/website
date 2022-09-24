import React, { FC, ReactNode } from 'react'
import NextLink from 'next/link'

const buttonClassNames = 'clearall ff-libre pointer hov-tdu'

type LinkProps = {
  as?: string
  href: string
  children: ReactNode
  className?: string
  style?: object
}

export const Link: FC<LinkProps> = ({
  as,
  href,
  children,
  className = '',
  style,
}) => (
  <NextLink href={href} as={as}>
    <button className={`${buttonClassNames} ${className}`} style={style}>
      {children}
    </button>
  </NextLink>
)

type BLinkProps = {
  children?: ReactNode
  className?: string
  style?: object
}

export const BLink: FC<BLinkProps> = ({
  children = 'Go Back',
  className = '',
  style,
}) => (
  <button
    onClick={() => window.history.back()}
    className={`${buttonClassNames} ${className}`}
    style={style}
  >
    {children}
  </button>
)
