import { Stack } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useMemo, useState, type JSX } from 'react';
import { AppStrings } from '../../constants';
import { AttendanceChip } from '../AttendaceChip';
import { SearchFilter } from '../SearchFilter';
import { Table } from '../Table';
import { AttributeItems } from './data';
import type { PastAttendaceProps } from './types';

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

  const handleAttrValueChange = (newValue: string) => {
    setAtrrValue(newValue);
    onSelectedAttrChange?.(newValue);
  };
  const handleFilterButtonClick = () => {
    onFilterButtonClick?.(attrValue);
  };
  const handleSearchTextChange = (value: string) => {
    setQuery(value);
    onSearchQueryChange?.(value);
  };

  return (
    <Stack {...containerProps}>
      <Typography mb={'2rem'} variant="h5">
        {AppStrings.PastAttendance}
      </Typography>

      <SearchFilter
        pl="1rem"
        pr="1rem"
        query={query}
        onQueryChange={handleSearchTextChange}
        showSelect
        selectionOptions={AttributeItems}
        selectedSelectionValue={attrValue}
        onSelectionValueChange={handleAttrValueChange}
        showFilterButton
        onFilterButtonClick={handleFilterButtonClick}
      />

      <Table
        tableContainerProps={{ sx: { mt: '2rem', maxHeight: '30vh' } }}
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
