'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '../../../components/Notify'
import { AllEmployee, DeleteEmployee, PostEmployee, UpdateEmployee } from '../../../api/Employees/EmployeeHelperApi';

export const GetAllEmployee = createAsyncThunk('Employees/AllEmployees', async () => {
  try {
    const response = await AllEmployee()
    return response.data
  } catch (error) {
    throw Error('Failed to fetch Employees')
  }
})

export const PostEmployeesData = createAsyncThunk('Employees/postEmployees', async (data, { rejectWithValue }) => {
  try {
    const response = await PostEmployee(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post Employees')
  }
})

// export const GetSingleEmployees = createAsyncThunk('Employees/SingleEmployees', async (data, { rejectWithValue }) => {
//   try {
//     const response = await GetCategoriesById(data)
//     return response.data
//   } catch (error) {
//     return rejectWithValue('Failed to get single Employees')
//   }
// })

export const UpdatedEmployee = createAsyncThunk('Employees/UpdateEmployees', async (data, { rejectWithValue }) => {
  try {
    const response = await UpdateEmployee(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to update Employees')
  }
})

export const DeleteEmployeeData = createAsyncThunk('Employees/DeleteEmployees', async (id, { rejectWithValue }) => {
  try {
    const response = await DeleteEmployee(id)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to delete Employees')
  }
})

const initialState = {
  Employee: [],
  singleCat:[],
  loading: false,
  error: null,
}

export const EmployeeSlice = createSlice({
  name: 'Employee',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostEmployeesData.pending, (state) => {
        state.loading = true
      })
      .addCase(PostEmployeesData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.Employee.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostEmployeesData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    builder
      .addCase(UpdatedEmployee.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedEmployee.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          state.Employee = state.Employee.map((item) => (item.employeeId === action.payload.data.employeeId ? action.payload.data : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdatedEmployee.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(GetAllEmployee .pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllEmployee .fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.Employee = action.payload?.data
      })
      .addCase(GetAllEmployee .rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    // builder
    //   .addCase(GetSingleCategory.pending, (state) => {
    //     state.loading = true
    //   })
    //   .addCase(GetSingleCategory.fulfilled, (state, action) => {
    //     state.loading = false
    //     state.error = null
    //     state.singleCat = action.payload?.data
    //   })
    //   .addCase(GetSingleCategory.rejected, (state, action) => {
    //     state.loading = false
    //     state.error = action.error.message
    //   })

    builder
      .addCase(DeleteEmployeeData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteEmployeeData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.Employee = state.Employee.filter((item) => item.employeeId !== deletedId)
          Notify('success', action.payload.message)
        }
      })
      .addCase(DeleteEmployeeData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = EmployeeSlice.actions

export const AllEmployees = (state) => state.AllEmployees

export default EmployeeSlice.reducer
