import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
  type IconButtonProps,
} from '@mui/material';
import { useNavigate } from 'react-router';
import { useState, type JSX } from 'react';
import { AppStrings } from '../../constants';
import type { MainHeaderProps } from './types';
import { useAppDispatch, userActions } from '../../state';
import { RoutePaths } from '../../routes';

export function MainHeader({
  showSettingsIcon,
  initials,
  onLogoutClick,
}: MainHeaderProps): JSX.Element {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const [anchorElSettings, setAnchorElSettings] = useState<HTMLElement | null>(
    null
  );

  const handleOpenSettingsMenu: IconButtonProps['onClick'] = (event) => {
    setAnchorElSettings(event.currentTarget);
  };
  const handleCloseSettingsMenu = () => {
    setAnchorElSettings(null);
  };
  const handleLogout = () => {
    handleCloseSettingsMenu();

    dispatch(userActions.logout());
    navigate(RoutePaths.Root, { replace: true });

    onLogoutClick?.();
  };

  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant="h6">{AppStrings.AppName}</Typography>

        {showSettingsIcon && (
          <>
            <Tooltip title={AppStrings.OpenSettings}>
              <IconButton sx={{ p: 0 }} onClick={handleOpenSettingsMenu}>
                <Avatar>{initials}</Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '3rem' }}
              id="menu-appbar"
              anchorEl={anchorElSettings}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={!!anchorElSettings}
              onClose={handleCloseSettingsMenu}
            >
              <MenuItem onClick={handleLogout}>
                <Typography sx={{ textAlign: 'center' }}>
                  {AppStrings.Logout}
                </Typography>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
