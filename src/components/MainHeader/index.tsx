import { AppBar, Toolbar, Typography } from '@mui/material';
import type { JSX } from 'react';
import { AppStrings } from '../../constants';

export function MainHeader(): JSX.Element {
  return (
    <AppBar position="relative">
      <Toolbar>
        <Typography variant="h6">{AppStrings.AppName}</Typography>
      </Toolbar>
    </AppBar>
  );
}
