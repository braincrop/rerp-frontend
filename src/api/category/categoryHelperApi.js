'use client'
import { axiosInstance } from '../axiosConfig'

export const AllCategories = async () => {
  try {
    const response = await axiosInstance.get('distinct-categories')
    return response
  } catch (error) {
    throw error
  }
}
export const PostCategories = async (data) => {
  try {
    const response = await axiosInstance.post('distinct-categories', data)
    return response
  } catch (error) {
    throw error
  }
}

export const UpdateCategories = async (data) => {
  const { dcid, name } = data
  try {
    const response = await axiosInstance.put(`distinct-categories/${dcid}`, { name })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteCategory = async (id) => {
  try {
    const response = await axiosInstance.delete(`distinct-categories/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
