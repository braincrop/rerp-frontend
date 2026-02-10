import { axiosInstance } from '../axiosConfig'

export const AllEmailReceipt = async () => {
  try {
    const response = await axiosInstance.get('email-recipients')
    return response
  } catch (error) {
    throw error
  }
}
export const PostEmailReceipt = async (data) => {
  try {
    const response = await axiosInstance.post('email-recipients', data)
    return response
  } catch (error) {
    throw error
  }
}

export const GetEmailReceiptById = async (data) => {
  try {
    const response = await axiosInstance.get(`email-recipients/${data}`)
    return response
  } catch (error) {
    throw error
  }
}


export const UpdateEmailReceipt = async (data) => {
    console.log("updated-data",data)
  const { id, updatedData } = data
  try {
    const response = await axiosInstance.put(`email-recipients/${id}`,{
        ...updatedData
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteEmailReceipt = async (id) => {
  try {
    const response = await axiosInstance.delete(`email-recipients/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
