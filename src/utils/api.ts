import { axiosAPI } from './helpers'

export const loginAPI = async (payload: any): Promise<any> => {
  return await axiosAPI({
    url: '/auth/login',
    method: 'POST',
    data: payload
  })
}

// API to get logged in user data
export const whoAmI = async (authorization?: string): Promise<any> => {
  return await axiosAPI({
    url: '/auth/who-am-i',
    method: 'GET',
    headers: {
      authorization
    }
  })
}

export const getVendorListAPI = async (): Promise<any> => {
  return await axiosAPI({
    url: '/auth/vendors',
    method: 'GET'
  })
}

export const getEventListAPI = async (): Promise<any> => {
  return await axiosAPI({
    url: '/event',
    method: 'GET'
  })
}

export const createEventAPI = async (payload: any): Promise<any> => {
  return await axiosAPI({
    url: '/event',
    method: 'POST',
    data: payload
  })
}

export const updateEventAPI = async ({ eventId, payload }: any): Promise<any> => {
  return await axiosAPI({
    url: `/event/${eventId}`,
    method: 'PUT',
    data: payload
  })
}
