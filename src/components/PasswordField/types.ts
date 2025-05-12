import type { FormControlProps, InputProps } from '@mui/material';

export interface PasswordFieldProps {
  containerProps?: FormControlProps;
  inputProps?: InputProps;
  label?: string;
  showPassword?: boolean;
  showIcon?: boolean;
}
