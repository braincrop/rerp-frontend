import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '../../../components/Notify'
import { GetSingleTranslation, GetTranslationData, PostTanslation, UpdateTranlsation } from '../../../api/Translation/TranslationHelperApi'

export const GetAllTranslation = createAsyncThunk('Translation/TranslationBase', async () => {
  try {
    const response = await GetTranslationData()
    return response
  } catch (error) {
    throw Error('Failed to fetch Branch')
  }
})

export const GetSingleTranslationData = createAsyncThunk('Translation/SingleTranslation', async () => {
  try {
    const response = await GetSingleTranslation()
    return response.data
  } catch (error) {
    throw Error('Failed to fetch Branch')
  }
})

export const PostTranslation = createAsyncThunk('translation/postTranslation', async (data, { rejectWithValue }) => {
  try {
    const response = await PostTanslation(data)
    return response
  } catch (error) {
    return rejectWithValue('Failed to post Branch')
  }
})

export const UpdateTranslationData = createAsyncThunk('translation/UpdateTranslation', async (data, { rejectWithValue }) => {
  try {
    const response = await UpdateTranlsation(data)
    return response
  } catch (error) {
    return rejectWithValue('Failed to update UserInfo')
  }
})

const initialState = {
  allTranslationBase: [],
  translation: [],
  loading: false,
  error: null,
}

export const TranslationSlice = createSlice({
  name: 'Translation',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(GetAllTranslation.pending, (state) => {
        state.loading = true
      })
      .addCase(GetAllTranslation.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.allTranslationBase = action.payload.data
      })
      .addCase(GetAllTranslation.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    builder
      .addCase(GetSingleTranslationData.pending, (state) => {
        state.loading = true
      })
      .addCase(GetSingleTranslationData.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.translation = action.payload
      })
      .addCase(GetSingleTranslationData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })

    builder
      .addCase(PostTranslation.pending, (state) => {
        state.loading = true
      })
      .addCase(PostTranslation.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '201') {
          state.error = null
          state.translation.unshift(action.payload.data)
          Notify('success', action.payload.message)
        }
      })
      .addCase(PostTranslation.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(UpdateTranslationData.pending, (state) => {
        state.loading = true
      })
      .addCase(UpdateTranslationData.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          //  state.translation = state.translation.map((item) => (item.id === action.payload.data.id ? action.payload.data : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdateTranslationData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
  },
})

export const {} = TranslationSlice.actions

export const allTranslation = (state) => state.allTranslation

export default TranslationSlice.reducer
