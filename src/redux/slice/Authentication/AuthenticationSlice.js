'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '@/components/Notify'
import { LoginUser, RegisterUser } from '../../../api/Authentication/AuthHelperApi'


export const Registration = createAsyncThunk('Auth/Registration', async (data, { rejectWithValue }) => {
  try {
    const response = await RegisterUser(data)
    return response
  } catch (error) {
    return rejectWithValue(error.response?.data || { message: 'Something went wrong' })
  }
})

export const Login = createAsyncThunk('Auth/Login', async (data, { rejectWithValue }) => {
  try {
    const response = await LoginUser(data)
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

       builder
      .addCase(Login.pending, (state) => {
        state.loading = true
      })
      .addCase(Login.fulfilled, (state, action) => {
        state.loading = false
        if(typeof window !== 'undefined'){
           localStorage.setItem('token', action.payload?.token)
        }
        if(typeof window !== 'undefined'){
         document.cookie = `token=${action.payload?.token}; path=/; sameSite=lax;`
        }
        Notify('success','User Login successfully');
      })
      .addCase(Login.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload?.message || action.error.message
        Notify('error', action.payload?.message || 'Login failed')
      })

  },
})

export const {} = Authentication.actions

export const allUser = (state) => state.allUser

export default Authentication.reducer
