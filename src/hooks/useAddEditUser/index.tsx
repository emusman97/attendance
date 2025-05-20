import { useEffect, useRef } from 'react';
import {
  AddEditUserFormDialog,
  type AddEditUserFormType,
} from '../../components';
import type { User } from '../../models';
import { useBooleanState } from '../useBooleanState';
import type { UseAddEditUser, UseAddEditUserParams } from './types';
import { useAppDispatch, usersActions } from '../../state';

export function useAddEditUser({
  onSubmit,
}: UseAddEditUserParams): UseAddEditUser {
  const dispatch = useAppDispatch();

  const [formDialogOpened, openFormDialog, closeFormDialog] = useBooleanState();

  const callbackRefs = useRef({ onSubmit });
  const userToEditRef = useRef<User>(undefined);
  const formType = useRef<AddEditUserFormType>(null);

  const showAddEditUserDialog = (
    type: AddEditUserFormType,
    userToDelete?: User
  ) => {
    userToEditRef.current = userToDelete;
    formType.current = type;
    openFormDialog();
  };

  const handleOnSubmit = (user: User) => {
    if (formType.current === 'edit') {
      dispatch(
        usersActions.editUser({
          userId: user?.id ?? '',
          updatedUserInfo: user,
        })
      );
    }
    callbackRefs.current?.onSubmit?.(formType.current ?? 'add', user);
  };

  useEffect(() => {
    callbackRefs.current = { onSubmit };
  }, [onSubmit]);

  const renderDialog = () => (
    <>
      {formDialogOpened && (
        <AddEditUserFormDialog
          open={formDialogOpened}
          user={userToEditRef.current}
          type={formType.current ?? 'add'}
          onClose={closeFormDialog}
          onSubmit={handleOnSubmit}
        />
      )}
    </>
  );

  return { showAddEditUserDialog, renderDialog };
}
