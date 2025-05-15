import type { JSX } from 'react';
import { Route, Routes } from 'react-router';
import {
  AdminDashboardPage,
  ChangePasswordPage,
  DashboardPage,
  SignInPage,
} from '../pages';
import { RoutePaths as RouteNames } from './routePaths';
import { ProtectedRoute } from './ProtectedRoute';
import { useUserRole, useUserState } from '../state';
import { AdminLayout } from '../components';

export function MainRoutes(): JSX.Element {
  const { isAuthenticated } = useUserState();
  const userRole = useUserRole();

  return (
    <Routes>
      <Route index element={<SignInPage />} />
      <Route
        path={RouteNames.ChangePassword}
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && userRole === 'user'}
            redirectPath={RouteNames.Root}
          >
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteNames.Dashboard}
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && userRole === 'user'}
            redirectPath={RouteNames.Root}
          >
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${RouteNames.AdminRoot}/*`}
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && userRole === 'admin'}
            redirectPath={RouteNames.Root}
          >
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminDashboardPage />} />
        <Route path={RouteNames.Dashboard} element={<AdminDashboardPage />} />
        <Route path={RouteNames.Users} />
        <Route path={RouteNames.Settings} />
      </Route>
    </Routes>
  );
}
