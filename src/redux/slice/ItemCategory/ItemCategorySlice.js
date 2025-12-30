'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '@/components/Notify'
import { AllItemSubCategories } from '../../../api/AssignedItems/assignedItemHeplerApi'

export const GetItemCategory = createAsyncThunk('ItemCategory/AllItem', async (data) => {
  try {
    const response = await AllItemSubCategories(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to fetch item-category')
  }
})


const initialState = {
  itemCat: [],
  loading: false,
  error: null,
}

export const ItemCategorySlice = createSlice({
  name: 'ItemCategory',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetItemCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(GetItemCategory.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.error = null
          state.itemCat = action.payload?.data?.items
        }
      })
      .addCase(GetItemCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

  },
})

export const {} = ItemCategorySlice.actions

export const allItemCategory = (state) => state.allItemCategory

export default ItemCategorySlice.reducer
