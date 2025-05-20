import { createAsyncThunk } from '@reduxjs/toolkit';
import { AppStrings } from '../../../constants';
import { UserMockService } from '../../../mockService';
import { delay, isError } from '../../../utils';
import { UserActionTypes } from './actionTypes';
import type { UserCredentials } from './types';
import type { RootState } from '../../store';
import type { User } from '../../../models';

export const loginUser = createAsyncThunk<
  User,
  UserCredentials,
  { rejectValue: string }
>(
  UserActionTypes.login,
  async (credentials: UserCredentials, { rejectWithValue }) => {
    await delay(2000);

    const user = UserMockService.findUser(credentials);
    if (user) {
      return user;
    } else {
      return rejectWithValue(AppStrings.invalidCreds);
    }
  }
);

export const changePinCode = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: string }
>(
  UserActionTypes.changePinCode,
  async (newPincode, { getState, rejectWithValue }) => {
    await delay(2000);

    try {
      const userId = getState().user?.info?.id;

      if (userId) {
        UserMockService.changePincode(userId, newPincode);
      } else {
        rejectWithValue(AppStrings.noUserLoggedIn);
      }
    } catch (error) {
      if (isError(error)) {
        rejectWithValue(error.message ?? AppStrings.somethingWentWrong);
      } else {
        rejectWithValue(AppStrings.somethingWentWrong);
      }
    }
  }
);
