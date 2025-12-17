'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AllCategories, PostCategories, DeleteCategory, UpdateCategories } from '../../../api/category/categoryHelperApi'
import Notify from '../../../components/Notify'

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
    throw Error('Failed to post category')
  }
})

export const UpdatedCategory = createAsyncThunk('Category/UpdateCategory', async (data) => {
  try {
    const response = await UpdateCategories(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to update category')
  }
})

export const DeleteCategoryData = createAsyncThunk('Category/DeleteCategory', async (data) => {
  try {
    const response = await DeleteCategory(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to delete category')
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
  extraReducers: (builder) => {
    builder
      .addCase(PostCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(PostCategory.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 201) {
          state.error = null
          state.category.unshift(action.payload.data)
          Notify('success', 'Category added successfully')
        }
      })
      .addCase(UpdatedCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(UpdatedCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedCategory.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.category = state.category.map((item) => (item.dcid === action.payload.data.dcid ? action.payload.data : item))
          Notify('success', 'Category updated successfully')
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
        state.error = null
        state.category = action.payload?.data
      })
      .addCase(GetAllCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(DeleteCategoryData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteCategoryData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.error = null
          const deletedId = action.meta.arg
          state.category = state.category.filter((item) => item.dcid !== deletedId)
          Notify('success', 'Category deleted successfully')
        }
      })
      .addCase(DeleteCategoryData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {} = CategorySlice.actions

export const allCategories = (state) => state.allCategories

export default CategorySlice.reducer
