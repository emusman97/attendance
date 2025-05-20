import { AppStrings, AttrValues } from '../../constants';
import type { SelectItems } from '../../types';

export const AttributeItems: SelectItems = [
  { title: AppStrings.status, value: AttrValues.Status },
  { title: AppStrings.present, value: AttrValues.Present },
  { title: AppStrings.absent, value: AttrValues.Absent },
  { title: AppStrings.leave, value: AttrValues.Leave },
];
