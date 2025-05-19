import type { ReactNode } from 'react';
import type { User } from '../../models';
import type { AddEditUserFormType } from '../../components';

export interface UseAddEditUserParams {
  onSubmit: (type: AddEditUserFormType, user: User) => void;
}

export interface UseAddEditUser {
  showAddEditUserDialog: (type: AddEditUserFormType, userToEdit?: User) => void;
  renderDialog: () => ReactNode;
}
