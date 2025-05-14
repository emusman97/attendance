import type { User } from '../../../models';

export interface UserState {
  info: User | null;
  firstLogin: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  success: true | null;
  error: string | null;
}

export interface UserCredentials {
  username: string;
  pincode: string;
}
