import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import type { JSX } from 'react';
import type { PasswordFieldProps } from './types';
import { FormHelperText } from '@mui/material';

export function PasswordField({
  containerProps,
  inputProps,
  label,
  helperText,
  showPassword,
  showIcon = false,
  onShowPasswordIconPress,
}: PasswordFieldProps): JSX.Element {
  const showError = !!inputProps?.error;

  return (
    <FormControl variant="standard" {...containerProps}>
      <InputLabel error={showError}>{label}</InputLabel>
      <Input
        type={showPassword ? 'text' : 'password'}
        {...(showIcon
          ? {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onShowPasswordIconPress}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }
          : {})}
        {...inputProps}
      />
      {!!helperText && (
        <FormHelperText error={showError}>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
