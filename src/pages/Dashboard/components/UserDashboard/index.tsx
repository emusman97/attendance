import FilterListIcon from '@mui/icons-material/FilterList';
import {
  Alert,
  Box,
  Button,
  Container,
  Fab,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  PaginationItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  type SelectProps,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState, type JSX } from 'react';
import { AttendanceChip, InputField, MainHeader } from '../../../../components';
import { AppStrings } from '../../../../constants';
import { UserMockService } from '../../../../mockService';
import { useUserState } from '../../../../state';
import { Theme } from '../../../../styles';
import { canShowApplyLeaveButton, getInitials } from '../../../../utils';
import { AttributeItems } from './data';
import styles from './styles.module.css';

export function UserDashboard(): JSX.Element {
  const { info } = useUserState();
  const [attendance] = useState(() =>
    UserMockService.findAttendance(info?.id ?? '')
  );

  const [selectedAttrValue, setSelectedAttrValue] = useState(
    AttributeItems[0].value
  );

  const handleAttrValueChange: SelectProps['onChange'] = (event) => {
    setSelectedAttrValue(event.target.value as string);
  };

  return (
    <div className={styles.container}>
      <MainHeader
        showSettingsIcon
        initials={getInitials(info?.fname ?? '', info?.lname ?? '')}
      />

      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          pt: '2rem',
          pb: '2rem',
          flex: 1,
        }}
      >
        <Alert
          severity="info"
          action={<Button variant="text">{AppStrings.PunchAttendance}</Button>}
        >
          <Box>
            <Typography
              sx={{ fontWeight: '500', color: Theme.colors.InfoAlert }}
            >
              {AppStrings.WelcomBackUser(info?.fname ?? '')}
            </Typography>
            <Typography sx={{ color: Theme.colors.InfoAlert }}>
              {AppStrings.ReadyPunchAttendance}
            </Typography>
          </Box>
        </Alert>

        <Box
          flexBasis={1}
          flex={1}
          sx={{ display: 'flex', flexDirection: 'column', mt: '2rem' }}
        >
          <Typography mb={'2rem'} variant="h5">
            {AppStrings.PastAttendance}
          </Typography>

          <Box
            pl="1rem"
            pr="1rem"
            sx={{ display: 'flex', flexDirection: 'row' }}
          >
            <InputField
              sx={{ minWidth: '30%' }}
              label={AppStrings.Search}
              placeholder={AppStrings.SearchPlaceholder}
              variant="outlined"
            />
            <FormControl sx={{ ml: '1rem', mr: '1rem', minWidth: '15%' }}>
              <InputLabel>{AppStrings.Attribute}</InputLabel>
              <Select
                autoWidth
                label={AppStrings.Attribute}
                value={selectedAttrValue}
                onChange={handleAttrValueChange}
              >
                {AttributeItems.map((item) => (
                  <MenuItem key={item.value} value={item.value}>
                    {item.title}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Box>

          <TableContainer sx={{ mt: '2rem', maxHeight: '30vh' }}>
            <Table stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>{AppStrings.Date}</TableCell>
                  <TableCell>{AppStrings.Status}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {attendance.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.date}</TableCell>
                    <TableCell>
                      <AttendanceChip type={row.status ?? 'present'} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Pagination
            sx={{ mt: '1rem', alignSelf: 'center' }}
            color="primary"
            count={10}
            showFirstButton
            showLastButton
            renderItem={(params) => <PaginationItem {...params} />}
          />
        </Box>
      </Container>

      {canShowApplyLeaveButton() && (
        <Box sx={{ flex: 1, alignSelf: 'flex-end' }}>
          <Fab
            sx={{ bottom: '1rem', right: '2rem' }}
            variant="extended"
            color="primary"
          >
            {AppStrings.ApplyForLeave}
            <AddIcon />
          </Fab>
        </Box>
      )}
    </div>
  );
}
