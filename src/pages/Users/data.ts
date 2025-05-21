import { AppStrings, NONE_VALUE } from '../../constants';
import { SoftwareDesignations } from '../../mockService';
import type { SelectItem, SelectItems } from '../../types';

export const positions = (): SelectItems => [
  { title: AppStrings.positionsPlaceholder, value: NONE_VALUE },
  ...SoftwareDesignations.map(
    (des) => ({ title: des.title, value: des.code }) satisfies SelectItem
  ),
];

export const NoneValue = positions()[0].value;
