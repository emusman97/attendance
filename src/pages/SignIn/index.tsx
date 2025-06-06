import { Alert, Typography } from '@mui/material';
import { useEffect, useState, type JSX } from 'react';
import { useForm, type FieldError, type SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router';
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
import { RoutePaths } from '../../routes';

export function SignInPage(): JSX.Element {
  const { loading, error, info, firstLogin } = useUserState();

  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
    setError,
  } = useForm<SignInFormInput>({});
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPasswordButtonShown, setShowPasswordButtonShown] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getHelperText = (forField: FieldError | undefined) => {
    if (forField === errors.username) {
      if (errors.username?.type === 'required') {
        return AppStrings.usernameNotEmpty;
      }
    } else {
      if (errors.pincode?.type === 'required') {
        return AppStrings.pinCodeNotEmpty;
      } else if (errors.pincode?.type === 'pattern') {
        return AppStrings.pinCodePatternError;
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

  useEffect(() => {
    if (info) {
      if (info.role === 'admin') {
        navigate(RoutePaths.adminRoot, { replace: true });
      } else if (firstLogin) {
        navigate(RoutePaths.changePassword, { replace: true });
      } else {
        navigate(RoutePaths.dashboard, { replace: true });
      }
      dispatch(userActions.clearSuccess());
    }
  }, [dispatch, firstLogin, info, navigate]);

  return (
    <AuthLayout>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={styles.headingText} variant="h5">
          {AppStrings.signIn}
        </Typography>

        {!!error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}

        <InputField
          disabled={loading}
          sx={{ mt: 2 }}
          label={AppStrings.username}
          placeholder={AppStrings.username}
          error={!!errors.username}
          helperText={getHelperText(errors.username)}
          {...register('username', { required: true })}
        />
        <PasswordField
          containerProps={{ sx: { mt: 2, mb: 2 } }}
          label={AppStrings.pinCode}
          helperText={getHelperText(errors.pincode)}
          inputProps={{
            disabled: loading,
            error: !!errors.pincode,
            placeholder: AppStrings.pinCode,
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
          text={AppStrings.signIn}
        />
      </form>
    </AuthLayout>
  );
}
