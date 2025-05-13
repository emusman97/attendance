export const RoutePaths = {
  Root: '/',
  SignIn: '/',
  ChangePassword: '/change-password',
  Dashboard: '/dashboard',
};

export type RoutePath = (typeof RoutePaths)[keyof typeof RoutePaths];
