import { apiService } from '@/services/apiService';
import secureStorage from '@/services/secureStoreService';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { authState } from '../models/authState';

const initialState:  authState = {
    token: null,
    loading: false,
    status: "",
    error: undefined,
    user: null,
    isAuthenticated: false,
}
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setCredentials: (state, action: PayloadAction<{user: any }>) => {
      // Guardar token físicamente en el dispositivo
      state.token = action.payload.user.token;
      state.user = action.payload.user;
      state.isAuthenticated = true;
      secureStorage.saveToken(action.payload.user.token);
    },
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
            apiService.endpoints.login.matchPending,
            (state, action) => {
                state.loading = true;
            }
        )
        .addMatcher(
          apiService.endpoints.login.matchFulfilled,
          (state, action) => {
            state.loading = false;
            state.token = action.payload.token;
            state.user = action.payload.user;
          }
        )
        .addMatcher(
            apiService.endpoints.login.matchRejected,
            (state, action) => {
              state.loading = false;
              state.status = action.payload?.status;
              state.error = action.payload?.data?.message || "Error en la consulta";
            }
        );
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;