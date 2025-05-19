import type { RootState } from '../store';

export const selectUserState = (state: RootState) => state.user;
export const selectUserRole = (state: RootState) => state.user.info?.role;
export const selectUserInfo = (state: RootState) => state.user.info ?? {};
