import {
  Table as MUITable,
  Pagination,
  Stack,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  type PaginationProps,
} from '@mui/material';
import type { JSX } from 'react';
import { DEFAULT_ITEMS_PER_PAGE } from '../../constants';
import { usePagination } from '../../hooks';
import type { AnyData, TableProps } from './types';

export function Table<T extends AnyData>({
  columns,
  data,
  pagination,
  tableContainerProps,
  tableComponentProps,
  ...restProps
}: TableProps<T>): JSX.Element {
  const { currentData, currentPage, totalPages, goToPage } = usePagination({
    data,
    itemsPerPage: pagination.itemsPerPage ?? DEFAULT_ITEMS_PER_PAGE,
    initialPage: pagination.initialPage,
  });

  const handlePageChange: PaginationProps['onChange'] = (_, page) => {
    goToPage(page);
  };

  return (
    <Stack {...restProps}>
      <TableContainer {...tableContainerProps}>
        <MUITable stickyHeader {...tableComponentProps}>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell key={String(column.id)}>{column.label}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {currentData.map((row) => (
              <TableRow key={`${row.id}`}>
                {columns.map((column) => {
                  const value = row[column.id];

                  return (
                    <TableCell key={`${row.id}-${String(column.id)}`}>
                      {column.formatValue
                        ? column.formatValue(value, row)
                        : value}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))}
          </TableBody>
        </MUITable>
      </TableContainer>

      {pagination.hasPagination && (
        <Pagination
          sx={{ mt: '1rem', alignSelf: 'center' }}
          color="primary"
          showFirstButton
          showLastButton
          {...pagination.paginationProps}
          count={totalPages}
          page={currentPage}
          onChange={handlePageChange}
        />
      )}
    </Stack>
  );
}
