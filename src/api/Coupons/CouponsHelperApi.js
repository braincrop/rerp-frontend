import { axiosInstance } from '../axiosConfig'

export const AllCoupons = async () => {
  try {
    const response = await axiosInstance.get('coupons')
    return response
  } catch (error) {
    throw error
  }
}
export const PostCoupons = async (data) => {
  try {
    const response = await axiosInstance.post('coupons', data)
    return response
  } catch (error) {
    throw error
  }
}

export const Updatecoupons = async (data) => {
  const { id, updatedData } = data

  try {
    const response = await axiosInstance.put(`coupons/${id}`, {
      ...updatedData,
    })
    return response
  } catch (error) {
    throw error
  }
}

export const Deletecoupons = async (id) => {
  try {
    const response = await axiosInstance.delete(`coupons/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
