import { useSelector } from 'react-redux';
import { selectUserInfo } from '../selectors';

export const useUserInfo = () => useSelector(selectUserInfo);
