import { AppStrings } from '../../constants';
import { SoftwareDesignations } from '../../mockService';
import type { SelectItem, SelectItems } from '../../types';

export const positions = (): SelectItems => [
  { title: AppStrings.PositionsPlaceholder, value: 'none' },
  ...SoftwareDesignations.map(
    (des) => ({ title: des.title, value: des.code }) satisfies SelectItem
  ),
];
