import { Alert, Typography } from '@mui/material';
import { useEffect, useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { AuthLayout, PasswordField, PrimaryButton } from '../../components';
import { AppStrings } from '../../constants';
import { useAppDispatch, userActions, useUserState } from '../../state';
import styles from './styles.module.css';
import type { ChangePasswordInputs } from './types';
import { RoutePaths } from '../../routes';

export function ChangePasswordPage(): JSX.Element {
  const { loading, success, error } = useUserState();

  const {
    formState: { errors },
    watch,
    register,
    handleSubmit,
  } = useForm<ChangePasswordInputs>();
  const [passwordShown, setPasswordShown] = useState(false);
  const [showPasswordButtonShown, setShowPasswordButtonShown] = useState(false);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const getHelperText = () => {
    if (errors.pincode?.type === 'required') {
      return AppStrings.pinCodeNotEmpty;
    } else if (errors.pincode?.type === 'pattern') {
      return AppStrings.pinCodePatternError;
    }

    return '';
  };
  const togglePasswordShown = () => setPasswordShown((shown) => !shown);
  const canShowIcon = () => {
    const pinCodeValue = watch('pincode')?.trim() !== '';

    return pinCodeValue || showPasswordButtonShown;
  };

  const onSubmit: SubmitHandler<ChangePasswordInputs> = (data) => {
    const pinCodeValue = data.pincode;

    dispatch(userActions.clearError());
    dispatch(userActions.changePinCode(pinCodeValue));
  };
  const onPasswordFieldFocuessed = () => {
    setShowPasswordButtonShown(true);
  };
  const onPasswordFieldBlurred = () => {
    setShowPasswordButtonShown(false);
  };

  useEffect(() => {
    if (success) {
      navigate(`/${RoutePaths.Dashboard}`, { replace: true });
      dispatch(userActions.clearSuccess());
    }
  }, [dispatch, navigate, success]);

  return (
    <AuthLayout>
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <Typography className={styles.headingText} variant="h5">
          {AppStrings.changePassword}
        </Typography>

        {!!error && (
          <Alert severity="error" sx={{ mt: 4 }}>
            {error}
          </Alert>
        )}

        <PasswordField
          containerProps={{ sx: { mt: 2, mb: 2 } }}
          label={AppStrings.pinCode}
          helperText={getHelperText()}
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
          text={AppStrings.confirm}
        />
      </form>
    </AuthLayout>
  );
}
