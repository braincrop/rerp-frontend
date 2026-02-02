import { axiosInstance } from '../axiosConfig'

export const GetTranslationData = async () => {
  try {
    const response = await axiosInstance.get('translations/base')
    return response.data
  } catch (error) {
    throw error
  }
}

export const GetSingleTranslation = async () => {
  try {
    const response = await axiosInstance.get('translations/en')
    return response.data
  } catch (error) {
    throw error
  }
}

export const PostTanslation = async (data) => {
  try {
    const response = await axiosInstance.post('translations', data)
    return response.data
  } catch (error) {
    throw error
  }
}

export const UpdateTranlsation= async (data) => {
  const { id, updatedData } = data
  try {
    const response = await axiosInstance.put(`translations/${id}`, {
      ...updatedData,
    })
    return response.data
  } catch (error) {
    throw error
  }
}

export const DeleteTranslation = async (id) => {
  try {
    const response = await axiosInstance.delete(`translations/${id}`)
    return response.data
  } catch (error) {
    throw error
  }
}
