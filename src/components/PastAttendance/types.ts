import type { StackProps } from '@mui/material';
import type { Attendances } from '../../models';

export interface PastAttendaceProps {
  containerProps?: StackProps;
  searchQuery?: string;
  selectedAttribute?: string;
  attendance: Attendances;
  onSelectedAttrChange?: (newAttr: string) => void;
  onSearchQueryChange?: (newQuery: string) => void;
  onFilterButtonClick?: (filterBy: string) => void;
}
