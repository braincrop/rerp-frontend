'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AllCategories, PostCategories, DeleteCategory, UpdateCategories, GetCategoriesById } from '../../../api/category/categoryHelperApi'
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

export const PostCategory = createAsyncThunk('Category/postCategory', async (data, { rejectWithValue }) => {
  try {
    const response = await PostCategories(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post category')
  }
})

export const GetSingleCategory = createAsyncThunk('Category/SingleCategory', async (data, { rejectWithValue }) => {
  try {
    const response = await GetCategoriesById(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to get single category')
  }
})

export const UpdatedCategory = createAsyncThunk('Category/UpdateCategory', async (data, { rejectWithValue }) => {
  try {
    const response = await UpdateCategories(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to update category')
  }
})

export const DeleteCategoryData = createAsyncThunk('Category/DeleteCategory', async (id, { rejectWithValue }) => {
  try {
    const response = await DeleteCategory(id)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to delete category')
  }
})

const initialState = {
  category: [],
  singleCat:[],
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
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.category.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    builder
      .addCase(UpdatedCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedCategory.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          state.category = state.category.map((item) => (item.dcid === action.payload.data.dcid ? action.payload.data : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdatedCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(GetAllCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllCategory.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.category = action.payload?.data.data
      })
      .addCase(GetAllCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(GetSingleCategory.pending, (state) => {
        state.loading = true
      })
      .addCase(GetSingleCategory.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.singleCat = action.payload?.data
      })
      .addCase(GetSingleCategory.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(DeleteCategoryData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteCategoryData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.category = state.category.filter((item) => item.dcid !== deletedId)
          Notify('success', action.payload.message)
        }
      })
      .addCase(DeleteCategoryData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = CategorySlice.actions

export const allCategories = (state) => state.allCategories

export default CategorySlice.reducer
