import type { FabProps } from '@mui/material';
import type { ReactNode } from 'react';

export interface FABProps extends FabProps {
  LeftIcon?: ReactNode;
  RightIcon?: ReactNode;
  title: string;
}
