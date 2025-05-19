export const RoutePaths = {
  Root: '/',
  SignIn: '/',
  ChangePassword: 'change-password',
  Dashboard: 'dashboard',
  AdminRoot: 'admin',
  Users: 'users',
  Settings: 'settings',
  AdminDashboard: '/admin/dashboard',
  AdminUsers: '/admin/dashboard/users',
  AdminSettings: '/admin/dashboard/settings',
};

export type RoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];
