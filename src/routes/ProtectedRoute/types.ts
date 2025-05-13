import type { PropsWithChildren } from 'react';
import type { UserRole, UserRoles } from '../../models';

export interface ProtectedRouteProps extends PropsWithChildren {
  isAllowed: boolean;
  redirectPath: string;
  requiredRoles?: UserRoles;
  userRole?: UserRole;
}
