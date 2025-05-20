import type { StackProps } from '@mui/material';

export interface MenuItem {
  id: string;
  title: string;
  onClick: () => void;
}
export type MenuItems = MenuItem[];

export interface MenuButtonProps extends StackProps {
  mainTitle: string;
  menuItems: MenuItems;
  onClick?: () => void;
}
