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
} from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import Stack from '@mui/material/Stack';
import { useCallback, useEffect, useRef, useState, type JSX } from 'react';
import { NavBreadcrumbs, PastAttendace } from '../../components';
import { useParams } from 'react-router';
import { UserMockService } from '../../mockService';
import {
  AppStrings,
  AttrValues,
  DeleteUserSnackbarHideTimeout,
} from '../../constants';
import type { AttendanceStatus, User } from '../../models';
import {
  useBooleanState,
  useDeleteUser,
  useDeleteUserSnackbar,
} from '../../hooks';
import { useAppDispatch, usersActions, useSelectUserById } from '../../state';
import { useDispatch } from 'react-redux';

export function UserPage(): JSX.Element {
  const dispatch = useAppDispatch();

  const params = useParams<{ userId: string }>();
  const userId = params.userId ?? '';

  const info = useSelectUserById(userId);

  const [attendance, setAttendace] = useState(() =>
    UserMockService.findAttendance(params.userId ?? '')
  );
  const [menuOpened, openMenu, closeMenu] = useBooleanState();

  const timerRef = useRef<NodeJS.Timeout>(null);

  const goBack = () => window.history.back();

  const { showDeleteUserSnackbar, renderSnackbar } = useDeleteUserSnackbar();
  const { showDeleteUserDialog, renderDialog } = useDeleteUser({
    onConfirmDeleteUser: useCallback((userToDelete: User) => {
      dispatch(usersActions.deleteUser(userToDelete.id ?? ''));
      showDeleteUserSnackbar(userToDelete, goBack);
      timerRef.current = setTimeout(goBack, DeleteUserSnackbarHideTimeout);
    }, []),
  });

  const anchorElRef = useRef<HTMLDivElement>(null);

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
  const handleDeleteUser = () => {
    showDeleteUserDialog(info ?? {});
  };

  useEffect(() => () => clearTimeout(timerRef.current ?? -1), []);

  return (
    <Stack flex={1}>
      <Container sx={{ flex: 1 }}>
        <NavBreadcrumbs
          CrumbsLeftContent={
            <>
              <ButtonGroup
                ref={anchorElRef}
                id="btn-group"
                size="medium"
                variant="outlined"
              >
                <Button>{AppStrings.Edit}</Button>
                <Button size="small" onClick={openMenu}>
                  <ArrowDropDownIcon />
                </Button>
              </ButtonGroup>
              <Popper
                sx={{ zIndex: 1 }}
                open={menuOpened}
                anchorEl={anchorElRef.current}
                role={undefined}
                transition
                disablePortal
              >
                {({ TransitionProps, placement }) => (
                  <Grow
                    {...TransitionProps}
                    style={{
                      transformOrigin:
                        placement === 'bottom' ? 'center top' : 'center bottom',
                    }}
                  >
                    <Paper>
                      <ClickAwayListener onClickAway={closeMenu}>
                        <MenuList autoFocusItem onClick={handleDeleteUser}>
                          <MenuItem>{AppStrings.Delete}</MenuItem>
                        </MenuList>
                      </ClickAwayListener>
                    </Paper>
                  </Grow>
                )}
              </Popper>
            </>
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
      {renderSnackbar()}
    </Stack>
  );
}
