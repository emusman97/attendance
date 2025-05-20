import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useState, type JSX } from 'react';
import { useParams } from 'react-router';
import { MenuButton, NavBreadcrumbs, PastAttendace } from '../../components';
import { AppStrings, AttrValues } from '../../constants';
import { useAddEditUser, useDeleteUser } from '../../hooks';
import { UserMockService } from '../../mockService';
import type { AttendanceStatus } from '../../models';
import { useSelectUserById } from '../../state';

export function UserPage(): JSX.Element {
  const params = useParams<{ userId: string }>();
  const { showAddEditUserDialog, renderDialog } = useAddEditUser({});
  const userId = params.userId ?? '';

  const info = useSelectUserById(userId);

  const [attendance, setAttendace] = useState(() =>
    UserMockService.findAttendance(params.userId ?? '')
  );

  const { showDeleteUserDialog, renderDialog: renderDeleteUserDialog } =
    useDeleteUser({});

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
  const handleEditUser = () => {
    showAddEditUserDialog('edit', info);
  };
  const handleDeleteUser = () => {
    showDeleteUserDialog(info ?? {});
  };

  return (
    <Stack flex={1}>
      <Container sx={{ flex: 1 }}>
        <NavBreadcrumbs
          CrumbsLeftContent={
            <MenuButton
              mainTitle={AppStrings.edit}
              onClick={handleEditUser}
              menuItems={[
                {
                  id: '1',
                  title: AppStrings.delete,
                  onClick: handleDeleteUser,
                },
              ]}
            />
          }
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

      {renderDialog()}
      {renderDeleteUserDialog()}
    </Stack>
  );
}
