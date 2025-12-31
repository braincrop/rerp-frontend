import { axiosInstance } from '../axiosConfig'

export const RestuarantItem = async (data) => {
  try {
    const response = await axiosInstance.get(`restaurant-items/by-subcategory/${data}`)
    return response
  } catch (error) {
    throw error
  }
}

export const PostRestuarantItem = async (data) => {
  console.log('data', data)
  try {
    const response = await axiosInstance.post('restaurant-items', data)
    return response
  } catch (error) {
    throw error
  }
}

export const UpdateRestuarant = async (data) => {
  const { restaurantItemID, updatedData } = data

  try {
    const response = await axiosInstance.put(`restaurant-items/${restaurantItemID}`, {
      ...updatedData,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteRestuarantItem = async (id) => {
  try {
    const response = await axiosInstance.delete(`restaurant-items/${id}`)
    return response
  } catch (error) {
    throw error
  }
}