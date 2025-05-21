import { Stack } from '@mui/material';
import { useMemo, useState, type JSX } from 'react';
import { NONE_VALUE } from '../../constants';
import { filterByFilterFn, filterByKeys } from '../../utils';
import { SearchFilter } from '../SearchFilter';
import { Table, type AnyData } from '../Table';
import type { SearchTableProps } from './types';

export function SearchTable<T extends AnyData>({
  data,
  columns,
  showFilter = true,
  searchFilterKeys,
  searchFilterFunction,
  optionFilterFunction,
  filterLabel,
  filterOptions,
  filterKey,
  SearchFilterRightComponent,
  tableProps,
  ...restProps
}: SearchTableProps<T>): JSX.Element {
  const [query, setQuery] = useState('');
  const [selectedSelectionValue, setSelectedSelectionValue] =
    useState(NONE_VALUE);
  const [appliedFilter, setAppliedFilter] = useState<string>(NONE_VALUE);

  const filteredData = useMemo(() => {
    const searchFilterResults = searchFilterFunction
      ? filterByFilterFn(data, query, searchFilterFunction)
      : filterByKeys(data, searchFilterKeys ?? [], query);

    if (appliedFilter === NONE_VALUE) {
      return searchFilterResults;
    }

    return searchFilterResults.filter((searchResult) => {
      if (filterKey) {
        const filterValue = searchResult[filterKey ?? ''];

        return filterValue === appliedFilter;
      }

      return (
        optionFilterFunction?.(searchResult, selectedSelectionValue) ??
        searchResult
      );
    });
  }, [data, query, appliedFilter]);

  const handleFilterButtonClick = () => {
    setAppliedFilter(selectedSelectionValue);
  };

  return (
    <Stack {...restProps}>
      <SearchFilter
        pl={2}
        pr={2}
        query={query}
        onQueryChange={setQuery}
        showSelect={showFilter}
        selectionLabel={filterLabel}
        selectionOptions={filterOptions}
        selectedSelectionValue={selectedSelectionValue}
        onSelectionValueChange={setSelectedSelectionValue}
        showFilterButton={showFilter}
        onFilterButtonClick={handleFilterButtonClick}
        RightComponent={SearchFilterRightComponent}
      />

      <Table
        tableContainerProps={{ sx: { mt: '2rem', maxHeight: '30vh' } }}
        data={filteredData}
        columns={columns}
        pagination={{ hasPagination: true }}
        {...tableProps}
      />
    </Stack>
  );
}
