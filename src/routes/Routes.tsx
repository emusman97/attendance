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
        path={RouteNames.changePassword}
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && userRole === 'user'}
            redirectPath={RouteNames.root}
          >
            <ChangePasswordPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={RouteNames.dashboard}
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && userRole === 'user'}
            redirectPath={RouteNames.root}
          >
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path={`${RouteNames.adminRoot}/*`}
        element={
          <ProtectedRoute
            isAllowed={isAuthenticated && userRole === 'admin'}
            redirectPath={RouteNames.root}
          />
        }
      >
        <Route index element={<Navigate to={RouteNames.dashboard} replace />} />
        <Route path={RouteNames.dashboard} element={<AdminLayout />}>
          <Route index element={<AdminDashboardPage />} />
          <Route path={RouteNames.users}>
            <Route index element={<UsersPage />} />
            <Route path=":userId" element={<UserPage />} />
          </Route>
          <Route path={RouteNames.settings} element={<SettingsPage />} />
        </Route>
      </Route>
    </Routes>
  );
}
