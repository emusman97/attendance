import { useSelector } from 'react-redux';
import { selectAllUsers } from '../selectors';

export const useSelectAllUsers = () => useSelector(selectAllUsers);
