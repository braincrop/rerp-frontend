'use client'
import { axiosInstance } from '../axiosConfig'

export const AllBranch = async () => {
  try {
    const response = await axiosInstance.get('branches')
    return response
  } catch (error) {
    throw error
  }
}
export const PostBranch = async (data) => {
  try {
    const response = await axiosInstance.post('branches', data)
    return response
  } catch (error) {
    throw error
  }
}

export const UpdateBranch = async (data) => {
  const { branchId, updatedData } = data

  try {
    const response = await axiosInstance.put(`branches/${branchId}`, {
      ...updatedData,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteBranch = async (id) => {
  try {
    const response = await axiosInstance.delete(`branches/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
