import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Container,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  type ClickAwayListenerProps,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useCallback, useMemo, useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import {
  FAB,
  NavBreadcrumbs,
  SearchFilter,
  Table,
  UserInfo,
  type AddEditUserFormType,
} from '../../components';
import { AppStrings } from '../../constants';
import {
  useAddEditUser,
  useDeleteUser,
  useDeleteUserSnackbar,
} from '../../hooks';
import type { User, UserId, Users } from '../../models';
import { usersActions } from '../../state';
import { useAppDispatch, useSelectAllUsers } from '../../state/hooks';
import { filterByKeys } from '../../utils';
import { NoneValue, positions } from './data';

export function UsersPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const allUsers = useSelectAllUsers();

  const [query, setQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(NoneValue);
  const [appliedFilter, setAppliedFilter] = useState(NoneValue);
  const [menuOpenedId, setMenuOpenedId] = useState<UserId>('');
  const [anchorEl, setAnchorEl] = useState<HTMLElement>();
  const { showAddEditUserDialog, renderDialog: renderAddEditDialog } =
    useAddEditUser({
      onSubmit: useCallback((type: AddEditUserFormType, user: User) => {
        if (type === 'add') {
          dispatch(usersActions.addUser(user));
        } else {
          dispatch(
            usersActions.editUser({
              userId: user.id ?? '',
              updatedUserInfo: user,
            })
          );
        }
      }, []),
    });

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
  const { showDeleteUserSnackbar, renderSnackbar } = useDeleteUserSnackbar();
  const { showDeleteUserDialog, renderDialog } = useDeleteUser({
    onConfirmDeleteUser: useCallback((deletedUser: User) => {
      dispatch(usersActions.deleteUser(deletedUser.id ?? ''));
      showDeleteUserSnackbar(deletedUser);
    }, []),
  });

  const createButtonGroupId = (userId: UserId) => `btn-group-${userId}`;

  const handlePositionChange = (newValue: string) => {
    setSelectedPosition(newValue);
  };
  const handleSearchTextChange = (value: string) => {
    setQuery(value);
  };
  const handleApplyFilter = () => {
    setAppliedFilter(selectedPosition);
  };
  const handleSetAnchorEl = (userId: UserId) => {
    const el = document.getElementById(createButtonGroupId(userId));

    if (el) {
      setAnchorEl(el);
    }
  };
  const handleToggle = (userId: UserId) => () => {
    handleSetAnchorEl(userId);
    setMenuOpenedId(userId);
  };
  const handleClose: ClickAwayListenerProps['onClickAway'] = () => {
    setAnchorEl(undefined);
    setMenuOpenedId('');
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
                  label: AppStrings.Name,
                  formatValue(value) {
                    return (
                      <UserInfo user={value as User} showDesignation={false} />
                    );
                  },
                },
                { id: 'position', label: AppStrings.Position },
                { id: 'email', label: AppStrings.Email },
                { id: 'totalHours', label: AppStrings.TotalHours },
                { id: 'averageHours', label: AppStrings.DailyAverageHours },
                {
                  id: 'user',
                  formatValue(value) {
                    const user = value as User;

                    return (
                      <>
                        <ButtonGroup
                          id={createButtonGroupId(user.id ?? '')}
                          size="medium"
                          variant="outlined"
                        >
                          <Button onClick={handleViewUser(user.id ?? '')}>
                            {AppStrings.View}
                          </Button>
                          <Button
                            size="small"
                            onClick={handleToggle(user.id ?? '')}
                          >
                            <ArrowDropDownIcon />
                          </Button>
                        </ButtonGroup>
                        <Popper
                          sx={{ zIndex: 1 }}
                          open={menuOpenedId === user.id}
                          anchorEl={anchorEl}
                          role={undefined}
                          transition
                          disablePortal
                        >
                          {({ TransitionProps, placement }) => (
                            <Grow
                              {...TransitionProps}
                              style={{
                                transformOrigin:
                                  placement === 'bottom'
                                    ? 'center top'
                                    : 'center bottom',
                              }}
                            >
                              <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                  <MenuList autoFocusItem>
                                    <MenuItem onClick={handleEditUser(user)}>
                                      {AppStrings.Edit}
                                    </MenuItem>
                                    <MenuItem onClick={handleDeleteUser(user)}>
                                      {AppStrings.Delete}
                                    </MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </>
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
        title={AppStrings.AddUser}
        onClick={handleAddUser}
        RightIcon={<AddIcon sx={{ ml: 1 }} />}
      />

      {renderDialog()}
      {renderSnackbar()}
      {renderAddEditDialog()}
    </Stack>
  );
}
