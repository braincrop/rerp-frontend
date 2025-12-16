'use client'
import { axiosInstance } from '../axiosConfig'

export const AllProducts = async () => {
  try {
    const response = await axiosInstance.get('DistinctProducts')
    return response
  } catch (error) {
    throw error
  }
}
export const PostProducts = async (data) => {
  try {
    const response = await axiosInstance.post('DistinctCategory', data)
    return response
  } catch (error) {
    throw error
  }
}

export const UpdateProducts = async (data) => {
  const { dcid, name } = data
  try {
    const response = await axiosInstance.put(`DistinctCategory/${dcid}`, { name })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`DistinctCategory/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
