import React, { FC, Fragment, ReactNode, useEffect, useState } from 'react'

type Props = {
  pass: string
  children: ReactNode
}

export const BasicAuth: FC<Props> = ({ pass, children }) => {
  const [isAuth, setIsAuth] = useState(false)

  useEffect(() => {
    const inputPass = window.prompt('password')
    if (inputPass === pass) setIsAuth(true)
  }, [pass])

  return <Fragment>{isAuth ? children : null}</Fragment>
}
