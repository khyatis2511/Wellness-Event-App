import { type AxiosInstance } from 'axios'
import React, { type FC, createContext, useState } from 'react'
import { API } from '../../utils/helper'
import { useCookies } from 'react-cookie'

const initialState = {
  loginUserData: null,
  setLoginUserData: (data: any) => {}
}
export const LayoutContext = createContext(initialState)

export const LayoutContextProvider: FC<any> = ({ children }) => {
  const [{ auth }] = useCookies(['auth'])
  const [loginUserData, setLoginUserData] = useState(initialState.loginUserData)
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

  return (
    <LayoutContext.Provider value={{ loginUserData, setLoginUserData }}>
      {children}
    </LayoutContext.Provider>
  )
}
