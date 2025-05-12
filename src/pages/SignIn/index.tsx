import { Typography } from '@mui/material';
import type { JSX } from 'react';
import {
  AuthLayout,
  InputField,
  PasswordField,
  PrimaryButton,
} from '../../components';
import { AppStrings } from '../../constants';
import styles from './styles.module.css';

export function SignInPage(): JSX.Element {
  return (
    <AuthLayout>
      <form className={styles.container}>
        <Typography className={styles.headingText} variant="h5">
          {AppStrings.SignIn}
        </Typography>

        <InputField
          sx={{ mt: 2 }}
          label={AppStrings.Username}
          placeholder={AppStrings.Username}
        />
        <PasswordField
          containerProps={{ sx: { mt: 2, mb: 2 } }}
          label={AppStrings.PinCode}
          inputProps={{ placeholder: AppStrings.PinCode }}
        />

        <PrimaryButton sx={{ mt: 2 }} text={AppStrings.SignIn} />
      </form>
    </AuthLayout>
  );
}
