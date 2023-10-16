import React, { type FC, useState } from 'react'
import LoginScene from './loginScene'

const LoginContainer: FC = () => {
  const [loading, setLoading] = useState()
  return (
    <LoginScene />
  )
}

export default LoginContainer
