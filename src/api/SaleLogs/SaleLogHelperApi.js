import { axiosLocal,axiosInstance } from '../axiosConfig'

export const GetSaleLogs = async (data) => {
    console.log('data---', data)
  try {
    const response = await axiosLocal.get('SalesLog/sales-logs',{
      params: {
        ...data,
      },
    })
    return response.data
  } catch (error) {
    throw error
  }
}