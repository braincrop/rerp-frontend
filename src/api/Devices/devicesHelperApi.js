"use client";
import { axiosInstance } from '../axiosConfig'

export const AllDevices = async () => {
  try {
    const response = await axiosInstance.get('Devices')
    return response
  } catch (error) {
    throw error
  }
}
