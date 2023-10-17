import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { dateFormat } from './constants'
import dayjs from 'dayjs'

export const deepClone = (obj: any): any => {
  return JSON.parse(JSON.stringify(obj))
}

let axiosInstance: AxiosInstance | null = null
export const API = (force = false): AxiosInstance => {
  if (axiosInstance && !force) {
    return axiosInstance
  }
  axiosInstance = axios.create({ baseURL: `${process.env.REACT_APP_API_END_POINT}` })
  return axiosInstance
}

export const axiosAPI: (config: AxiosRequestConfig) => Promise<any> = async (config) => {
  try {
    const response = await API().request(config)
    return response?.data
  } catch (e: any) {
    if (e?.error?.response?.data?.message) {
      throw new Error(e.error.response.data.message || 'Bad response from server')
    } else {
      throw new Error(e?.error?.message || 'Bad response from server')
    }
  }
}

export const formatDate = (date: string): string => dayjs(new Date(date)).format(dateFormat)
