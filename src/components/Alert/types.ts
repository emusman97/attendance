import type { AlertProps as MUIAlertProps } from '@mui/material';

export interface AlertProps extends MUIAlertProps {
  title: string;
  description: string;
}
