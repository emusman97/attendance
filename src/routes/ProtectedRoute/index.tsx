import { Navigate, Outlet } from 'react-router';
import type { ProtectedRouteProps } from './types';
import type { JSX } from 'react';

export function ProtectedRoute({
  isAllowed,
  redirectPath,
  children,
}: ProtectedRouteProps): JSX.Element {
  if (!isAllowed) {
    return <Navigate to={redirectPath} replace />;
  }

  return <>{children ? children : <Outlet />}</>;
}
