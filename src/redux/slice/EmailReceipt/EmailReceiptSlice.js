'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '../../../components/Notify'
import { AllEmailReceipt, DeleteEmailReceipt, PostEmailReceipt, UpdateEmailReceipt } from '../../../api/EmailReceipt/EmailReceiptHelperApi'

export const GetAllEmailReceipts= createAsyncThunk('EmailReceipt/AllEmailReceipt', async () => {
  try {
    const response = await AllEmailReceipt()
    return response.data
  } catch (error) {
    throw Error('Failed to fetch EmailReceipt')
  }
})

export const PostEmailReceipts = createAsyncThunk('EmailReceipt/postEmailReceipt', async (data, { rejectWithValue }) => {
  try {
    const response = await PostEmailReceipt(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post EmailReceipt')
  }
})

// export const GetSingleEmailReceipt = createAsyncThunk('EmailReceipt/SingleEmailReceipt', async (data, { rejectWithValue }) => {
//   try {
//     const response = await GetCategoriesById(data)
//     return response.data
//   } catch (error) {
//     return rejectWithValue('Failed to get single EmailReceipt')
//   }
// })

export const UpdatedEmailReceipt = createAsyncThunk('EmailReceipt/UpdateEmailReceipt', async (data, { rejectWithValue }) => {
  try {
    const response = await UpdateEmailReceipt(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to update EmailReceipt')
  }
})

export const DeleteEmailReceiptData = createAsyncThunk('EmailReceipt/DeleteEmailReceipt', async (id, { rejectWithValue }) => {
  try {
    const response = await DeleteEmailReceipt(id)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to delete EmailReceipt')
  }
})

const initialState = {
  EmailReceipt: [],
  singleCat:[],
  loading: false,
  error: null,
}

export const EmailReceiptSlice = createSlice({
  name: 'EmailReceipt',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostEmailReceipts.pending, (state) => {
        state.loading = true
      })
      .addCase(PostEmailReceipts.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.EmailReceipt.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostEmailReceipts.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    builder
      .addCase(UpdatedEmailReceipt.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedEmailReceipt.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          state.EmailReceipt = state.EmailReceipt.map((item) => (item.emailRecipientId === action.payload.data.emailRecipientId ? action.payload.data : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdatedEmailReceipt.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(GetAllEmailReceipts.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllEmailReceipts.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.EmailReceipt = action.payload?.data
      })
      .addCase(GetAllEmailReceipts.rejected, (state, action) => {
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
      .addCase(DeleteEmailReceiptData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteEmailReceiptData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.EmailReceipt = state.EmailReceipt.filter((item) => item.emailRecipientId !== deletedId)
          Notify('success', action.payload.message)
        }
      })
      .addCase(DeleteEmailReceiptData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = EmailReceiptSlice.actions

export const allEmailReceipt = (state) => state.allEmailReceipt

export default EmailReceiptSlice.reducer
