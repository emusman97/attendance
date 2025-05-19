import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Snackbar, Typography } from '@mui/material';
import { useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { AppStrings, DeleteUserSnackbarHideTimeout } from '../../constants';
import type { User } from '../../models';
import { makeFullName } from '../../utils';
import { useBooleanState } from '../useBooleanState';
import type { Callbacks, UseDeleteUserSnackbar } from './types';

export function useDeleteUserSnackbar(): UseDeleteUserSnackbar {
  const [
    deleteUserSnackbarShown,
    openDeleteUserSnackbar,
    closeDeleteUserSnackbar,
  ] = useBooleanState();

  const deletedUserRef = useRef<User>(null);
  const callbacksRef = useRef<Callbacks>({});

  const showDeleteUserSnackbar = (
    deletedUser: User,
    onCloseClick: Callbacks['onCloseClick']
  ) => {
    deletedUserRef.current = deletedUser;
    callbacksRef.current.onCloseClick = onCloseClick;
    openDeleteUserSnackbar();
  };

  const handleClose = () => {
    closeDeleteUserSnackbar();
    callbacksRef.current?.onCloseClick?.();
  };

  const renderSnackbar = () => (
    <Snackbar
      open={deleteUserSnackbarShown}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={DeleteUserSnackbarHideTimeout}
      onClose={closeDeleteUserSnackbar}
      message={
        <Typography>
          {AppStrings.DeletedUser}{' '}
          <Typography component="span" fontWeight="bold">
            {makeFullName(
              deletedUserRef.current?.fname ?? '',
              deletedUserRef.current?.lname ?? ''
            )}
          </Typography>
        </Typography>
      }
      action={
        <Fragment>
          <Button onClick={handleClose}>{AppStrings.Undo}</Button>
          <IconButton color="inherit" onClick={handleClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
  );

  return { showDeleteUserSnackbar, renderSnackbar };
}
