import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { loginUser } from './thunks';
import type { UserState } from './types';

const initialState: UserState = {
  firstLogin: true,
  isAuthenticated: false,
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setFirstLogin(state, action: PayloadAction<boolean>) {
      state.firstLogin = action.payload;
    },

    clearError(state) {
      state.error = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.info = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.firstLogin = !action.payload.passwordChanged;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export * from './types';

export const userActions = { ...userSlice.actions, loginUser };

export const userReducer = userSlice.reducer;
