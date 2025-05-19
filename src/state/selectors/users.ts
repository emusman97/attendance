import type { User, UserId, Users } from '../../models';
import type { RootState } from '../store';

export const selectAllUsers = (state: RootState): Users =>
  state.users.bySortingOrder.map((userId) => state.users.byId[userId]);

export const selectUserById =
  (userId: UserId) =>
  (state: RootState): User =>
    state.users.byId[userId];
