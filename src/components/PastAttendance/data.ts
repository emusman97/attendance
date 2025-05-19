import { AppStrings, AttrValues } from '../../constants';
import type { SelectItems } from '../../types';

export const AttributeItems: SelectItems = [
  { title: AppStrings.Status, value: AttrValues.Status },
  { title: AppStrings.Present, value: AttrValues.Present },
  { title: AppStrings.Absent, value: AttrValues.Absent },
  { title: AppStrings.Leave, value: AttrValues.Leave },
];
