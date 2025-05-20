import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/material';
import Stack from '@mui/material/Stack';
import { useMemo, useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import {
  FAB,
  MenuButton,
  NavBreadcrumbs,
  SearchFilter,
  Table,
  UserInfo,
} from '../../components';
import { AppStrings } from '../../constants';
import { useAddEditUser, useDeleteUser } from '../../hooks';
import type { User, UserId, Users } from '../../models';
import { useSelectAllUsers } from '../../state/hooks';
import { filterByKeys } from '../../utils';
import { NoneValue, positions } from './data';

export function UsersPage(): JSX.Element {
  const allUsers = useSelectAllUsers();

  const [query, setQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(NoneValue);
  const [appliedFilter, setAppliedFilter] = useState(NoneValue);
  const { showAddEditUserDialog, renderDialog: renderAddEditDialog } =
    useAddEditUser({});

  const tableData = useMemo(() => {
    let searchFilteredUsers: Users = [];

    searchFilteredUsers = filterByKeys(
      allUsers,
      ['fname', 'lname', 'designation'],
      query
    );

    if (appliedFilter !== NoneValue) {
      searchFilteredUsers = searchFilteredUsers.filter(
        (user) => user.designationCode === appliedFilter
      );
    }

    return searchFilteredUsers.map((user) => ({
      user,
      position: user.designation,
      email: user.email,
      totalHours: 180,
      averageHours: 7.5,
    }));
  }, [allUsers, appliedFilter, query]);
  const navigate = useNavigate();
  const { showDeleteUserDialog, renderDialog } = useDeleteUser({});

  const handlePositionChange = (newValue: string) => {
    setSelectedPosition(newValue);
  };
  const handleSearchTextChange = (value: string) => {
    setQuery(value);
  };
  const handleApplyFilter = () => {
    setAppliedFilter(selectedPosition);
  };
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

        <Stack flex={1} sx={{ pl: 5, pr: 5 }}>
          <SearchFilter
            query={query}
            onQueryChange={handleSearchTextChange}
            showSelect
            selectedSelectionValue={selectedPosition}
            onSelectionValueChange={handlePositionChange}
            selectionOptions={positions()}
            showFilterButton
            onFilterButtonClick={handleApplyFilter}
          />

          <Stack flex={1}>
            <Table
              tableContainerProps={{ sx: { height: 450 } }}
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
              pagination={{
                hasPagination: true,
              }}
            />
          </Stack>
        </Stack>
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
