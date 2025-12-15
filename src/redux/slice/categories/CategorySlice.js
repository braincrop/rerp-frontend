'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AllCategories, PostCategories } from '../../../api/category/categoryHelperApi'
import { toast } from 'react-toastify'

export const GetAllCategory = createAsyncThunk('Category/AllCategory', async () => {
  try {
    const response = await AllCategories()
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to fetch category')
  }
})

export const PostCategory = createAsyncThunk('Category/postCategory', async (data) => {
  try {
    const response = await PostCategories(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to fetch category')
  }
})

const initialState = {
  category: [],
  loading: false,
  error: null,
}

export const CategorySlice = createSlice({
  name: 'Category',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(PostCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(PostCategory.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload.status === 201) {
          console.log('action.payload-', action.payload)
          state.error = null
          toast('🦄 Wow so easy!', {
            position: 'top-right',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'light', 
          })
          //   state.category = action.payload?.data;
        }
      })
      .addCase(PostCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(GetAllCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllCategory.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          console.log('action.payload', action.payload)
          state.error = null
          state.category = action.payload?.data
        }
      })
      .addCase(GetAllCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {} = CategorySlice.actions

export const allCategories = (state) => state.allCategories

export default CategorySlice.reducer
