import { useSelector } from 'react-redux';
import { selectUserState } from '../selectors';

export const useUserState = () => useSelector(selectUserState);
