import type { RootState } from '../store';

export const selectUserState = (state: RootState) => state.user;
