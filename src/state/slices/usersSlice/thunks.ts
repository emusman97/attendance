import { createAsyncThunk } from '@reduxjs/toolkit';
import type { User, UserId, Users } from '../../../models';
import { UsersActionTypes } from './actionTypes';
import { UserMockService } from '../../../mockService';
import type { EditUserThunkParams } from './types';

export const fetchAllUsers = createAsyncThunk<Users>(
  UsersActionTypes.fetchAllUsers,
  () => UserMockService.getUsers()
);

export const addUser = createAsyncThunk(
  UsersActionTypes.addUser,
  (newUser: User) => {
    UserMockService.addUser({ ...newUser });

    return newUser;
  }
);
export const editUser = createAsyncThunk(
  UsersActionTypes.editUser,
  ({ userId, updatedUserInfo }: EditUserThunkParams) => {
    UserMockService.editUser(userId, updatedUserInfo);
    return updatedUserInfo;
  }
);
export const deleteUser = createAsyncThunk(
  UsersActionTypes.deleteUser,
  (userIdToDelete: UserId) => {
    UserMockService.deleteUser(userIdToDelete);
    return userIdToDelete;
  }
);
