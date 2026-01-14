'use client'
import { axiosInstance } from '../axiosConfig'

export const AllProducts = async () => {
  try {
    const response = await axiosInstance.get('distinct-products')
    return response
  } catch (error) {
    throw error
  }
}

export const GetSingleByIdProducts = async (id) => {
  try {
    const response = await axiosInstance.get(`distinct-products/${id}`)
    return response
  } catch (error) {
    throw error
  }
}


export const PostProducts = async (data) => {
  try {
    const response = await axiosInstance.post('distinct-products', data)
    return response
  } catch (error) {
    throw error
  }
}

export const PostBulkUpsertProduct = async (data) => {
  console.log('data---', data)
  try {
    const response = await axiosInstance.post('distinct-products/bulk-upsert', data)
    return response
  } catch (error) {
    throw error
  }
}


export const UpdateProducts = async (data) => {
  const { dpid, updatedData } = data
  try {
    const response = await axiosInstance.put(`distinct-products/${data.dpid}`, {
      ...updatedData,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteProduct = async (id) => {
  try {
    const response = await axiosInstance.delete(`distinct-products/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
