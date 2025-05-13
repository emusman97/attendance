import type { UserId, Users } from '../models';
import type { UserCredentials } from '../state/slices';

function createUserMockService() {
  const users: Users = [
    {
      id: 'ADM-001',
      fname: 'Super',
      lname: 'Admin',
      passwordChanged: true,
      pincode: '9999',
      role: 'admin',
    },
    {
      id: 'SE-000',
      fname: 'Test',
      lname: 'User',
      passwordChanged: false,
      pincode: '0000',
      role: 'user',
    },
  ];

  const findUser = (creds: UserCredentials) =>
    users.find(
      (user) =>
        user.fname?.toLocaleLowerCase() === creds.username &&
        creds.pincode === user.pincode
    );
  const changePincode = (id: UserId, newPincode: string) => {
    const user = users.find((user) => user.id === id);

    if (user) {
      user.pincode = newPincode;
      user.passwordChanged = true;
    }
  };

  return { findUser, changePincode };
}

export const UserMockService = createUserMockService();
