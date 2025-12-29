import { axiosInstance } from '../axiosConfig'

export const AllItemSubCategories = async (data) => {
  try {
    const response = await axiosInstance.get('item-subcategories', {
      params: {
        ...data,
      },
    })
    return response
  } catch (error) {
    throw error
  }
}
