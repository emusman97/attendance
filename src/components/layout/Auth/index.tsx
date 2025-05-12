import type React from 'react';
import { MainHeader } from '../../MainHeader';
import { PageLayout } from '../Page';
import type { AuthLayoutProps } from './types';
import styles from './styles.module.css';

export function AuthLayout({ children }: AuthLayoutProps): React.ReactNode {
  return (
    <PageLayout>
      <MainHeader />
      <div className={styles.contentContainer}>{children}</div>
    </PageLayout>
  );
}

export * from './types';
