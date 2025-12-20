import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '../services/apiService';
import authSlice from './reducer/authSlice';
import userReducer from './reducer/userSlice';
export const store = configureStore({
  reducer: {
     auth: authSlice,
     users: userReducer,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiService.middleware),
});