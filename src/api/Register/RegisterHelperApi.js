'use client'
import { axiosInstance } from '../axiosConfig'

export const RegisterUser = async (data) => {
  const response = await axiosInstance.post('Auth/register', data)
  return response.data
}