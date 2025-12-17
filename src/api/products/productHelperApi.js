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
    const response = await axiosInstance.post('DistinctProducts', data)
    return response
  } catch (error) {
    throw error
  }
}

export const UpdateProducts = async (data) => {
  const { dpid, updatedData } = data

  try {
    const response = await axiosInstance.put(`DistinctProducts/${data.dpid}`, {
      ...updatedData,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`DistinctProducts/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
