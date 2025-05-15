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
    title: AppStrings.Dashboard,
    icon: <HomeIcon />,
    path: `/${RoutePaths.AdminRoot}/${RoutePaths.Dashboard}`,
  },
  {
    title: AppStrings.Users,
    icon: <GroupIcon />,
    path: `/${RoutePaths.AdminRoot}/${RoutePaths.Users}`,
  },
  {
    title: AppStrings.Settings,
    icon: <SettingsIcon />,
    path: `/${RoutePaths.AdminRoot}/${RoutePaths.Settings}`,
  },
];
