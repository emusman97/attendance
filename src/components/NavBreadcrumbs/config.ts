import { AppStrings } from '../../constants';
import { RoutePaths } from '../../routes';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import SettingsIcon from '@mui/icons-material/Settings';

export const routeConfig = () => [
  {
    path: RoutePaths.adminDashboard,
    breadcrumb: AppStrings.dashboard,
    icon: HomeIcon,
    children: [
      {
        path: RoutePaths.users,
        breadcrumb: AppStrings.users,
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
        path: RoutePaths.settings,
        breadcrumb: AppStrings.settings,
        icon: SettingsIcon,
      },
    ],
  },
];
