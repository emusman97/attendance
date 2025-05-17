import type { ReactNode } from 'react';
import type { User } from '../../models';

export interface UseDeleteUserParams {
  onConfirmDeleteUser: (deletedUser: User) => void;
}

export interface UseDeleteUser {
  showDeleteUserDialog: (userToDelete: User) => void;
  renderDialog: () => ReactNode;
}
