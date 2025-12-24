'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Notify from '../../../components/Notify';
import { AllVendiSplashMachine,PostVendiSplashMachine,UpdateVendiSplashMachine,DeleteVendingSplashMachine } from '../../../api/VendingSplashMachine/VendingSplashHelperApi';

export const GetAllVendiMachine = createAsyncThunk('VendiMachine/AllVendiMachine', async () => {
  try {
    const response = await AllVendiSplashMachine()
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to fetch VendiMachine')
  }
})

export const PostVendiMachine = createAsyncThunk('VendiMachine/postVendiMachine', async (data) => {
  try {
    const response = await PostVendiSplashMachine(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to post VendiMachine')
  }
})

export const UpdatedVendiMachine = createAsyncThunk('VendiMachine/UpdateVendiMachine', async (data) => {
  try {
    const response = await UpdateVendiSplashMachine(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to update VendiMachine')
  }
})

export const DeleteVendiMachine = createAsyncThunk('VendiMachine/DeleteVendiMachine', async (data) => {
  try {
    const response = await DeleteVendingSplashMachine(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to delete VendiMachine')
  }
})

const initialState = {
  VendiMachine: [],
  loading: false,
  error: null,
}

export const VendiSplashMachineSlice = createSlice({
  name: 'Vendi Splash Machine ',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(PostVendiMachine.pending, (state) => {
        state.loading = true
      })
      .addCase(PostVendiMachine.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.error = null
          state.VendiMachine.unshift(action.payload.data)
          Notify('success', 'Vendi Splash Machine added successfully')
        }
      })
      .addCase(PostVendiMachine.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(UpdatedVendiMachine.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedVendiMachine.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.VendiMachine = state.VendiMachine.map((item) => (item.vmSplashId === action.payload.data.vmSplashId ? action.payload.data : item))
          Notify('success', 'Vendi Splash Machine updated successfully')
        }
      })
      .addCase(UpdatedVendiMachine.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(GetAllVendiMachine.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllVendiMachine.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.VendiMachine = action.payload?.data
      })
      .addCase(GetAllVendiMachine.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(DeleteVendiMachine.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteVendiMachine.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.error = null
          const deletedId = action.meta.arg
          state.VendiMachine = state.VendiMachine.filter((item) => item.vmSplashId !== deletedId)
          Notify('success', 'Vendi Splash Machine deleted successfully')
        }
      })
      .addCase(DeleteVendiMachine.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {} = VendiSplashMachineSlice.actions

export const allVendiSplashMachine = (state) => state.allVendiSplashMachine

export default VendiSplashMachineSlice.reducer
