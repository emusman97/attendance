import { configureStore } from '@reduxjs/toolkit';
import { userReducer, usersReducer } from './slices';

export const store = configureStore({
  reducer: {
    user: userReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
