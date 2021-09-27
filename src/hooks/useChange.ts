import React, { useState } from 'react';

export type UseChangeType = [string, (callback?: any) => (e: React.ChangeEvent<HTMLInputElement>) => void, boolean, (P: boolean)=> void];

function useChange(defaultValue: string): UseChangeType {
  const [ value, setValue ] = useState<string>(defaultValue);
  const [ error, setError ] = useState<boolean>(false);

  const handleValue = (callback?: any) => (e: React.ChangeEvent<HTMLInputElement>) => {
    if(error) {
      setError(false);
    }
    
    setValue(e.target.value);
    if(callback) callback(e.target.value);
  }

  const handleError = (data: boolean) => {
    setError(data);
  }

  return [ value, handleValue, error, handleError ];
}

export default useChange;