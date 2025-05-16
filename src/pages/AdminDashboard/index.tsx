import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import { useMemo, useState, type JSX } from 'react';
import {
  InputField,
  NavBreadcrumbs,
  UserInfo,
  type InputFieldProps,
} from '../../components';
import { AppStrings } from '../../constants';
import { UserMockService } from '../../mockService';
import { StatusList } from './components';
import {
  Button,
  Pagination,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  type PaginationProps,
} from '@mui/material';
import GroupIcon from '@mui/icons-material/Group';
import { usePagination } from '../../hooks';
import { filterByKeys } from '../../utils';
import { useNavigate } from 'react-router';
import { RoutePaths } from '../../routes';

export function AdminDashboardPage(): JSX.Element {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const [data] = useState(() => ({
    present: UserMockService.getUsers().slice(0, 15),
    absent: UserMockService.getUsers().slice(100, 115),
    leave: UserMockService.getUsers().slice(150, 153),
    all: UserMockService.getUsers().slice(2),
  }));
  const usersData = useMemo(
    () => filterByKeys(data.all, ['fname', 'lname'], query),
    [data.all, query]
  );
  const { currentData, currentPage, totalPages, goToPage } = usePagination({
    data: usersData,
    itemsPerPage: 5,
  });

  const handleSearchTextChange: InputFieldProps['onChange'] = (event) => {
    setQuery(event?.currentTarget?.value ?? '');
  };
  const handlePageChange: PaginationProps['onChange'] = (_, page) => {
    goToPage(page);
  };
  const gotoUsersPage = () => {
    navigate(RoutePaths.Users);
  };

  return (
    <Stack flex={1}>
      <Container sx={{}}>
        <NavBreadcrumbs title={AppStrings.TodaysAvailability} />

        <Stack
          flex={1}
          mb={4}
          flexDirection="row"
          alignItems="flex-start"
          gap={2}
        >
          <StatusList
            sx={{ flex: 1 }}
            status={AppStrings.Present}
            users={data.present}
          />
          <StatusList
            sx={{ flex: 1 }}
            status={AppStrings.Absent}
            users={data.absent}
          />
          <StatusList
            sx={{ flex: 1 }}
            status={AppStrings.Leave}
            users={data.leave}
          />
        </Stack>

        <Stack flex={1} gap={4}>
          <Typography variant="h5">{AppStrings.OverallStats}</Typography>

          <Stack gap={2}>
            <Stack
              flexDirection="row"
              justifyContent="space-between"
              alignItems="center"
            >
              <InputField
                sx={{ minWidth: '30%' }}
                variant="outlined"
                label={AppStrings.Search}
                placeholder={AppStrings.Search}
                value={query}
                onChange={handleSearchTextChange}
              />

              <Button
                variant="contained"
                startIcon={<GroupIcon />}
                onClick={gotoUsersPage}
              >
                {AppStrings.ManageUsers}
              </Button>
            </Stack>

            <TableContainer sx={{ height: 450 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>{AppStrings.Name}</TableCell>
                    <TableCell>{AppStrings.TotalHours}</TableCell>
                    <TableCell>{AppStrings.DailyAverageHours}</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <UserInfo user={row} showDesignation={false} />
                      </TableCell>
                      <TableCell>160</TableCell>
                      <TableCell>8.0</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>

            <Pagination
              sx={{ mt: '1rem', alignSelf: 'center' }}
              color="primary"
              count={totalPages}
              showFirstButton
              showLastButton
              page={currentPage}
              onChange={handlePageChange}
            />
          </Stack>
        </Stack>
      </Container>
    </Stack>
  );
}
