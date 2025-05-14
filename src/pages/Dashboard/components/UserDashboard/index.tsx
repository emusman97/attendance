import AddIcon from '@mui/icons-material/Add';
import { Alert, Box, Button, Container, Fab, Typography } from '@mui/material';
import { useState, type JSX } from 'react';
import { MainHeader, PastAttendace } from '../../../../components';
import { AppStrings, AttrValues } from '../../../../constants';
import { UserMockService } from '../../../../mockService';
import { useUserState } from '../../../../state';
import { Theme } from '../../../../styles';
import { canShowApplyLeaveButton, getInitials } from '../../../../utils';
import styles from './styles.module.css';
import type { AttendanceStatus } from '../../../../models';

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
          action={<Button variant="text">{AppStrings.PunchAttendance}</Button>}
        >
          <Box>
            <Typography
              sx={{ fontWeight: '500', color: Theme.colors.InfoAlert }}
            >
              {AppStrings.WelcomBackUser(info?.fname ?? '')}
            </Typography>
            <Typography sx={{ color: Theme.colors.InfoAlert }}>
              {AppStrings.ReadyPunchAttendance}
            </Typography>
          </Box>
        </Alert>

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
          <Fab
            sx={{ bottom: '1rem', right: '2rem' }}
            variant="extended"
            color="primary"
          >
            {AppStrings.ApplyForLeave}
            <AddIcon />
          </Fab>
        </Box>
      )}
    </div>
  );
}
