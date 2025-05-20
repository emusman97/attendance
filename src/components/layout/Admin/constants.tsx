import { AppStrings } from '../../../constants';
import HomeIcon from '@mui/icons-material/Home';
import GroupIcon from '@mui/icons-material/Group';
import SettingsIcon from '@mui/icons-material/Settings';
import { RoutePaths } from '../../../routes';

/**
 * Started getting error that cannot use `RoutePaths` before
 * initialization therefore using this method instead of
 * a variable
 */
export const getDrawerList = () => [
  {
    title: AppStrings.dashboard,
    icon: <HomeIcon />,
    path: RoutePaths.AdminDashboard,
  },
  {
    title: AppStrings.users,
    icon: <GroupIcon />,
    path: RoutePaths.AdminUsers,
  },
  {
    title: AppStrings.settings,
    icon: <SettingsIcon />,
    path: RoutePaths.AdminSettings,
  },
];
