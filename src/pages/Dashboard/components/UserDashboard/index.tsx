import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Container } from '@mui/material';
import { useState, type JSX } from 'react';
import { Alert, FAB, MainHeader, PastAttendace } from '../../../../components';
import { AppStrings, AttrValues } from '../../../../constants';
import { UserMockService } from '../../../../mockService';
import type { AttendanceStatus } from '../../../../models';
import { useUserState } from '../../../../state';
import { canShowApplyLeaveButton, getInitials } from '../../../../utils';
import styles from './styles.module.css';

export function UserDashboard(): JSX.Element {
  const { info } = useUserState();

  const [attendance, setAttendace] = useState(() =>
    UserMockService.findAttendance(info?.id ?? '')
  );

  const handleFilterButtonClick = (filterValue: string) => {
    if (filterValue === AttrValues.Status) {
      setAttendace(UserMockService.findAttendance(info?.id ?? ''));
    } else {
      let status: AttendanceStatus | null = null;

      if (filterValue === AttrValues.Present) {
        status = 'present';
      } else if (filterValue === AttrValues.Absent) {
        status = 'absent';
      } else if (filterValue === AttrValues.Leave) {
        status = 'leave';
      }

      if (status) {
        setAttendace(UserMockService.filterAttendance(info?.id ?? '', status));
      }
    }
  };

  return (
    <div className={styles.container}>
      <MainHeader
        showSettingsIcon
        initials={getInitials(info?.fname ?? '', info?.lname ?? '')}
      />

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: '2rem',
          pb: '2rem',
          flex: 1,
        }}
      >
        <Alert
          severity="info"
          action={<Button variant="text">{AppStrings.punchAttendance}</Button>}
          title={AppStrings.welcomBackUser(info?.fname ?? '')}
          description={AppStrings.readyPunchAttendance}
        />

        <PastAttendace
          attendance={attendance}
          containerProps={{
            flex: 1,
            sx: {
              display: 'flex',
              flexDirection: 'column',
              mt: '2rem',
            },
          }}
          onFilterButtonClick={handleFilterButtonClick}
        />
      </Container>

      {canShowApplyLeaveButton() && (
        <Box sx={{ flex: 1, alignSelf: 'flex-end' }}>
          <FAB
            sx={{ bottom: '1rem', right: '2rem' }}
            title={AppStrings.applyForLeave}
            RightIcon={<AddIcon />}
          />
        </Box>
      )}
    </div>
  );
}
