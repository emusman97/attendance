import type {
  TableProps as MUITableProps,
  PaginationProps,
  StackProps,
  TableContainerProps,
} from '@mui/material';
import type { ReactNode } from 'react';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnyData = Record<string, any>;

export interface Column<T> {
  id: keyof T;
  label?: string;
  formatValue?: (value: T[keyof T], row: T) => string | ReactNode;
}
export type Columns<T> = Column<T>[];

export interface PaginationOptions {
  hasPagination: boolean;
  initialPage?: number;
  itemsPerPage?: number;
  paginationProps?: PaginationProps;
}

export interface TableProps<T> extends StackProps {
  columns: Columns<T>;
  data: T[];
  pagination: PaginationOptions;
  tableContainerProps?: TableContainerProps;
  tableComponentProps?: MUITableProps;
}
