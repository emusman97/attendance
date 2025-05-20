import { MenuItem, Select as MUISelect } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import type { JSX } from 'react';
import type { SelectProps, StringSelectProps } from './types';

export function Select({
  label,
  value,
  onValueChange,
  selectProps,
  options,
  ...restProps
}: SelectProps): JSX.Element {
  const handleValueChange: StringSelectProps['onChange'] = (event) => {
    onValueChange?.(event.target.value);
  };

  return (
    <FormControl {...restProps}>
      <InputLabel>{label}</InputLabel>
      <MUISelect
        autoWidth
        label={label}
        value={value}
        onChange={handleValueChange}
        {...selectProps}
      >
        {options.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.title}
          </MenuItem>
        ))}
      </MUISelect>
    </FormControl>
  );
}

export type { SelectProps } from './types';
