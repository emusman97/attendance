import GroupIcon from '@mui/icons-material/Group';
import { Button, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useEffect, useMemo, type JSX } from 'react';
import { useNavigate } from 'react-router';
import { NavBreadcrumbs, SearchTable, UserInfo } from '../../components';
import { AppStrings } from '../../constants';
import { RoutePaths } from '../../routes';
import { useAppDispatch, usersActions, useSelectAllUsers } from '../../state';
import { StatusList } from './components';
import type { FilterFn } from '../../types';
import { makeFullName } from '../../utils';

export function AdminDashboardPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const allUsers = useSelectAllUsers();

  const navigate = useNavigate();

  const data = useMemo(
    () => ({
      present: allUsers.slice(0, 15),
      absent: allUsers.slice(100, 115),
      leave: allUsers.slice(150, 153),
      all: allUsers.slice(2),
    }),
    [allUsers]
  );
  const tableData = useMemo(
    () =>
      data.all.map((user) => ({
        user,
        totalHours: 160,
        averageHours: 8.0,
      })),
    [data.all]
  );

  const usersFilterFunction: FilterFn<(typeof tableData)[number]> = (
    data,
    query
  ) => {
    const filter =
      `${makeFullName(data.user.fname ?? '', data.user.lname ?? '')} ${data.averageHours} ${data.totalHours}`.toLocaleLowerCase();

    return filter.includes(query);
  };

  const gotoUsersPage = () => {
    navigate(RoutePaths.users);
  };

  useEffect(() => {
    dispatch(usersActions.fetchAllUsers());
  }, [dispatch]);

  return (
    <Stack flex={1}>
      <Container sx={{}}>
        <NavBreadcrumbs title={AppStrings.todaysAvailability} />

        <Stack
          flex={1}
          mb={4}
          flexDirection="row"
          alignItems="flex-start"
          gap={2}
        >
          <StatusList
            sx={{ flex: 1 }}
            status={AppStrings.present}
            users={data.present}
          />
          <StatusList
            sx={{ flex: 1 }}
            status={AppStrings.absent}
            users={data.absent}
          />
          <StatusList
            sx={{ flex: 1 }}
            status={AppStrings.leave}
            users={data.leave}
          />
        </Stack>

        <Stack flex={1} gap={4}>
          <Typography variant="h5">{AppStrings.overallStats}</Typography>

          <SearchTable
            data={tableData}
            columns={[
              {
                id: 'user',
                label: AppStrings.name,
                formatValue(_, row) {
                  return <UserInfo user={row.user} showDesignation={false} />;
                },
              },
              { id: 'totalHours', label: AppStrings.totalHours },
              { id: 'averageHours', label: AppStrings.dailyAverageHours },
            ]}
            showFilter={false}
            searchFilterFunction={usersFilterFunction}
            SearchFilterRightComponent={
              <Button
                variant="contained"
                startIcon={<GroupIcon />}
                onClick={gotoUsersPage}
              >
                {AppStrings.manageUsers}
              </Button>
            }
            tableProps={{ tableContainerProps: { sx: { height: 450 } } }}
          />
        </Stack>
      </Container>
    </Stack>
  );
}
