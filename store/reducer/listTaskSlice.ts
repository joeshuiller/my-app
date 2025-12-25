import { apiService } from '@/services/apiService';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  lisTask: [],
  loading: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
const lisTaskSlice = createSlice({
  name: 'lisTask',
  initialState,
  reducers: {
    // standard synchronous reducers can go here
  },
  extraReducers: (builder) => {
    // Escuchar cuando el login de la API sea exitoso
    builder
      .addMatcher(
        apiService.endpoints.getTaskUsers.matchPending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        apiService.endpoints.getTaskUsers.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.status = action.payload.status;
          state.lisTask = action.payload.lisTask;
        }
      )
      .addMatcher(
        apiService.endpoints.getTaskUsers.matchRejected,
        (state, action) => {
          state.loading = false;
          state.status = action.payload?.status;
          state.error = action.payload?.data?.message || "Error en la consulta";
        }
      );
  },
});
export default lisTaskSlice.reducer;