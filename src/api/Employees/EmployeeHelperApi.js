import { axiosInstance } from '../axiosConfig'

export const AllEmployee = async () => {
  try {
    const response = await axiosInstance.get('employees')
    return response
  } catch (error) {
    throw error
  }
}
export const PostEmployee = async (data) => {
  try {
    const response = await axiosInstance.post('employees', data)
    return response
  } catch (error) {
    throw error
  }
}

export const GetEmployeeById = async (data) => {
  try {
    const response = await axiosInstance.get(`employees/${data}`)
    return response
  } catch (error) {
    throw error
  }
}


export const UpdateEmployee = async (data) => {
    console.log("updated-data",data)
  const { id, updatedData } = data
  try {
    const response = await axiosInstance.put(`employees/${id}`,{
        ...updatedData
    })
    return response
  } catch (error) {
    throw error
  }
}

export const DeleteEmployee = async (id) => {
  try {
    const response = await axiosInstance.delete(`employees/${id}`)
    return response
  } catch (error) {
    throw error
  }
}
