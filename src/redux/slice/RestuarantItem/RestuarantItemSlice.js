'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '@/components/Notify'
import { DeleteRestuarantItem, PostRestuarantItem, RestuarantItem, UpdateRestuarant } from '../../../api/RestuarantItem/restuarantItemHeplerApi'

export const GetRestuarantItem = createAsyncThunk('ItemCategory/AllItem', async (data) => {
  try {
    const response = await RestuarantItem(data)
    return response.data
  } catch (error) {
    throw Error('Failed to fetch item-category')
  }
})

export const PostRestuarantItemData = createAsyncThunk('RestuarantItem/PostRestuarantItem', async (data, { rejectWithValue }) => {
  try {
    const response = await PostRestuarantItem(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post ItemCategory')
  }
})

export const UpdateRestuarantItem = createAsyncThunk('RestuarantItem/UpdateRestuarantItem', async (data, { rejectWithValue }) => {
  try {
    const response = await UpdateRestuarant(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to update ItemCategory')
  }
})

export const DeleteRestuarantItemData = createAsyncThunk('RestuarantItem/DeleteRestuarantItem', async (data, { rejectWithValue }) => {
  try {
    const response = await DeleteRestuarantItem(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to delete ItemCategory')
  }
})

const initialState = {
  restuarantItem: [],
  loading: false,
  error: null,
}

export const RestuarantItemSlice = createSlice({
  name: 'ItemCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetRestuarantItem.pending, (state) => {
        state.loading = true
      })
      .addCase(GetRestuarantItem.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.error = null
          state.restuarantItem = action.payload?.data
        }
      })
      .addCase(GetRestuarantItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(PostRestuarantItemData.pending, (state) => {
        state.loading = true
      })
      .addCase(PostRestuarantItemData.fulfilled, (state, action) => {
        state.loading = false
        console.log('PostRestuarantItemData--', action.payload.data)
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.restuarantItem.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostRestuarantItemData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(UpdateRestuarantItem.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdateRestuarantItem.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.restuarantItem = state.restuarantItem.map((item) =>
            item.restaurantItemID === action.payload.data.restaurantItemID ? action.payload.data : item,
          )
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdateRestuarantItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(DeleteRestuarantItemData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteRestuarantItemData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.restuarantItem = state.restuarantItem.filter((item) => item.restaurantItemID !== deletedId)
          Notify('success', action.payload.message)
        }
      })
      .addCase(DeleteRestuarantItemData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = RestuarantItemSlice.actions

export const allRestuarantItem = (state) => state.allRestuarantItem

export default RestuarantItemSlice.reducer
