import { AppStrings } from '../../constants';
import { SoftwareDesignations } from '../../mockService';
import type { SelectItem, SelectItems } from '../../types';

export const positions = (): SelectItems => [
  { title: AppStrings.positionsPlaceholder, value: 'none' },
  ...SoftwareDesignations.map(
    (des) => ({ title: des.title, value: des.code }) satisfies SelectItem
  ),
];

export const NoneValue = positions()[0].value;
