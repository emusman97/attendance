import { Alert, Typography } from '@mui/material';
import { useState, type JSX } from 'react';
import { useForm, type FieldError, type SubmitHandler } from 'react-hook-form';
import {
  AuthLayout,
  InputField,
  PasswordField,
  PrimaryButton,
} from '../../components';
import { AppStrings } from '../../constants';
import { useAppDispatch, userActions, useUserState } from '../../state';
import styles from './styles.module.css';
import type { SignInFormInput } from './types';

export function SignInPage(): JSX.Element {
  const { loading, error } = useUserState();

  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
    setError,
  } = useForm<SignInFormInput>();
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPasswordButtonShown, setShowPasswordButtonShown] = useState(false);
  const dispatch = useAppDispatch();

  const getHelperText = (forField: FieldError | undefined) => {
    if (forField === errors.username) {
      if (errors.username?.type === 'required') {
        return AppStrings.UsernameNotEmpty;
      }
    } else {
      if (errors.pincode?.type === 'required') {
        return AppStrings.PinCodeNotEmpty;
      } else if (errors.pincode?.type === 'pattern') {
        return AppStrings.PinCodePatternError;
      }
    }

    return '';
  };
  const togglePasswordShown = () => setPasswordShown((shown) => !shown);
  const canShowIcon = () => {
    const pinCodeValue = watch('pincode')?.trim() !== '';

    return pinCodeValue || showPasswordButtonShown;
  };

  const onSubmit: SubmitHandler<SignInFormInput> = (data) => {
    const usernameValue = data.username.trim();
    const pinCodeValue = data.pincode;

    if (usernameValue === '') {
      setError('username', { type: 'required' });
      return;
    }

    dispatch(userActions.clearError());
    dispatch(
      userActions.loginUser({ username: usernameValue, pincode: pinCodeValue })
    );
  };
  const onPasswordFieldFocuessed = () => {
    setShowPasswordButtonShown(true);
  };
  const onPasswordFieldBlurred = () => {
    setShowPasswordButtonShown(false);
  };

  return (
    <AuthLayout>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={styles.headingText} variant="h5">
          {AppStrings.SignIn}
        </Typography>

        {!!error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}

        <InputField
          disabled={loading}
          sx={{ mt: 2 }}
          label={AppStrings.Username}
          placeholder={AppStrings.Username}
          error={!!errors.username}
          helperText={getHelperText(errors.username)}
          {...register('username', { required: true })}
        />
        <PasswordField
          containerProps={{ sx: { mt: 2, mb: 2 } }}
          label={AppStrings.PinCode}
          helperText={getHelperText(errors.pincode)}
          inputProps={{
            disabled: loading,
            error: !!errors.pincode,
            placeholder: AppStrings.PinCode,
            slotProps: { input: { maxLength: 4 } },
            ...register('pincode', {
              required: true,
              maxLength: 4,
              pattern: /[0-9]{4}/,
            }),
            onBlur: onPasswordFieldBlurred,
            onFocus: onPasswordFieldFocuessed,
          }}
          onShowPasswordIconPress={togglePasswordShown}
          showIcon={canShowIcon()}
          showPassword={passwordShown}
        />

        <PrimaryButton
          loading={loading}
          disabled={loading}
          type="submit"
          sx={{ mt: 2 }}
          text={AppStrings.SignIn}
        />
      </form>
    </AuthLayout>
  );
}
