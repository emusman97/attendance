import { Chip, type ChipProps } from '@mui/material';
import type { JSX } from 'react';
import { AppStrings } from '../../constants';
import type { AttendanceStatus } from '../../models';
import type { AttendanceChipProps } from './types';

const AttendanceLableMap: Record<AttendanceStatus, string> = {
  present: AppStrings.present,
  absent: AppStrings.absent,
  leave: AppStrings.leave,
};
const AttendanceColorMap: Record<AttendanceStatus, ChipProps['color']> = {
  present: 'default',
  absent: 'error',
  leave: 'info',
};

export function AttendanceChip({
  type,
  ...restProps
}: AttendanceChipProps): JSX.Element {
  return (
    <Chip
      color={AttendanceColorMap[type]}
      label={AttendanceLableMap[type]}
      {...restProps}
    />
  );
}
