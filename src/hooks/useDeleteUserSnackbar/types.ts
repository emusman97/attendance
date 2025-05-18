import type { ReactNode } from 'react';
import type { User } from '../../models';

export interface Callbacks {
  onCloseClick?: () => void;
}
export interface UseDeleteUserSnackbar {
  showDeleteUserSnackbar: (
    deletedUser: User,
    onCloseClick?: Callbacks['onCloseClick']
  ) => void;
  renderSnackbar: () => ReactNode;
}
