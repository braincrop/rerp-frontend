'use client'
import { axiosInstance } from '../axiosConfig'

export const RegisterUser = async (data) => {
  const response = await axiosInstance.post('Auth/register', data)
  return response.data
}

export const LoginUser = async (data) => {
  const response = await axiosInstance.post('Auth/login', data)
  return response.data
}

export const ForgotUserPass = async (data) => {
  const response = await axiosInstance.post('users/reset-password-simple', data)
  return response.data
}
