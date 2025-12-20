import { apiService } from '@/services/apiService';
import secureStorage from '@/services/secureStoreService';
import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, loading: false, status:"" , error: null},
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.status = "";
    },
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
          apiService.endpoints.login.matchFulfilled,
          (state, action) => {
            secureStorage.saveToken(action.payload.token);
            state.token = action.payload.token;
            state.user = action.payload.user;
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

export const { logout } = authSlice.actions;
export default authSlice.reducer;