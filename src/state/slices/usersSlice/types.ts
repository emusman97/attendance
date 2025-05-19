import type { User, UserId, UserIds } from '../../../models';

export interface UsersState {
  byId: Record<UserId, User>;
  bySortingOrder: UserIds;
}

export interface EditUserThunkParams {
  userId: UserId;
  updatedUserInfo: User;
}
