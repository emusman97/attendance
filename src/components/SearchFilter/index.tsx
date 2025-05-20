import type { JSX } from 'react';
import type { SearchFilterProps } from './types';
import Stack from '@mui/material/Stack';
import { InputField, type InputFieldProps } from '../InputField';
import { AppStrings } from '../../constants';
import { Select } from '../Select';
import IconButton from '@mui/material/IconButton';
import FilterListIcon from '@mui/icons-material/FilterList';

export function SearchFilter({
  query,
  onQueryChange,
  showSelect,
  selectionOptions,
  selectedSelectionValue,
  onSelectionValueChange,
  showFilterButton,
  onFilterButtonClick,
  RightComponent,
  ...restProps
}: SearchFilterProps): JSX.Element {
  const handleSearchTextChange: InputFieldProps['onChange'] = (event) => {
    onQueryChange?.(event.target.value);
  };

  return (
    <Stack
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      {...restProps}
    >
      <Stack flex={1}>
        <InputField
          sx={{ width: '30%' }}
          label={AppStrings.Search}
          placeholder={AppStrings.SearchPlaceholder}
          variant="outlined"
          value={query}
          onChange={handleSearchTextChange}
        />
        {showSelect && (
          <Select
            sx={{ ml: '1rem', mr: '1rem', width: '15%' }}
            label={AppStrings.Attribute}
            value={selectedSelectionValue ?? ''}
            onValueChange={onSelectionValueChange}
            options={selectionOptions ?? []}
          />
        )}

        {showFilterButton && (
          <IconButton onClick={onFilterButtonClick}>
            <FilterListIcon />
          </IconButton>
        )}
      </Stack>

      {RightComponent}
    </Stack>
  );
}

export * from './types';
