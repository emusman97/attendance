import { createSlice } from '@reduxjs/toolkit';
import { changePinCode, loginUser } from './thunks';
import type { UserState } from './types';

const initialState: UserState = {
  firstLogin: true,
  info: null,
  isAuthenticated: false,
  loading: false,
  success: null,
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout(state) {
      state.firstLogin = initialState.firstLogin;
      state.info = initialState.info;
      state.isAuthenticated = initialState.isAuthenticated;
    },

    clearError(state) {
      state.error = null;
    },
    clearSuccess(state) {
      state.success = null;
    },
  },

  extraReducers(builder) {
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.success = null;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.info = action.payload;
      state.isAuthenticated = true;
      state.loading = false;
      state.success = true;
      state.firstLogin = !action.payload.passwordChanged;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.success = null;
      state.error = action.payload ?? '';
    });

    builder.addCase(changePinCode.pending, (state) => {
      console.log('Change pin coc pending', state);
      state.loading = true;
      state.error = null;
    });
    builder.addCase(changePinCode.fulfilled, (state) => {
      console.log('Change pin coc fulfilled', state);
      state.loading = false;
      state.success = true;
    });
    builder.addCase(changePinCode.rejected, (state, action) => {
      console.log('Change pin coc rejected', action);
      state.loading = false;
      state.success = null;
      state.error = action.payload ?? '';
    });
  },
});

export * from './types';

export const userActions = { ...userSlice.actions, loginUser, changePinCode };

export const userReducer = userSlice.reducer;
