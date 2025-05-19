import type { JSX } from 'react';
import { Navigate, Route, Routes } from 'react-router';
import { AdminLayout } from '../components';
import {
  AdminDashboardPage,
  ChangePasswordPage,
  DashboardPage,
  SettingsPage,
  SignInPage,
  UserPage,
  UsersPage,
} from '../pages';
import { useUserRole, useUserState } from '../state';
import { ProtectedRoute } from './ProtectedRoute';
import { RoutePaths as RouteNames } from './routePaths';

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
          />
        }
      >
        <Route index element={<Navigate to={RouteNames.Dashboard} replace />} />
        <Route path={RouteNames.Dashboard} element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path={RouteNames.Users}>
            <Route index element={<UsersPage />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
          <Route path={RouteNames.Settings} element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
