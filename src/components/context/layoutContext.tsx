import { type AxiosInstance } from 'axios'
import React, { type FC, createContext, useState, type Dispatch, type SetStateAction, useEffect } from 'react'
import { API } from '../../utils/helpers'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import { whoAmI } from '../../utils/api'

interface LoginUserData {
  id: string
  email: string
  role: string
}

interface LayoutContextProps {
  loginUserData: LoginUserData | null
  setLoginUserData: Dispatch<SetStateAction<LoginUserData | null>>
}

const initialState: LayoutContextProps = {
  loginUserData: null,
  setLoginUserData: (data: any) => {}
}
export const LayoutContext = createContext(initialState)

export const LayoutContextProvider: FC<any> = ({ children }) => {
  const [loginUserData, setLoginUserData] = useState<LoginUserData | null>(initialState.loginUserData)
  const [initialLoading, setInitialLoading] = useState(true)

  const [{ auth }] = useCookies(['auth'])
  const navigate = useNavigate()
  const axiosInstance: AxiosInstance = API()

  axiosInstance.interceptors.request.use(
    (c) => {
      if (auth?.session?.accessToken) {
        if (!(c && c.headers && c.headers.authorization)) {
          c.headers.authorization = `Bearer ${auth?.session?.accessToken}`
        }
      }
      return c
    },
    async (error) => {
      // Do something with request error
      return await Promise.reject(error)
    }
  )

  axiosInstance.interceptors.response.use(
    (response) => {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
      return response
    },
    async (error) => {
    // if ((error?.response && error?.response.status === 401) || error.response.status === 406) {
      return await Promise.reject(error)
    // }
    }
  )

  const getUserData = async (): Promise<any> => {
    try {
      setInitialLoading(true)
      const userData = await whoAmI()
      if (userData?.status === 'success') {
        setLoginUserData(userData?.data)
        navigate('/')
      }
      setInitialLoading(false)
    } catch (error) {
      console.error('Get login user data initial:', error)
      setInitialLoading(false)
    }
  }
  useEffect(() => {
    if (auth?.session?.accessToken) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      getUserData()
    } else {
      setInitialLoading(false)
    }
  }, [])

  if (initialLoading) {
    return (
    // <LayoutContext.Provider value={{ loginUserData, setLoginUserData }}>
        <h1>Loading</h1>
    // </LayoutContext.Provider>
    )
  }

  return (
    <LayoutContext.Provider value={{ loginUserData, setLoginUserData }}>
      {children}
    </LayoutContext.Provider>
  )
}
