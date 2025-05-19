import TextField from '@mui/material/TextField';
import type { JSX } from 'react';
import type { InputFieldProps } from './types';

export type { InputFieldProps } from './types';

export function InputField({ ...restProps }: InputFieldProps): JSX.Element {
  return <TextField variant="standard" {...restProps} />;
}
