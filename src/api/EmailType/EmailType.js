import { axiosInstance } from '../axiosConfig'

export const AllEmailTypes = async () => {
  try {
    const response = await axiosInstance.get('email-types')
    return response
  } catch (error) {
    throw error
  }
}
export const PostEmailTypes = async (data) => {
  try {
    const response = await axiosInstance.post('email-types', data)
    return response
  } catch (error) {
    throw error
  }
}

export const GetEmailTypesById = async (data) => {
  try {
    const response = await axiosInstance.get(`email-types/${data}`)
    return response
  } catch (error) {
    throw error
  }
}


export const UpdateEmailTypes = async (data) => {
    console.log("updated-data",data)
  const { id, updatedData } = data
  try {
    const response = await axiosInstance.put(`email-types/${id}`,{
        ...updatedData
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteEmailType = async (id) => {
  try {
    const response = await axiosInstance.delete(`email-types/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
