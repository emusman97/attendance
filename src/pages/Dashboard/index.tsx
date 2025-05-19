import { type JSX } from 'react';
import { useUserRole } from '../../state';
import { UserDashboard } from './components';

export function DashboardPage(): JSX.Element {
  const role = useUserRole();

  return role === 'user' ? <UserDashboard /> : <>Admin Dashboard</>;
}
