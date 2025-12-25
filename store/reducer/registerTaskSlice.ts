import { apiService } from '@/services/apiService';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  registerTask: [],
  loading: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
const registerTaskSlice = createSlice({
  name: 'registerTask',
  initialState,
  reducers: {
    // standard synchronous reducers can go here
  },
  extraReducers: (builder) => {
    // Escuchar cuando el login de la API sea exitoso
    builder
      .addMatcher(
        apiService.endpoints.registerTaskUsers.matchPending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        apiService.endpoints.registerTaskUsers.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.status = action.payload.status;
          state.registerTask = action.payload.registerTask;
        }
      )
      .addMatcher(
        apiService.endpoints.registerTaskUsers.matchRejected,
        (state, action) => {
          state.loading = false;
          state.status = action.payload?.status;
          state.error = action.payload?.data?.message || "Error en la consulta";
        }
      );
  },
});
export default registerTaskSlice.reducer;