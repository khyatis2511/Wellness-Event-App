import { yupResolver } from '@hookform/resolvers/yup'
import React, { useContext, useState, type FC } from 'react'
import { useCookies } from 'react-cookie'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { LayoutContext } from '../../components/context/layoutContext'
import { loginAPI, whoAmI } from '../../utils/api'
import { LoginSchema, type LoginSchemaInputs } from '../../utils/schema/loginSchema'
import LoginScene from './loginScene'

const LoginContainer: FC = () => {
  const [submitLoading, setSubmitLoading] = useState(false)

  const [, setCookie] = useCookies(['auth'])
  const { setLoginUserData } = useContext(LayoutContext)
  const navigate = useNavigate()

  const { control, handleSubmit, formState: { errors } } = useForm<LoginSchemaInputs>({
    resolver: yupResolver(LoginSchema)
  })

  const onSubmit = async (values: LoginSchemaInputs): Promise<any> => {
    try {
      setSubmitLoading(true)
      const payload = {
        email: values?.email,
        password: values?.password
      }
      const res = await loginAPI(payload)
      if (res?.access_token) {
        const authCookie = {
          session: {
            accessToken: res?.access_token
          }
        }

        const expirationTime = new Date(Date.now() + 5 * 60 * 60 * 1000)
        setCookie('auth', JSON.stringify(authCookie), { path: '/', expires: expirationTime })

        const userData = await whoAmI(`Bearer ${res?.access_token}`)
        if (userData?.status === 'success') {
          setLoginUserData(userData?.data)
          navigate('/')
        }
      }
      setSubmitLoading(false)
    } catch (error) {
      console.error('login error: ', error)
      setSubmitLoading(false)
    }
  }
  return (
    <LoginScene {...{
      control,
      handleSubmit,
      errors,
      onSubmit,
      submitLoading
    }} />
  )
}

export default LoginContainer
