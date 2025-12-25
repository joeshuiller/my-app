import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '../services/apiService';
import authSlice from './reducer/authSlice';
import listTaskSlice from './reducer/listTaskSlice';
import registerTaskSlice from './reducer/registerTaskSlice';
import userReducer from './reducer/userSlice';
export const store = configureStore({
  reducer: {
     auth: authSlice,
     users: userReducer,
     lisTask: listTaskSlice,
     registerTask: registerTaskSlice,
    [apiService.reducerPath]: apiService.reducer,
  },
  middleware: (getDefault) => getDefault().concat(apiService.middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;