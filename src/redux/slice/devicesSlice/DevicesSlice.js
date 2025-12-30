'use client'
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import { AllDevices, DeleteDevices, PostDevices, UpdateDevices } from '@/api/Devices/devicesHelperApi'
import Notify from '@/components/Notify'

export const GetAllDevices = createAsyncThunk('Devices/AllDevices', async () => {
  try {
    const response = await AllDevices()
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to fetch devices')
  }
})

export const PostDevice = createAsyncThunk('Device/postDevice', async (data) => {
  try {
    const response = await PostDevices(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to post Device')
  }
})

export const UpdatedDevice = createAsyncThunk('Device/UpdateDevice', async (data) => {
  try {
    const response = await UpdateDevices(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to update Device')
  }
})

export const DeleteDeviceData = createAsyncThunk('Device/DeleteDevice', async (data) => {
  try {
    const response = await DeleteDevices(data)
    const _response = {
      data: response.data,
      status: response.status,
    }
    return _response
  } catch (error) {
    throw Error('Failed to delete Device')
  }
})

const initialState = {
  devices: [],
  loading: false,
  error: null,
}

export const DeviceSlice = createSlice({
  name: 'allDevices',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(GetAllDevices.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllDevices.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload) {
          state.error = null
          state.devices = action.payload?.data
        }
      })
      .addCase(GetAllDevices.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })

    builder
      .addCase(PostDevice.pending, (state) => {
        state.loading = true
      })
      .addCase(PostDevice.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 201) {
          const createdDevice = action.payload.data
          state.devices.unshift({
            id: createdDevice.id,
            name: createdDevice.name,
            deviceName: createdDevice.deviceName || '',
            ip: createdDevice.ip || '',
            isActive: createdDevice.isActive ?? false,
          })
          Notify('success', 'Device added successfully')
        }
      })
      .addCase(PostDevice.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(UpdatedDevice.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdatedDevice.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          const updatedId = action.meta.arg.id
          const updatedDevice = action.payload.data
          state.devices = state.devices.map((item) =>
            item.id === updatedId
              ? { ...item, ...updatedDevice }
              : item,
          )

          Notify('success', 'Device updated successfully')
        }
      })

      .addCase(UpdatedDevice.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
    builder
      .addCase(DeleteDeviceData.pending, (state) => {
        state.loading = true
      })
      .addCase(DeleteDeviceData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.status === 200) {
          state.error = null
          const deletedId = action.meta.arg
          state.devices = state.devices.filter((item) => item.id !== deletedId)
          Notify('success', 'devices deleted successfully')
        }
      })
      .addCase(DeleteDeviceData.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
      })
  },
})

export const {} = DeviceSlice.actions

export const allDevices = (state) => state.allDevices

export default DeviceSlice.reducer
