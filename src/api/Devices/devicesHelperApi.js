'use client'
import { axiosInstance } from '../axiosConfig'

export const AllDevices = async () => {
  try {
    const response = await axiosInstance.get('Devices')
    return response
  } catch (error) {
    throw error
  }
}
export const PostDevices = async (data) => {
  try {
    const response = await axiosInstance.post('Devices', data)
    return response
  } catch (error) {
    throw error
  }
}

export const UpdateDevices = async (data) => {
  console.log("updated-data",data)
  const { id, updatedData } = data

  try {
    const response = await axiosInstance.put(`Devices/${id}`, {
      ...updatedData,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteDevices = async (id) => {
  try {
    const response = await axiosInstance.delete(`Devices/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
