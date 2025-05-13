import type { Users } from '../models';
import type { UserCredentials } from '../state/slices';

function createUserMockService() {
  const users: Users = [];

  const findUser = (creds: UserCredentials) =>
    users.find(
      (user) =>
        user.fname?.toLocaleLowerCase() === creds.username &&
        creds.pincode === user.pincode
    );

  return { findUser };
}

export const UserMockService = createUserMockService();
