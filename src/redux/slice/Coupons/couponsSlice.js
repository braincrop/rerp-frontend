'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AllCategories, PostCategories, DeleteCategory, UpdateCategories, GetCategoriesById } from '../../../api/category/categoryHelperApi'
import Notify from '../../../components/Notify'
import { AllCoupons, Deletecoupons, PostCoupons, Updatecoupons } from '../../../api/Coupons/CouponsHelperApi'

export const GetAllCoupons = createAsyncThunk('Coupons/AllCoupons', async () => {
  try {
    const response = await AllCoupons()
    return response.data
  } catch (error) {
    throw Error('Failed to fetch coupons')
  }
})

export const PostCoupon = createAsyncThunk('Coupons/postCoupons', async (data, { rejectWithValue }) => {
  try {
    const response = await PostCoupons(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to post Coupons')
  }
})

// export const GetSingleCoupons = createAsyncThunk('Coupons/SingleCoupons', async (data, { rejectWithValue }) => {
//   try {
//     const response = await GetCategoriesById(data)
//     return response.data
//   } catch (error) {
//     return rejectWithValue('Failed to get single Coupons')
//   }
// })

export const UpdatedCoupons = createAsyncThunk('Coupons/UpdateCoupons', async (data, { rejectWithValue }) => {
  try {
    const response = await Updatecoupons(data)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to update Coupons')
  }
})

export const DeleteCouponsData = createAsyncThunk('Coupons/DeleteCoupons', async (id, { rejectWithValue }) => {
  try {
    const response = await Deletecoupons(id)
    return response.data
  } catch (error) {
    return rejectWithValue('Failed to delete Coupons')
  }
})

const initialState = {
  coupons: [],
  singleCat:[],
  loading: false,
  error: null,
}

export const CouponsSlice = createSlice({
  name: 'Coupons',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostCoupon.pending, (state) => {
        state.loading = true
      })
      .addCase(PostCoupon.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.coupons.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostCoupon.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    builder
      .addCase(UpdatedCoupons.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedCoupons.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          state.coupons = state.coupons.map((item) => (item.couponId === action.payload.data.couponId ? action.payload.data : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdatedCoupons.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(GetAllCoupons .pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllCoupons .fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.coupons = action.payload?.data
      })
      .addCase(GetAllCoupons .rejected, (state, action) => {
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
      .addCase(DeleteCouponsData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteCouponsData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.coupons = state.coupons.filter((item) => item.couponId !== deletedId)
          Notify('success', action.payload.message)
        }
      })
      .addCase(DeleteCouponsData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = CouponsSlice.actions

export const allCoupons = (state) => state.allCoupons

export default CouponsSlice.reducer
