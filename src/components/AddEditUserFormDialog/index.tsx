import type { JSX } from '@emotion/react/jsx-runtime';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
} from '@mui/material';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { AppStrings } from '../../constants';
import type { User } from '../../models';
import { InputField } from '../InputField';
import type { AddEditUserFormDialogProps, UserFormFields } from './types';
import { EmailRegex } from '../../utils';

export * from './types';

export function AddEditUserFormDialog({
  type,
  user,
  open,
  onClose,
  onSubmit,
}: AddEditUserFormDialogProps): JSX.Element {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<UserFormFields>({ defaultValues: { ...user } });

  const title = () =>
    type === 'add' ? AppStrings.AddUser : AppStrings.EditUser;
  const actions = () =>
    type === 'add' ? (
      <>
        <Button onClick={onClose}>{AppStrings.Nevermind}</Button>
        <Button type="submit">{AppStrings.AddUser}</Button>
      </>
    ) : (
      <>
        <Button onClick={onClose} color="error">
          {AppStrings.DiscardChanges}
        </Button>
        <Button type="submit">{AppStrings.Save}</Button>
      </>
    );
  const helperText = () => {
    if (errors.fname?.type === 'required') {
      return AppStrings.FirstNameEmpty;
    } else if (errors.lname?.type === 'required') {
      return AppStrings.LastNameEmpty;
    } else if (errors.designation?.type === 'required') {
      return AppStrings.DesignationEmpty;
    } else if (errors.email?.type === 'required') {
      return AppStrings.EmailEmpty;
    } else if (errors.email?.type === 'pattern') {
      return AppStrings.EmailInvalid;
    }

    return '';
  };

  const onFormSubmit: SubmitHandler<UserFormFields> = (data) => {
    onClose?.();
    onSubmit?.(data satisfies User);
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { component: 'form', onSubmit: handleSubmit(onFormSubmit) },
      }}
    >
      <DialogTitle>{title()}</DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <InputField
              label={AppStrings.FirstName}
              placeholder={AppStrings.FirstName}
              error={!!errors.fname}
              helperText={helperText()}
              {...register('fname', { required: true })}
            />
            <InputField
              label={AppStrings.LastName}
              placeholder={AppStrings.LastName}
              error={!!errors.lname}
              helperText={helperText()}
              {...register('lname', { required: true })}
            />
          </Stack>
          <InputField
            label={AppStrings.Designation}
            placeholder={AppStrings.Designation}
            error={!!errors.designation}
            helperText={helperText()}
            {...register('designation', { required: true })}
          />
          <InputField
            label={AppStrings.Email}
            placeholder={AppStrings.Email}
            error={!!errors.lname}
            helperText={helperText()}
            {...register('email', { required: true, pattern: EmailRegex })}
          />
        </Stack>
      </DialogContent>
      <DialogActions>{actions()}</DialogActions>
    </Dialog>
  );
}
