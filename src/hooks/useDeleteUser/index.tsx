import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from '@mui/material';
import { useEffect, useRef } from 'react';
import { AppStrings } from '../../constants';
import type { User } from '../../models';
import { makeFullName } from '../../utils';
import { useBooleanState } from '../useBooleanState';
import type { UseDeleteUser, UseDeleteUserParams } from './types';

export function useDeleteUser({
  onConfirmDeleteUser,
}: UseDeleteUserParams): UseDeleteUser {
  const [deleteUserDialogOpened, openDeleteUserDialog, closeDeleteUserDialog] =
    useBooleanState();

  const callbackRefs = useRef({ onConfirmDeleteUser });
  const needToShowSnackbarRef = useRef(false);
  const userToDeleteRef = useRef<User>(null);

  const showDeleteUserDialog = (
    userToDelete: User,
    needToShowSnackbar: boolean = false
  ) => {
    userToDeleteRef.current = userToDelete;
    needToShowSnackbarRef.current = needToShowSnackbar;
    openDeleteUserDialog();
  };

  const handleConfirmDeleteUser = () => {
    closeDeleteUserDialog();
    callbackRefs.current?.onConfirmDeleteUser?.(userToDeleteRef.current ?? {});
  };

  useEffect(() => {
    callbackRefs.current = { onConfirmDeleteUser };
  }, [onConfirmDeleteUser]);

  const renderDialog = () => (
    <Dialog open={deleteUserDialogOpened} onClose={closeDeleteUserDialog}>
      <DialogTitle>{AppStrings.DeleteUserTitle}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete the user{' '}
          <Typography component="span" variant="body1" fontWeight="700">
            {makeFullName(
              userToDeleteRef.current?.fname ?? '',
              userToDeleteRef.current?.lname ?? ''
            )}
          </Typography>
          ? This action is irreversible.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeDeleteUserDialog}>{AppStrings.Nevermind}</Button>
        <Button color="error" onClick={handleConfirmDeleteUser} autoFocus>
          {AppStrings.DeleteUser}
        </Button>
      </DialogActions>
    </Dialog>
  );

  return { showDeleteUserDialog, renderDialog };
}
