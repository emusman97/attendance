import type { PropsWithChildren } from 'react';

export interface ProtectedRouteProps extends PropsWithChildren {
  isAllowed: boolean;
  redirectPath: string;
}
