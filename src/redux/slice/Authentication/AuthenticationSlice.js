'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '@/components/Notify'
import { RegisterUser } from '../../../api/Register/RegisterHelperApi'


export const Registration = createAsyncThunk('Auth/Registration', async (data, { rejectWithValue }) => {
  try {
    const response = await RegisterUser(data)
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Something went wrong' })
  }
})


const initialState = {
  devices: [],
  loading: false,
  error: null,
}

export const Authentication = createSlice({
  name: 'allUser',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(Registration.pending, (state) => {
        state.loading = true
      })
      .addCase(Registration.fulfilled, (state, action) => {
        state.loading = false
        Notify('success', action.payload?.message || 'User registered successfully');
      })
      .addCase(Registration.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || action.error.message
        Notify('error', action.payload?.message || 'Registration failed')
      })
  },
})

export const {} = Authentication.actions

export const allUser = (state) => state.allUser

export default Authentication.reducer
