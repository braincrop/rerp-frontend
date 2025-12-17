'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '../../../components/Notify'
import { AllProducts, PostProducts, UpdateProducts, DeleteProduct } from '../../../api/products/productHelperApi';

export const GetAllProduct = createAsyncThunk('Product/AllProduct', async () => {
  try {
    const response = await AllProducts()
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to fetch Product')
  }
})

export const PostProduct = createAsyncThunk('Product/postProduct', async (data) => {
  try {
    const response = await PostProducts(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to post Product')
  }
})

export const UpdatedProduct = createAsyncThunk('Product/UpdateProduct', async (data) => {
  try {
    const response = await UpdateProducts(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to update Product')
  }
})

export const DeleteProductData = createAsyncThunk('Product/DeleteProduct', async (data) => {
  try {
    const response = await DeleteProduct(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to delete Product')
  }
})

const initialState = {
  product: [],
  loading: false,
  error: null,
}

export const ProductSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(PostProduct.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 201) {
          state.error = null
          state.product.unshift(action.payload.data)
          Notify('success', 'product added successfully')
        }
      })
      .addCase(PostProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(UpdatedProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedProduct.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.product = state.product.map((item) => (item.dpid === action.payload.data.dpid ? action.payload.data : item))
          Notify('success', 'product updated successfully')
        }
      })
      .addCase(UpdatedProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(GetAllProduct.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllProduct.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.product = action.payload?.data
      })
      .addCase(GetAllProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(DeleteProductData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteProductData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.error = null
          const deletedId = action.meta.arg
          state.product = state.product.filter((item) => item.dpid !== deletedId)
          Notify('success', 'product deleted successfully')
        }
      })
      .addCase(DeleteProductData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {} = ProductSlice.actions

export const allProducts = (state) => state.allProducts

export default ProductSlice.reducer
