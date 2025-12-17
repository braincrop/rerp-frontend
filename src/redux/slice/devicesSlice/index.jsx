'use client';
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { AllDevices } from "@/api/Devices/devicesHelperApi";

export const GetAllDevices = createAsyncThunk(
  "Devices/AllDevices",
  async () => {
    try {
      const response = await AllDevices();
      const _response = {
        data: response.data,
        status: response.status,
      };
      return _response;
    } catch (error) {
      throw Error("Failed to devices");
    }
  }
);


const initialState = {
  devices:[],
  loading: false,
  error: null,
};

export const DeviceSlice = createSlice({
  name: "allDevices",
  initialState,
  reducers: {
  },
  extraReducers(builder) {
    builder
      .addCase(GetAllDevices.pending, (state) => {
        state.loading = true;
      })
      .addCase(GetAllDevices.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
            console.log("action.payload",action.payload);
          state.error = null;
          state.devices = action.payload?.data;
        }
      })
      .addCase(GetAllDevices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export const { } = DeviceSlice.actions;

export const allDevices = (state) => state.allDevices;

export default DeviceSlice.reducer;
