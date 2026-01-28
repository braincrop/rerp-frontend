'use client'
import { axiosInstance } from '../axiosConfig'

export const AllVendiSplashMachine = async () => {
  try {
    const response = await axiosInstance.get('vm-splashes')
    return response
  } catch (error) {
    throw error
  }
}
export const PostVendiSplashMachine = async (data) => {
  try {
    const response = await axiosInstance.post('vm-splashes', data)
    return response
  } catch (error) {
    throw error
  }
}

export const UpdateVendiSplashMachine = async (data) => {
  const { id, updatedData } = data

  try {
    const response = await axiosInstance.put(`vm-splashes/${id}`, {
      ...updatedData,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteVendingSplashMachine = async (id) => {
  try {
    const response = await axiosInstance.delete(`vm-splashes/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
