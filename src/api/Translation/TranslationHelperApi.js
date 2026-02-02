import { axiosInstance } from '../axiosConfig'

export const GetTranslationData = async () => {
  try {
    const response = await axiosInstance.get('translations/base')
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
