import type { FormControlProps, InputProps } from '@mui/material';

export interface PasswordFieldProps {
  containerProps?: FormControlProps;
  inputProps?: InputProps;
  label?: string;
  helperText?: string;
  showPassword?: boolean;
  showIcon?: boolean;
  onShowPasswordIconPress?: () => void;
}
