import { useRef, type JSX } from 'react';
import type { MenuButtonProps } from './types';
import {
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
  Stack,
} from '@mui/material';
import { useBooleanState } from '../../hooks';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

export function MenuButton({
  mainTitle,
  menuItems,
  onClick,
  ...restProps
}: MenuButtonProps): JSX.Element {
  const [menuOpened, openMenu, closeMenu] = useBooleanState();

  const anchorElRef = useRef<HTMLDivElement>(null);

  return (
    <Stack {...restProps}>
      <ButtonGroup ref={anchorElRef} size="medium" variant="outlined">
        <Button onClick={onClick}>{mainTitle}</Button>
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
                <MenuList autoFocusItem>
                  {menuItems.map((item) => (
                    <MenuItem key={item.id} onClick={item.onClick}>
                      {item.title}
                    </MenuItem>
                  ))}
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Stack>
  );
}

export * from './types';
