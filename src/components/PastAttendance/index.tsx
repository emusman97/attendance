import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { useState, type JSX } from 'react';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select, { type SelectProps } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';
import { InputField } from '../InputField';
import { AppStrings } from '../../constants';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import { AttendanceChip } from '../AttendaceChip';
import Pagination, { type PaginationProps } from '@mui/material/Pagination';
import type { PastAttendaceProps } from './types';
import { AttributeItems } from './data';
import { ItemsPerPage } from './constants';
import { usePagination } from '../../hooks';
import { Stack } from '@mui/material';

export function PastAttendace({
  containerProps,
  attendance,
}: PastAttendaceProps): JSX.Element {
  const [selectedAttrValue, setSelectedAttrValue] = useState(
    AttributeItems[0].value
  );
  const { currentData, currentPage, totalPages, goToPage } = usePagination({
    data: attendance,
    itemsPerPage: ItemsPerPage,
  });

  const handleAttrValueChange: SelectProps['onChange'] = (event) => {
    setSelectedAttrValue(event.target.value as string);
  };
  const handlePageChange: PaginationProps['onChange'] = (_, page) => {
    goToPage(page);
  };

  return (
    <Stack {...containerProps}>
      <Typography mb={'2rem'} variant="h5">
        {AppStrings.PastAttendance}
      </Typography>

      <Box pl="1rem" pr="1rem" sx={{ display: 'flex', flexDirection: 'row' }}>
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
            {currentData.map((row) => (
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
        count={totalPages}
        showFirstButton
        showLastButton
        page={currentPage}
        onChange={handlePageChange}
      />
    </Stack>
  );
}
