import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import Notify from '../../../components/Notify'
import {
  DeleteTranslation,
  GetAllTranslation,
  GetSingleTranslation,
  GetTranslationData,
  PostAssignTranslation,
  PostTanslation,
  UpdateTranlsation,
} from '../../../api/Translation/TranslationHelperApi'

export const TranslationBase = createAsyncThunk('Translation/TranslationBase', async () => {
  try {
    const response = await GetTranslationData()
    return response
  } catch (error) {
    throw Error('Failed to fetch Branch')
  }
})

export const Translation = createAsyncThunk('Translation/AllTranslation', async () => {
  try {
    const response = await GetAllTranslation()
    return response
  } catch (error) {
    throw Error('Failed to fetch Branch')
  }
})

export const GetSingleTranslationData = createAsyncThunk('Translation/SingleTranslation', async (data) => {
  try {
    const response = await GetSingleTranslation(data)
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
    return rejectWithValue('Failed to post Translation')
  }
})

export const AssignTranslationToBranch = createAsyncThunk('translation/AssignTranslation', async (data, { rejectWithValue }) => {
  try {
    const response = await PostAssignTranslation(data)
    return response
  } catch (error) {
    return rejectWithValue('Failed to Assign Branch')
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
export const TranslationDelete = createAsyncThunk('UserManagement/Delete', async (data, { rejectWithValue }) => {
  try {
    const response = await DeleteTranslation(data)
    return response
  } catch (error) {
    return rejectWithValue('Failed to delete User')
  }
})

const initialState = {
  allTranslationBase: [],
  Singletranslation: [],
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
      .addCase(TranslationBase.pending, (state) => {
        state.loading = true
      })
      .addCase(TranslationBase.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.allTranslationBase = action.payload.data
      })
      .addCase(TranslationBase.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(Translation.pending, (state) => {
        state.loading = true
      })
      .addCase(Translation.fulfilled, (state, action) => {
        state.loading = false
        state.error = null
        state.translation = action.payload.data
      })
      .addCase(Translation.rejected, (state, action) => {
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
        state.Singletranslation = action.payload
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
      .addCase(AssignTranslationToBranch.pending, (state) => {
        state.loading = true
      })
      .addCase(AssignTranslationToBranch.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '200') {
          state.error = null
          Notify('success', action.payload.message)
        }
      })
      .addCase(AssignTranslationToBranch.rejected, (state, action) => {
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
          // state.translation = state.translation.map((item) => (item.lang === action.payload.lang ? action.payload.lang : item))
          Notify('success', action.payload.message)
        }
      })
      .addCase(UpdateTranslationData.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
      })
    builder
      .addCase(TranslationDelete.pending, (state) => {
        state.loading = true
      })
      .addCase(TranslationDelete.fulfilled, (state, action) => {
        state.loading = false
        if (action.payload?.statusCode === '204') {
          state.error = null
          const deletedId = action.meta.arg
          state.translation = state.translation.filter((item) => item.lang !== deletedId)
          // Notify('success', action.payload.message)
        }
      })
      .addCase(TranslationDelete.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload || action.error.message
        // Notify('error', action.payload?.message || 'Something went wrong')
      })
  },
})

export const {} = TranslationSlice.actions

export const allTranslation = (state) => state.allTranslation

export default TranslationSlice.reducer
