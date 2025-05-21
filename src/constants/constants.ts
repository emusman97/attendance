import type { User } from '../models';

export const AttrValues = {
  status: 'status',
  present: 'present',
  absent: 'absent',
  leave: 'leave',
} as const;

export const DELETE_USER_SNACKBAR_HIDE_TIMEOUT = 6000;

export const DEFAULT_PIN_CODE: NonNullable<User['pincode']> = '0000';

export const DEFAULT_ITEMS_PER_PAGE = 5;

export const TIME_FORMAT = 'hh:mm aa';

export const NONE_VALUE = 'none';
