'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '../../../components/Notify'
import { AllRole, AssignRole, DeleteRole, PostRole, UpdateRole } from '../../../api/Roles/RoleHelperApi'

export const GetAllRoles = createAsyncThunk('Role/AllRole', async () => {
  try {
    const response = await AllRole()
    return response.data
  } catch (error) {
    throw Error('Failed to fetch Role')
  }
})

export const PostRoles = createAsyncThunk('Role/postRole', async (data, { rejectWithValue }) => {
  try {
    const response = await PostRole(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post Role')
  }
})

export const AssignMultipleRole = createAsyncThunk('Role/AssignRole', async (data, { rejectWithValue }) => {
  try {
    const response = await AssignRole(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post users')
  }
})

// export const GetSingleRole = createAsyncThunk('Role/SingleRole', async (data, { rejectWithValue }) => {
//   try {
//     const response = await GetCategoriesById(data)
//     return response.data
//   } catch (error) {
//     return rejectWithValue('Failed to get single Role')
//   }
// })

export const UpdatedRoles = createAsyncThunk('Role/UpdateRole', async (data, { rejectWithValue }) => {
  try {
    const response = await UpdateRole(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to update Role')
  }
})

export const DeleteRoleData = createAsyncThunk('Role/DeleteRole', async (id, { rejectWithValue }) => {
  try {
    const response = await DeleteRole(id)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to delete Role')
  }
})

const initialState = {
  Role: [],
  loading: false,
  error: null,
}

export const RoleSlice = createSlice({
  name: 'Role',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostRoles.pending, (state) => {
        state.loading = true
      })
      .addCase(PostRoles.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.Role.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostRoles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

       builder
      .addCase(AssignMultipleRole.pending, (state) => {
        state.loading = true
      })
      .addCase(AssignMultipleRole.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          Notify('success', action.payload.message)
        }
      })
      .addCase(AssignMultipleRole.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })


    builder
      .addCase(UpdatedRoles.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedRoles.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          state.Role = state.Role.map((item) => (item.id === action.payload.data.id ? action.payload.data : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdatedRoles.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(GetAllRoles.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllRoles.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.Role = action.payload?.data
      })
      .addCase(GetAllRoles.rejected, (state, action) => {
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
      .addCase(DeleteRoleData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteRoleData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.Role = state.Role.filter((item) => item.id !== deletedId)
          Notify('success', action.payload.message)
        }
      })
      .addCase(DeleteRoleData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = RoleSlice.actions

export const allRoles = (state) => state.allRoles

export default RoleSlice.reducer
