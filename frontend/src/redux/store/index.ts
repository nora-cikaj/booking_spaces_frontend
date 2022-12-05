import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../components/routes/auth/LogIn/core/auth-reducer';
import resourcesReducer from '../../components/routes/app/MainPage/core/resources/resources-reducer';
import usersReducer from '../../components/routes/app/MainPage/core/users/users-reducer';
import eventReducer from '../../components/routes/app/MainPage/core/events/event-reducer';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    resources: resourcesReducer,
    users: usersReducer,
    events: eventReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
