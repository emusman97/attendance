export const RoutePaths = {
  root: '/',
  signIn: '/',
  changePassword: 'change-password',
  dashboard: 'dashboard',
  adminRoot: 'admin',
  users: 'users',
  settings: 'settings',
  adminDashboard: '/admin/dashboard',
  adminUsers: '/admin/dashboard/users',
  adminSettings: '/admin/dashboard/settings',
};

export type RoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];
