import type { User } from '../models';

export const AttrValues = {
  Status: 'status',
  Present: 'present',
  Absent: 'absent',
  Leave: 'leave',
} as const;

export const OfficeHoursTimeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] (AM|PM)$/;

export const DeleteUserSnackbarHideTimeout = 6000;

export const DefaultPinCode: NonNullable<User['pincode']> = '0000';

export const DEFAULT_ITEMS_PER_PAGE = 5;
