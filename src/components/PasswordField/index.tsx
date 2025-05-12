import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import type { JSX } from 'react';
import type { PasswordFieldProps } from './types';

export function PasswordField({
  containerProps,
  inputProps,
  label,
  showPassword,
  showIcon = false,
}: PasswordFieldProps): JSX.Element {
  return (
    <FormControl variant="standard" {...containerProps}>
      <InputLabel>{label}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        {...(showIcon
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {})}
        {...inputProps}
      />
    </FormControl>
  );
}
