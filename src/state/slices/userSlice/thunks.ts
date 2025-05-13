import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppStrings } from '../../../constants';
import { UserMockService } from '../../../mockService';
import { delay } from '../../../utils';
import { UserActionTypes } from './actionTypes';
import type { UserCredentials } from './types';

export const loginUser = createAsyncThunk(
  UserActionTypes.login,
  async (credentials: UserCredentials, { rejectWithValue }) => {
    await delay(2000);

    const user = UserMockService.findUser(credentials);
    if (user) {
      return user;
    } else {
      return rejectWithValue(AppStrings.InvalidCreds);
    }
  }
);
