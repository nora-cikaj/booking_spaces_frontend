import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../components/routes/auth/LogIn/core/auth-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
