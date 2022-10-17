import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../components/routes/auth/LogIn/core/auth-reducer';
import userReducer from '../../components/routes/app/Users/core/user-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
