import { AppStrings } from '../../constants';
import { RoutePaths } from '../../routes';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export const routeConfig = () => [
  {
    path: RoutePaths.AdminDashboard,
    breadcrumb: AppStrings.Dashboard,
    icon: HomeIcon,
    children: [
      {
        path: RoutePaths.Users,
        breadcrumb: AppStrings.Users,
        icon: GroupIcon,
        children: [
          {
            path: ':userId',
            breadcrumb: (name: string) => name,
            icon: PersonIcon,
          },
        ],
      },
      {
        path: RoutePaths.Settings,
        breadcrumb: AppStrings.Settings,
        icon: SettingsIcon,
      },
    ],
  },
];
