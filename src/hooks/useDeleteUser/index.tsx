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
import { AppStrings, DELETE_USER_SNACKBAR_HIDE_TIMEOUT } from '../../constants';
import type { User } from '../../models';
import { makeFullName } from '../../utils';
import { useBooleanState } from '../useBooleanState';
import type { UseDeleteUser, UseDeleteUserParams } from './types';
import { useAppDispatch, usersActions } from '../../state';
import { useDeleteUserSnackbar } from '../useDeleteUserSnackbar';

export function useDeleteUser({
  onConfirmDeleteUser,
}: UseDeleteUserParams): UseDeleteUser {
  const dispatch = useAppDispatch();

  const [deleteUserDialogOpened, openDeleteUserDialog, closeDeleteUserDialog] =
    useBooleanState();
  const { showDeleteUserSnackbar, renderSnackbar } = useDeleteUserSnackbar();

  const timerRef = useRef<NodeJS.Timeout>(null);
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

  const goBack = () => window.history.back();

  const handleConfirmDeleteUser = () => {
    const userToDelete = userToDeleteRef.current ?? {};

    closeDeleteUserDialog();
    dispatch(usersActions.deleteUser(userToDelete.id ?? ''));
    showDeleteUserSnackbar(userToDelete, goBack);
    timerRef.current = setTimeout(goBack, DELETE_USER_SNACKBAR_HIDE_TIMEOUT);
    callbackRefs.current?.onConfirmDeleteUser?.(userToDeleteRef.current ?? {});
  };

  useEffect(() => {
    callbackRefs.current = { onConfirmDeleteUser };
  }, [onConfirmDeleteUser]);

  const renderDialog = () => (
    <>
      <Dialog open={deleteUserDialogOpened} onClose={closeDeleteUserDialog}>
        <DialogTitle>{AppStrings.deleteUserTitle}</DialogTitle>
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
          <Button onClick={closeDeleteUserDialog}>
            {AppStrings.nevermind}
          </Button>
          <Button color="error" onClick={handleConfirmDeleteUser} autoFocus>
            {AppStrings.deleteUser}
          </Button>
        </DialogActions>
      </Dialog>
      {renderSnackbar()}
    </>
  );

  useEffect(() => () => clearTimeout(timerRef.current ?? -1), []);

  return { showDeleteUserDialog, renderDialog };
}
