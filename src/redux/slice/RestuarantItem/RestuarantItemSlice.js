'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '@/components/Notify'
import { DeleteRestuarantItem, PostRestuarantItem, RestuarantItem, UpdateRestuarant } from '../../../api/RestuarantItem/restuarantItemHeplerApi'

export const GetRestuarantItem = createAsyncThunk('ItemCategory/AllItem', async (data) => {
  try {
    const response = await RestuarantItem(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to fetch item-category')
  }
})

export const PostRestuarantItemData = createAsyncThunk('RestuarantItem/PostRestuarantItem', async (data) => {
  try {
    const response = await PostRestuarantItem(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to post ItemCategory')
  }
})

export const UpdateRestuarantItem = createAsyncThunk('RestuarantItem/UpdateRestuarantItem', async (data) => {
  try {
    const response = await UpdateRestuarant(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to update ItemCategory')
  }
})

export const DeleteRestuarantItemData = createAsyncThunk('RestuarantItem/DeleteRestuarantItem', async (data) => {
  try {
    const response = await DeleteRestuarantItem(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to delete ItemCategory')
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
          state.restuarantItem = action.payload?.data?.items
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
        if (action.payload?.status === 200) {
          state.error = null
          state.restuarantItem.unshift(action.payload.data)
          Notify('success', 'RestuarantItem added successfully')
        }
      })
      .addCase(PostRestuarantItemData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(UpdateRestuarantItem.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdateRestuarantItem.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.restuarantItem = state.product.map((item) => (item.dpid === action.payload.data.dpid ? action.payload.data : item))
          Notify('success', 'RestuarantItem updated successfully')
        }
      })
      .addCase(UpdateRestuarantItem.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(DeleteRestuarantItemData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteRestuarantItemData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.error = null
          const deletedId = action.meta.arg
          state.restuarantItem = state.restuarantItem.filter((item) => item.dpid !== deletedId)
          Notify('success', 'RestuarantItem deleted successfully')
        }
      })
      .addCase(DeleteRestuarantItemData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {} = RestuarantItemSlice.actions

export const allRestuarantItem = (state) => state.allRestuarantItem

export default RestuarantItemSlice.reducer
