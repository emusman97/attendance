import { useSelector } from 'react-redux';
import { selectUserRole } from '../selectors';

export const useUserRole = () => useSelector(selectUserRole);
