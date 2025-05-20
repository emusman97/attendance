import FilterListIcon from '@mui/icons-material/FilterList';
import { Stack } from '@mui/material';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useMemo, useState, type JSX } from 'react';
import { AppStrings } from '../../constants';
import { InputField, type InputFieldProps } from '../InputField';
import { Select, type SelectProps } from '../Select';
import { Table } from '../Table';
import { AttributeItems } from './data';
import type { PastAttendaceProps } from './types';
import { AttendanceChip } from '../AttendaceChip';

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

      <Table
        sx={{ mt: '2rem', maxHeight: '30vh' }}
        tableComponentProps={{ stickyHeader: true }}
        data={filteredAttendance}
        columns={[
          { id: 'date', label: AppStrings.Date },
          {
            id: 'status',
            formatValue(_, row) {
              return <AttendanceChip type={row.status ?? 'present'} />;
            },
          },
        ]}
        pagination={{ hasPagination: true }}
      />
    </Stack>
  );
}
