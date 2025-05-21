import type { StackProps } from '@mui/material';
import type { FilterFn, KeyOf, KeysOf, SelectItems } from '../../types';
import type { TableProps } from '../Table';
import type { ReactNode } from 'react';

export interface SearchTableProps<T> extends StackProps {
  data: TableProps<T>['data'];
  columns: TableProps<T>['columns'];
  searchFilterKeys?: KeysOf<T>;
  searchFilterFunction?: FilterFn<T>;
  optionFilterFunction?: (value: T, selectedOptionValue: string) => boolean;
  showFilter?: boolean;
  filterLabel?: string;
  filterOptions?: SelectItems;
  filterKey?: KeyOf<T>;
  SearchFilterRightComponent?: ReactNode;
  tableProps?: Partial<Omit<TableProps<T>, 'data' | 'columns'>>;
}
