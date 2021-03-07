import { useState } from 'react';

type UseChangeType<T> = [T, (e: any)=> void, boolean, (P: boolean)=> void];

function useChange<T = string>(defaultValue: T): UseChangeType<T> {
  const [ value, setValue ] = useState<T>(defaultValue);
  const [ error, setError ] = useState<boolean>(false);

  const handleValue = (e:any) => {
    if(error) {
      setError(false);
    }
    setValue(e.target.value);
  }

  const handleError = (data: boolean) => {
    setError(data);
  }

  return [ value, handleValue, error, handleError ];
}

export default useChange;