import { useSelector } from 'react-redux';
import type { UserId } from '../../models';
import { selectUserById } from '../selectors';

export const useSelectUserById = (userId: UserId) =>
  useSelector(selectUserById(userId));
