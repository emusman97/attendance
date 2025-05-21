import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { type JSX } from 'react';
import { AppStrings } from '../../constants';
import { AttendanceChip } from '../AttendaceChip';
import { SearchTable } from '../SearchTable';
import { AttributeItems } from './data';
import type { PastAttendaceProps } from './types';

export function PastAttendace({
  containerProps,
  attendance,
}: PastAttendaceProps): JSX.Element {
  return (
    <Stack {...containerProps}>
      <Typography mb={'2rem'} variant="h5">
        {AppStrings.pastAttendance}
      </Typography>

      <SearchTable
        data={attendance}
        columns={[
          { id: 'date', label: AppStrings.date },
          {
            id: 'status',
            formatValue(_, row) {
              return <AttendanceChip type={row.status ?? 'present'} />;
            },
          },
        ]}
        showFilter
        filterLabel={AppStrings.status}
        filterOptions={AttributeItems}
        searchFilterKeys={['date', 'status']}
        filterKey="status"
      />
    </Stack>
  );
}
