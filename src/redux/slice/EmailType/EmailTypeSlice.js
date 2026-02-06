'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AllCategories, PostCategories, DeleteCategory, UpdateCategories, GetCategoriesById } from '../../../api/category/categoryHelperApi'
import Notify from '../../../components/Notify'
import { AllEmailTypes, DeleteEmailType, PostEmailTypes, UpdateEmailTypes } from '../../../api/EmailType/EmailType'

export const GetAllEmails = createAsyncThunk('EmailType/AllEmailType', async () => {
  try {
    const response = await AllEmailTypes()
    return response.data
  } catch (error) {
    throw Error('Failed to fetch EmailType')
  }
})

export const PostEmails = createAsyncThunk('EmailType/postEmailType', async (data, { rejectWithValue }) => {
  try {
    const response = await PostEmailTypes(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post EmailType')
  }
})

// export const GetSingleEmailType = createAsyncThunk('EmailType/SingleEmailType', async (data, { rejectWithValue }) => {
//   try {
//     const response = await GetCategoriesById(data)
//     return response.data
//   } catch (error) {
//     return rejectWithValue('Failed to get single EmailType')
//   }
// })

export const UpdatedEmailType = createAsyncThunk('EmailType/UpdateEmailType', async (data, { rejectWithValue }) => {
  try {
    const response = await UpdateEmailTypes(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to update EmailType')
  }
})

export const DeleteEmailTypeData = createAsyncThunk('EmailType/DeleteEmailType', async (id, { rejectWithValue }) => {
  try {
    const response = await DeleteEmailType(id)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to delete EmailType')
  }
})

const initialState = {
  EmailType: [],
  singleCat:[],
  loading: false,
  error: null,
}

export const EmailTypeSlice = createSlice({
  name: 'EmailType',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostEmails.pending, (state) => {
        state.loading = true
      })
      .addCase(PostEmails.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.EmailType.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostEmails.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    builder
      .addCase(UpdatedEmailType.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedEmailType.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          state.EmailType = state.EmailType.map((item) => (item.emailTypeId === action.payload.data.emailTypeId ? action.payload.data : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdatedEmailType.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(GetAllEmails .pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllEmails .fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.EmailType = action.payload?.data
      })
      .addCase(GetAllEmails .rejected, (state, action) => {
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
      .addCase(DeleteEmailTypeData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteEmailTypeData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.EmailType = state.EmailType.filter((item) => item.emailTypeId !== deletedId)
          Notify('success', action.payload.message)
        }
      })
      .addCase(DeleteEmailTypeData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = EmailTypeSlice.actions

export const AllEmailType = (state) => state.AllEmailType

export default EmailTypeSlice.reducer
