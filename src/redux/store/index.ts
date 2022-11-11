import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../components/routes/auth/LogIn/core/auth-reducer';
import eventReducer from '../../components/routes/app/MainPage/core/events/app-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
