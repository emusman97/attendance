import AddIcon from '@mui/icons-material/Add';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Fab,
  FormControl,
  Grow,
  IconButton,
  InputLabel,
  MenuItem,
  MenuList,
  Pagination,
  Paper,
  Popper,
  Select,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  type ClickAwayListenerProps,
  type PaginationProps,
  type SelectProps,
} from '@mui/material';
import Stack from '@mui/material/Stack';
import {
  createRef,
  Fragment,
  useEffect,
  useMemo,
  useRef,
  useState,
  type JSX,
  type RefObject,
} from 'react';
import {
  InputField,
  NavBreadcrumbs,
  UserInfo,
  type InputFieldProps,
} from '../../components';
import { AppStrings } from '../../constants';
import { usePagination } from '../../hooks';
import { UserMockService } from '../../mockService';
import type { User, UserId } from '../../models';
import { filterByKeys, makeFullName } from '../../utils';
import { positions } from './data';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate } from 'react-router';

export function UsersPage(): JSX.Element {
  const [allUsers, setAllUsers] = useState(() => UserMockService.getUsers());

  const [query, setQuery] = useState('');
  const [selectedPosition, setSelectedPosition] = useState(
    positions()?.[0]?.value ?? ''
  );
  const [menuOpenedId, setMenuOpenedId] = useState<UserId>('');
  const [deleteUserDialogOpened, setDeleteUserDialogOpened] = useState(false);
  const [deleteUserSnackbarShown, setDeleteUserSnackbarShown] = useState(false);

  const filteredUsers = useMemo(
    () => filterByKeys(allUsers, ['fname', 'lname', 'designation'], query),
    [allUsers, query]
  );
  const { currentData, currentPage, totalPages, goToPage } = usePagination({
    data: filteredUsers,
    itemsPerPage: 5,
  });
  const navigate = useNavigate();

  const anchorElRefs = useMemo(() => {
    const refsMap = new Map<UserId, RefObject<HTMLDivElement | null>>();

    currentData.forEach((user) => {
      refsMap.set(user.id ?? '', createRef());
    });

    return refsMap;
  }, [currentData]);
  const userToMutateRef = useRef<User>(null);

  const handlePositionChange: SelectProps['onChange'] = (event) => {
    setSelectedPosition(`${event.target.value}`);
  };
  const handleSearchTextChange: InputFieldProps['onChange'] = (event) => {
    setQuery(event?.currentTarget?.value ?? '');
  };
  const handleApplyFilter = () => {
    const noneValue = positions()[0].value;

    if (selectedPosition !== noneValue) {
      const item = positions()
        .slice(1)
        .find((position) => position.value === selectedPosition);

      setAllUsers(
        UserMockService.getUsers().filter(
          (user) => user.designation === item?.title
        )
      );
    } else {
      setAllUsers(UserMockService.getUsers());
    }

    goToPage(1);
  };
  const handleToggle = (userId: UserId) => () => {
    setMenuOpenedId(userId);
  };
  const handleClose: ClickAwayListenerProps['onClickAway'] = () => {
    setMenuOpenedId('');
  };
  const handleViewUser = (userId: UserId) => () => {
    navigate(userId);
  };
  const handleEditUser = (userId: UserId) => () => {};
  const handleDeleteUser = (user: User) => () => {
    userToMutateRef.current = user;
    setDeleteUserDialogOpened(true);
  };
  const handleCloseDeleteUserDialog = () => {
    setDeleteUserDialogOpened(false);
  };
  const handleConfirmDeleteUser = () => {
    UserMockService.deleteUser(userToMutateRef.current?.id ?? '');
    setAllUsers(UserMockService.getUsers());
    setDeleteUserDialogOpened(false);
    setDeleteUserSnackbarShown(true);
  };
  const handleCloseDeleteSnackbar = () => {
    setDeleteUserSnackbarShown(false);
  };
  const handlePageChange: PaginationProps['onChange'] = (_, page) => {
    goToPage(page);
  };

  useEffect(
    () => () => {
      anchorElRefs.clear();
    },
    [anchorElRefs]
  );

  return (
    <Stack flex={1}>
      <Container sx={{ flex: 1 }}>
        <NavBreadcrumbs />

        <Stack flex={1} sx={{ pl: 5, pr: 5 }}>
          <Stack flexDirection="row" alignItems="center" gap={2}>
            <InputField
              sx={{ minWidth: '30%' }}
              variant="outlined"
              label={AppStrings.Search}
              placeholder={AppStrings.SearchUserLabel}
              value={query}
              onChange={handleSearchTextChange}
            />
            <FormControl sx={{ minWidth: '15%' }}>
              <InputLabel>{AppStrings.Position}</InputLabel>
              <Select
                autoWidth
                label={AppStrings.Position}
                value={selectedPosition}
                onChange={handlePositionChange}
              >
                {positions().map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <IconButton onClick={handleApplyFilter}>
              <FilterListIcon />
            </IconButton>
          </Stack>

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
                          ref={anchorElRefs.get(row.id ?? '')}
                          id="btn-group"
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
                          anchorEl={anchorElRefs.get(row.id ?? '')?.current}
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
                                    <MenuItem
                                      onClick={handleEditUser(row.id ?? '')}
                                    >
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
      >
        {AppStrings.AddUser}
        <AddIcon sx={{ ml: 1 }} />
      </Fab>

      <Dialog
        open={deleteUserDialogOpened}
        onClose={handleCloseDeleteUserDialog}
      >
        <DialogTitle>{AppStrings.DeleteUserTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete the user{' '}
            <Typography component="span" variant="body1" fontWeight="700">
              {makeFullName(
                userToMutateRef.current?.fname ?? '',
                userToMutateRef.current?.lname ?? ''
              )}
            </Typography>
            ? This action is irreversible.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteUserDialog}>
            {AppStrings.Nevermind}
          </Button>
          <Button color="error" onClick={handleConfirmDeleteUser} autoFocus>
            {AppStrings.DeleteUser}
          </Button>
        </DialogActions>
      </Dialog>

      <Snackbar
        open={deleteUserSnackbarShown}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        autoHideDuration={6000}
        onClose={handleCloseDeleteSnackbar}
        message={
          <Typography>
            {AppStrings.DeletedUser}{' '}
            <Typography component="span" fontWeight="bold">
              {makeFullName(
                userToMutateRef.current?.fname ?? '',
                userToMutateRef.current?.lname ?? ''
              )}
            </Typography>
          </Typography>
        }
        action={
          <Fragment>
            <Button onClick={handleCloseDeleteSnackbar}>
              {AppStrings.Undo}
            </Button>
            <IconButton color="inherit" onClick={handleCloseDeleteSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          </Fragment>
        }
      />
    </Stack>
  );
}
