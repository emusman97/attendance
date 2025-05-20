import {
  AppBar,
  Avatar,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  type IconButtonProps,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router';
import { useState, type JSX } from 'react';
import { AppStrings } from '../../constants';
import type { MainHeaderProps } from './types';
import { useAppDispatch, userActions } from '../../state';
import { RoutePaths } from '../../routes';

export function MainHeader({
  showSettingsIcon = false,
  showOpenDrawerIcon = false,
  initials,
  onLogoutClick,
  onOpenDrawerClick,
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
    navigate(RoutePaths.root, { replace: true });

    onLogoutClick?.();
  };

  return (
    <AppBar position="relative">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Stack direction="row" alignItems="center">
          {showOpenDrawerIcon && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              sx={{ mr: 2 }}
              onClick={onOpenDrawerClick}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6">{AppStrings.appName}</Typography>
        </Stack>

        {showSettingsIcon && (
          <>
            <Tooltip title={AppStrings.openSettings}>
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
                  {AppStrings.logout}
                </Typography>
              </MenuItem>
            </Menu>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
}
