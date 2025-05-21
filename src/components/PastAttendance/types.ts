import type { StackProps } from '@mui/material';
import type { Attendances } from '../../models';

export interface PastAttendaceProps {
  containerProps?: StackProps;
  attendance: Attendances;
}
