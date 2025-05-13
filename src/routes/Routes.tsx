import type { JSX } from 'react';
import { Route, Routes } from 'react-router';
import { ChangePasswordPage, DashboardPage, SignInPage } from '../pages';
import { RoutePaths } from './routePaths';
import { ProtectedRoute } from './ProtectedRoute';
import { useUserState } from '../state';

export function MainRoutes(): JSX.Element {
  const { isAuthenticated } = useUserState();

  return (
    <Routes>
      <Route index element={<SignInPage />} />
      <Route
        path={RoutePaths.ChangePassword}
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated}
            redirectPath={RoutePaths.Root}
          >
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={RoutePaths.Dashboard}
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated}
            redirectPath={RoutePaths.Root}
          >
            <DashboardPage />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
