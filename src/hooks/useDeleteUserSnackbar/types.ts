import type { ReactNode } from 'react';
import type { User } from '../../models';

export interface UseDeleteUserSnackbar {
  showDeleteUserSnackbar: (deletedUser: User) => void;
  renderSnackbar: () => ReactNode;
}
