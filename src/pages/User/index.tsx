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
import { useCallback, useRef, useState, type JSX } from 'react';
import { NavBreadcrumbs, PastAttendace } from '../../components';
import { useParams } from 'react-router';
import { UserMockService } from '../../mockService';
import { AppStrings, AttrValues } from '../../constants';
import type { AttendanceStatus, User } from '../../models';
import {
  useBooleanState,
  useDeleteUser,
  useDeleteUserSnackbar,
} from '../../hooks';

export function UserPage(): JSX.Element {
  const params = useParams<{ userId: string }>();

  const [info] = useState(() =>
    UserMockService.findUserById(params.userId ?? '')
  );

  const [attendance, setAttendace] = useState(() =>
    UserMockService.findAttendance(params.userId ?? '')
  );
  const [menuOpened, openMenu, closeMenu] = useBooleanState();

  const { showDeleteUserSnackbar, renderSnackbar } = useDeleteUserSnackbar();
  const { showDeleteUserDialog, renderDialog } = useDeleteUser({
    onConfirmDeleteUser: useCallback((userToDelete: User) => {
      UserMockService.deleteUser(userToDelete.id ?? '');
      showDeleteUserSnackbar(userToDelete);
      window.history.back();
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
