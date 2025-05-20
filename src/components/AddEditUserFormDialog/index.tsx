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
import { AppStrings, DefaultPinCode } from '../../constants';
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
    type === 'add' ? AppStrings.addUser : AppStrings.editUser;
  const actions = () =>
    type === 'add' ? (
      <>
        <Button onClick={onClose}>{AppStrings.nevermind}</Button>
        <Button type="submit">{AppStrings.addUser}</Button>
      </>
    ) : (
      <>
        <Button onClick={onClose} color="error">
          {AppStrings.discardChanges}
        </Button>
        <Button type="submit">{AppStrings.save}</Button>
      </>
    );
  const helperText = () => {
    if (errors.fname?.type === 'required') {
      return AppStrings.firstNameEmpty;
    } else if (errors.lname?.type === 'required') {
      return AppStrings.lastNameEmpty;
    } else if (errors.designation?.type === 'required') {
      return AppStrings.designationEmpty;
    } else if (errors.email?.type === 'required') {
      return AppStrings.emailEmpty;
    } else if (errors.email?.type === 'pattern') {
      return AppStrings.emailInvalid;
    }

    return '';
  };

  const onFormSubmit: SubmitHandler<UserFormFields> = (data) => {
    onClose?.();
    onSubmit?.({ ...data, pincode: DefaultPinCode } satisfies User);
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
              label={AppStrings.firstName}
              placeholder={AppStrings.firstName}
              error={!!errors.fname}
              helperText={helperText()}
              {...register('fname', { required: true })}
            />
            <InputField
              label={AppStrings.lastName}
              placeholder={AppStrings.lastName}
              error={!!errors.lname}
              helperText={helperText()}
              {...register('lname', { required: true })}
            />
          </Stack>
          <InputField
            label={AppStrings.designation}
            placeholder={AppStrings.designation}
            error={!!errors.designation}
            helperText={helperText()}
            {...register('designation', { required: true })}
          />
          <InputField
            label={AppStrings.email}
            placeholder={AppStrings.email}
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
