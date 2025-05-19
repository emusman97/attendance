import type { JSX } from 'react';
import type { PrimaryButtonProps } from './types';
import Button from '@mui/material/Button';

export type { PrimaryButtonProps } from './types';

export function PrimaryButton({
  text,
  ...restProps
}: PrimaryButtonProps): JSX.Element {
  return (
    <Button variant="contained" {...restProps}>
      {text}
    </Button>
  );
}
