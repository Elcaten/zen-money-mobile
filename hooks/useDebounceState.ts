import {useState} from 'react';
import {useDebounce} from './useDebounce';

export const useDebounceState = <T>(initialState: T, delay = 120): [T, React.Dispatch<React.SetStateAction<T>>, T] => {
  const [state, setState] = useState<T>(initialState);
  const debouncedState = useDebounce(state, delay);
  return [debouncedState, setState, state];
};
