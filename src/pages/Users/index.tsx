import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Container,
  Fab,
  Grow,
  MenuItem,
  MenuList,
  Pagination,
  Paper,
  Popper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  type ClickAwayListenerProps,
  type PaginationProps,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import { useCallback, useMemo, useState, type JSX } from 'react';
import { useNavigate } from 'react-router';
import {
  NavBreadcrumbs,
  SearchFilter,
  UserInfo,
  type AddEditUserFormType,
} from '../../components';
import { AppStrings } from '../../constants';
import {
  useAddEditUser,
  useDeleteUser,
  useDeleteUserSnackbar,
  usePagination,
} from '../../hooks';
import type { User, UserId } from '../../models';
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

  const filteredUsers = useMemo(() => {
    const searchFilteredUsers = filterByKeys(
      allUsers,
      ['fname', 'lname', 'designation'],
      query
    );

    if (appliedFilter !== NoneValue) {
      return searchFilteredUsers.filter(
        (user) => user.designationCode === appliedFilter
      );
    }

    return searchFilteredUsers;
  }, [allUsers, appliedFilter, query]);
  const { currentData, currentPage, totalPages, goToPage } = usePagination({
    data: filteredUsers,
    itemsPerPage: 5,
  });
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
    goToPage(1);
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
  const handlePageChange: PaginationProps['onChange'] = (_, page) => {
    goToPage(page);
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
            <TableContainer sx={{ height: 450 }}>
              <Table stickyHeader>
                <TableHead>
                  <TableRow>
                    <TableCell>{AppStrings.Name}</TableCell>
                    <TableCell>{AppStrings.Position}</TableCell>
                    <TableCell>{AppStrings.Email}</TableCell>
                    <TableCell>{AppStrings.TotalHours}</TableCell>
                    <TableCell>{AppStrings.DailyAverageHours}</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentData.map((row) => (
                    <TableRow key={row.id}>
                      <TableCell>
                        <UserInfo user={row} showDesignation={false} />
                      </TableCell>
                      <TableCell>{row.email}</TableCell>
                      <TableCell>{row.designation}</TableCell>
                      <TableCell>160</TableCell>
                      <TableCell>8.0</TableCell>
                      <TableCell>
                        <ButtonGroup
                          id={createButtonGroupId(row.id ?? '')}
                          size="medium"
                          variant="outlined"
                        >
                          <Button onClick={handleViewUser(row.id ?? '')}>
                            {AppStrings.View}
                          </Button>
                          <Button
                            size="small"
                            onClick={handleToggle(row.id ?? '')}
                          >
                            <ArrowDropDownIcon />
                          </Button>
                        </ButtonGroup>
                        <Popper
                          sx={{ zIndex: 1 }}
                          open={menuOpenedId === row.id}
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
                                    <MenuItem onClick={handleEditUser(row)}>
                                      {AppStrings.Edit}
                                    </MenuItem>
                                    <MenuItem onClick={handleDeleteUser(row)}>
                                      {AppStrings.Delete}
                                    </MenuItem>
                                  </MenuList>
                                </ClickAwayListener>
                              </Paper>
                            </Grow>
                          )}
                        </Popper>
                      </TableCell>
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
      <Fab
        sx={{ alignSelf: 'flex-end', right: 25 }}
        variant="extended"
        color="primary"
        onClick={handleAddUser}
      >
        {AppStrings.AddUser}
        <AddIcon sx={{ ml: 1 }} />
      </Fab>

      {renderDialog()}
      {renderSnackbar()}
      {renderAddEditDialog()}
    </Stack>
  );
}
