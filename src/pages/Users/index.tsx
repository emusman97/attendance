import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useMemo, type JSX } from 'react';
import { useNavigate } from 'react-router';
import {
  FAB,
  MenuButton,
  NavBreadcrumbs,
  SearchTable,
  UserInfo,
} from '../../components';
import { AppStrings } from '../../constants';
import { useAddEditUser, useDeleteUser } from '../../hooks';
import type { User, UserId } from '../../models';
import { useSelectAllUsers } from '../../state/hooks';
import type { FilterFn } from '../../types';
import { positions } from './data';
import { makeFullName } from '../../utils';

export function UsersPage(): JSX.Element {
  const allUsers = useSelectAllUsers();

  const { showAddEditUserDialog, renderDialog: renderAddEditDialog } =
    useAddEditUser({});

  const tableData = useMemo(
    () =>
      allUsers.map((user) => ({
        user,
        position: user.designation,
        email: user.email,
        totalHours: 180,
        averageHours: 7.5,
      })),
    [allUsers]
  );
  const navigate = useNavigate();
  const { showDeleteUserDialog, renderDialog } = useDeleteUser({});

  const searchFilterFn: FilterFn<(typeof tableData)[number]> = (
    data,
    query
  ) => {
    const filter =
      `${makeFullName(data.user.fname ?? '', data.user.lname ?? '')} ${data.email} ${data.position} ${data.totalHours} ${data.averageHours}`.toLocaleLowerCase();

    return filter.includes(query);
  };
  const optionFilterFunction = (
    data: (typeof tableData)[number],
    selectedValue: string
  ) => data.user.designationCode === selectedValue;

  const handleViewUser = (userId: UserId) => () => {
    navigate(userId);
  };
  const handleAddUser = () => {
    showAddEditUserDialog('add');
  };
  const handleEditUser = (user: User) => () => {
    showAddEditUserDialog('edit', user);
  };
  const handleDeleteUser = (user: User) => () => {
    showDeleteUserDialog(user);
  };

  return (
    <Stack flex={1}>
      <Container sx={{ flex: 1 }}>
        <NavBreadcrumbs />

        <SearchTable
          data={tableData}
          columns={[
            {
              id: 'user',
              label: AppStrings.name,
              formatValue(value) {
                return (
                  <UserInfo user={value as User} showDesignation={false} />
                );
              },
            },
            { id: 'position', label: AppStrings.position },
            { id: 'email', label: AppStrings.email },
            { id: 'totalHours', label: AppStrings.totalHours },
            { id: 'averageHours', label: AppStrings.dailyAverageHours },
            {
              id: 'user',
              formatValue(value) {
                const user = value as User;

                return (
                  <MenuButton
                    mainTitle={AppStrings.view}
                    onClick={handleViewUser(user.id ?? '')}
                    menuItems={[
                      {
                        id: '1',
                        title: AppStrings.edit,
                        onClick: handleEditUser(user),
                      },
                      {
                        id: '2',
                        title: AppStrings.delete,
                        onClick: handleDeleteUser(user),
                      },
                    ]}
                  />
                );
              },
            },
          ]}
          searchFilterFunction={searchFilterFn}
          optionFilterFunction={optionFilterFunction}
          filterLabel={AppStrings.position}
          filterOptions={positions()}
          tableProps={{
            tableContainerProps: { sx: { height: 450 } },
          }}
        />
      </Container>

      <FAB
        sx={{ alignSelf: 'flex-end', right: 25 }}
        title={AppStrings.addUser}
        onClick={handleAddUser}
        RightIcon={<AddIcon sx={{ ml: 1 }} />}
      />

      {renderDialog()}
      {renderAddEditDialog()}
    </Stack>
  );
}
