import FilterListIcon from '@mui/icons-material/FilterList';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Pagination, { type PaginationProps } from '@mui/material/Pagination';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { useMemo, useState, type JSX } from 'react';
import { AppStrings } from '../../constants';
import { usePagination } from '../../hooks';
import { AttendanceChip } from '../AttendaceChip';
import { InputField, type InputFieldProps } from '../InputField';
import { ItemsPerPage } from './constants';
import { AttributeItems } from './data';
import type { PastAttendaceProps } from './types';
import { Select, type SelectProps } from '../Select';

export function PastAttendace({
  containerProps,
  attendance,
  selectedAttribute = AttributeItems[0].value,
  searchQuery = '',
  onSelectedAttrChange,
  onSearchQueryChange,
  onFilterButtonClick,
}: PastAttendaceProps): JSX.Element {
  const [query, setQuery] = useState(() => searchQuery);
  const [attrValue, setAtrrValue] = useState<string>(() => selectedAttribute);

  const filteredAttendance = useMemo(() => {
    const searchValue = query.trim().toLocaleLowerCase();

    return attendance.filter((attendance) =>
      `${attendance.date} ${attendance.status}`
        .toLocaleLowerCase()
        .includes(searchValue)
    );
  }, [attendance, query]);

  const { currentData, currentPage, totalPages, goToPage } = usePagination({
    data: filteredAttendance,
    itemsPerPage: ItemsPerPage,
  });

  const handleAttrValueChange: SelectProps['onValueChange'] = (newValue) => {
    setAtrrValue(newValue);
    onSelectedAttrChange?.(newValue);
  };
  const handleFilterButtonClick = () => {
    onFilterButtonClick?.(attrValue);
  };
  const handleSearchTextChange: InputFieldProps['onChange'] = (event) => {
    const value = event.currentTarget.value;
    setQuery(value);
    onSearchQueryChange?.(value);
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
          value={query}
          onChange={handleSearchTextChange}
        />
        <Select
          sx={{ ml: '1rem', mr: '1rem', minWidth: '15%' }}
          label={AppStrings.Attribute}
          value={attrValue}
          onValueChange={handleAttrValueChange}
          options={AttributeItems}
        />

        <IconButton onClick={handleFilterButtonClick}>
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
