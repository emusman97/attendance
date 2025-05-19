import type { StackProps } from '@mui/material';
import type { User } from '../../models';

export interface UserInfoProps extends StackProps {
  showBottomDivider?: boolean;
  showDesignation?: boolean;
  user: User;
}
