import MUIAlert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import type { JSX } from 'react';
import { Theme } from '../../styles';
import type { AlertProps } from './types';

export function Alert({
  title,
  description,
  ...restProps
}: AlertProps): JSX.Element {
  return (
    <MUIAlert {...restProps}>
      <Box>
        <Typography sx={{ fontWeight: '500', color: Theme.colors.infoAlert }}>
          {title}
        </Typography>
        <Typography sx={{ color: Theme.colors.infoAlert }}>
          {description}
        </Typography>
      </Box>
    </MUIAlert>
  );
}
