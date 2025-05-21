import { AppStrings, AttrValues, NONE_VALUE } from '../../constants';
import type { SelectItems } from '../../types';

export const AttributeItems: SelectItems = [
  { title: AppStrings.status, value: NONE_VALUE },
  { title: AppStrings.present, value: AttrValues.present },
  { title: AppStrings.absent, value: AttrValues.absent },
  { title: AppStrings.leave, value: AttrValues.leave },
];
