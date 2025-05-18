import { createSlice } from '@reduxjs/toolkit';
import type { UsersState } from './types';
import { addUser, deleteUser, editUser, fetchAllUsers } from './thunks';

const initialState: UsersState = {
  byId: {},
  bySortingOrder: [],
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},

  extraReducers(builder) {
    builder.addCase(fetchAllUsers.fulfilled, (state, action) => {
      state.byId = {};
      state.bySortingOrder = [];

      action.payload.forEach((user) => {
        const userId = user.id ?? '';

        state.byId[userId] = user;
        state.bySortingOrder.push(userId);
      });
    });
    builder.addCase(addUser.fulfilled, (state, action) => {
      const user = action.payload;
      const userId = user?.id ?? '';

      state.byId[userId] = user;
      state.bySortingOrder.push(userId);
    });
    builder.addCase(editUser.fulfilled, (state, action) => {
      const user = action.payload;
      const userId = user?.id ?? '';

      state.byId[userId] = user;
    });
    builder.addCase(deleteUser.fulfilled, (state, action) => {
      const deletedUserId = action.payload;

      delete state.byId[deletedUserId];
      state.bySortingOrder = state.bySortingOrder.filter(
        (userId) => userId !== deletedUserId
      );
    });
  },
});

export * from './types';

export const usersActions = {
  ...usersSlice.actions,
  fetchAllUsers,
  addUser,
  editUser,
  deleteUser,
};

export const usersReducer = usersSlice.reducer;
