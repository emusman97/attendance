import type { StackProps } from '@mui/material';
import type { ReactNode } from 'react';
import type { SelectItems } from '../../types';

export interface SearchFilterProps extends StackProps {
  query: string;
  onQueryChange: (value: string) => void;
  selectionOptions?: SelectItems;
  selectedSelectionValue?: string;
  onSelectionValueChange?: (value: string) => void;
  onFilterButtonClick?: () => void;
  showSelect?: boolean;
  showFilterButton?: boolean;
  RightComponent?: ReactNode;
}
