import { useCallback, useState, type SetStateAction } from 'react';

export function useBooleanState(defaultValue = false) {
  const [booleanValue, setBooleanValue] = useState(defaultValue);

  const setTrue = useCallback(() => {
    setBooleanValue(true);
  }, []);
  const setFalse = useCallback(() => {
    setBooleanValue(false);
  }, []);
  const setValue = useCallback((valueOrSetter: SetStateAction<boolean>) => {
    setBooleanValue(valueOrSetter);
  }, []);

  return [booleanValue, setTrue, setFalse, setValue] as const;
}
