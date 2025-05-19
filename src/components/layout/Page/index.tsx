import type React from 'react';
import type { PageLayoutProps } from './types';
import styles from './styles.module.css';
import Box from '@mui/material/Box';

export function PageLayout({ children }: PageLayoutProps): React.ReactNode {
  return <Box className={styles.container}>{children}</Box>;
}

export * from './types';
