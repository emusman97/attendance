import type { ChipProps } from '@mui/material';
import type { AttendanceStatus } from '../../models';

export interface AttendanceChipProps extends ChipProps {
  type: AttendanceStatus;
}
