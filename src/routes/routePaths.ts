export const RoutePaths = {
  Root: '/',
  SignIn: '/',
  ChangePassword: 'change-password',
  Dashboard: 'dashboard',
  AdminRoot: 'admin',
  Users: 'users',
  Settings: 'settings',
};

export type RoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];
