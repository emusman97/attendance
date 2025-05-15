import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import { useState, type JSX } from 'react';
import { Outlet, useNavigate } from 'react-router';
import { useUserInfo } from '../../../state';
import { getInitials } from '../../../utils';
import { MainHeader } from '../../MainHeader';
import { PageLayout } from '../Page';
import { getDrawerList } from './constants';

export function AdminLayout(): JSX.Element {
  const { fname, lname } = useUserInfo();

  const [drawerOpened, setDrawerOpened] = useState(false);
  const [DrawerList] = useState(() => getDrawerList());
  const navigate = useNavigate();

  const toggleDrawer = (newOpen: boolean) => () => {
    setDrawerOpened(newOpen);
  };

  const handleNav = (path: string) => () => {
    navigate(path);
    setDrawerOpened(false);
  };

  return (
    <PageLayout>
      <Drawer open={drawerOpened} onClose={toggleDrawer(false)}>
        <Stack sx={{ width: 250 }}>
          <List>
            {DrawerList.map((list) => (
              <ListItem key={list.title} disablePadding>
                <ListItemButton onClick={handleNav(list.path)}>
                  <ListItemIcon>{list.icon}</ListItemIcon>
                  <ListItemText primary={list.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
      </Drawer>
      <MainHeader
        showOpenDrawerIcon
        showSettingsIcon
        onOpenDrawerClick={toggleDrawer(true)}
        initials={getInitials(fname ?? '', lname ?? '')}
      />

      <Stack sx={{ pt: 3, pb: 3, flex: 1 }}>
        <Outlet />
      </Stack>
    </PageLayout>
  );
}
