import { Avatar, Divider, Stack, Typography } from '@mui/material';
import { useMemo, type JSX } from 'react';
import type { UserInfoProps } from './types';
import { getInitials, makeFullName } from '../../utils';

export function UserInfo({
  showBottomDivider,
  showDesignation = true,
  user,
  ...restProps
}: UserInfoProps): JSX.Element {
  const initials = useMemo(
    () => getInitials(user.fname ?? '', user.lname ?? ''),
    [user.fname, user.lname]
  );

  return (
    <Stack gap={1} {...restProps}>
      <Stack flexDirection="row" alignItems="center" gap={1}>
        <Avatar>{initials}</Avatar>
        <Stack>
          <Typography variant="body2" fontSize={14}>
            {makeFullName(user.fname ?? '', user.lname ?? '')}
          </Typography>
          {showDesignation && (
            <Typography variant="body2" color="textDisabled" fontSize={14}>
              {user.designation}
            </Typography>
          )}
        </Stack>
      </Stack>
      {showBottomDivider && <Divider />}
    </Stack>
  );
}
