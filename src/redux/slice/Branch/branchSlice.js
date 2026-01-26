'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '../../../components/Notify'
import { AllBranch, PostBranch, UpdateBranch, DeleteBranch, PostAssignBranch, ItemCategoryBulk } from '../../../api/branch/branchHelperApi'

export const GetAllBranch = createAsyncThunk('Branch/AllBranch', async () => {
  try {
    const response = await AllBranch()
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to fetch Branch')
  }
})

export const PostBranchData = createAsyncThunk('Branch/postBranch', async (data, { rejectWithValue }) => {
  try {
    const response = await PostBranch(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post Branch')
  }
})

export const PostAssignItemCategory = createAsyncThunk('Branch/AssignBranch', async (data) => {
  try {
    const response = await PostAssignBranch(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to post Branch')
  }
})

export const PostItemCategoryBulk = createAsyncThunk('Branch/ItemCategory', async (data, { rejectWithValue }) => {
  try {
    const response = await ItemCategoryBulk(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post Branch')
  }
})

export const UpdatedBranch = createAsyncThunk('Branch/UpdateBranch', async (data, { rejectWithValue }) => {
  try {
    const response = await UpdateBranch(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to update Branch')
  }
})

export const DeleteBranchData = createAsyncThunk('Branch/DeleteBranch', async (data, { rejectWithValue }) => {
  try {
    const response = await DeleteBranch(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to delete Branch')
  }
})

const initialState = {
  branch: [],
  loading: false,
  error: null,
}

export const BranchSlice = createSlice({
  name: 'branch',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostBranchData.pending, (state) => {
        state.loading = true
      })
      .addCase(PostBranchData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.branch.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostBranchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(PostAssignItemCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(PostAssignItemCategory.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.error = null
          Notify('success', 'ItemCategory created successfully')
        }
      })
      .addCase(PostAssignItemCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(PostItemCategoryBulk.pending, (state) => {
        state.loading = true
      })
      .addCase(PostItemCategoryBulk.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '201') {
          state.error = null
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostItemCategoryBulk.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(UpdatedBranch.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedBranch.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.branch = state.branch.map((item) => (item.branchId === action.payload.data.branchId ? action.payload.data : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdatedBranch.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    builder
      .addCase(GetAllBranch.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllBranch.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.branch = action.payload?.data.data
      })
      .addCase(GetAllBranch.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(DeleteBranchData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteBranchData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.branch = state.branch.filter((item) => item.branchId !== deletedId)
          Notify('success', action.payload.message)
        }
      })
      .addCase(DeleteBranchData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = BranchSlice.actions

export const allBranch = (state) => state.allBranch

export default BranchSlice.reducer
