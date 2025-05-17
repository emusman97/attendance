import CloseIcon from '@mui/icons-material/Close';
import { Button, IconButton, Snackbar, Typography } from '@mui/material';
import { useRef } from 'react';
import { Fragment } from 'react/jsx-runtime';
import { AppStrings } from '../../constants';
import type { User } from '../../models';
import { makeFullName } from '../../utils';
import { useBooleanState } from '../useBooleanState';
import type { UseDeleteUserSnackbar } from './types';

export function useDeleteUserSnackbar(): UseDeleteUserSnackbar {
  const [
    deleteUserSnackbarShown,
    openDeleteUserSnackbar,
    closeDeleteUserSnackbar,
  ] = useBooleanState();

  const deletedUserRef = useRef<User>(null);

  const showDeleteUserSnackbar = (deletedUser: User) => {
    deletedUserRef.current = deletedUser;
    openDeleteUserSnackbar();
  };

  const renderSnackbar = () => (
    <Snackbar
      open={deleteUserSnackbarShown}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      autoHideDuration={6000}
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
          <Button onClick={closeDeleteUserSnackbar}>{AppStrings.Undo}</Button>
          <IconButton color="inherit" onClick={closeDeleteUserSnackbar}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Fragment>
      }
    />
  );

  return { showDeleteUserSnackbar, renderSnackbar };
}
