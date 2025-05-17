import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';

export type NavBreadcrumbsProps = StackProps & {
  title?: string;
  CrumbsLeftContent?: ReactNode;
};
