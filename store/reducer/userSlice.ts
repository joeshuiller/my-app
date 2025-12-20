import { apiService } from '@/services/apiService';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [],
  loading: false,
  status: 'idle', // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
};
const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    // standard synchronous reducers can go here
  },
  extraReducers: (builder) => {
    // Escuchar cuando el login de la API sea exitoso
    builder
      .addMatcher(
        apiService.endpoints.getUserProfile.matchPending,
        (state, action) => {
          state.loading = true;
        }
      )
      .addMatcher(
        apiService.endpoints.getUserProfile.matchFulfilled,
        (state, action) => {
          state.loading = false;
          state.status = action.payload.status;
          state.users = action.payload.user;
        }
      )
      .addMatcher(
        apiService.endpoints.getUserProfile.matchRejected,
        (state, action) => {
          state.loading = false;
          state.status = action.payload?.status;
          state.error = action.payload?.data?.message || "Error en la consulta";
        }
      );
  },
});
export default usersSlice.reducer;