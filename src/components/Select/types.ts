import type {
  FormControlProps,
  SelectProps as MUISelectProps,
} from '@mui/material';
import type { SelectItems } from '../../types';

export type StringSelectProps = MUISelectProps<string>;

export interface SelectProps extends FormControlProps {
  label: string;
  value: string;
  onValueChange: (newValue: string) => void;
  selectProps?: StringSelectProps;
  options: SelectItems;
}
