import Fab from '@mui/material/Fab';
import type { JSX } from 'react';
import type { FABProps } from './types';

export function FAB({
  title,
  LeftIcon,
  RightIcon,
  ...restProps
}: FABProps): JSX.Element {
  return (
    <Fab variant="extended" color="primary" {...restProps}>
      {LeftIcon}
      {title}
      {RightIcon}
    </Fab>
  );
}
