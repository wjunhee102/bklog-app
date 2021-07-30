import React, { useState } from "react";

type SetFunction = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;

type HandleFunction = (callback?: Function) => SetFunction

export type UseChangeType = [string, HandleFunction];;

function useChange(defaultValue: string): UseChangeType {
  const [ value, setValue ] = useState<string>(defaultValue);

  const handleValue: HandleFunction= (callback?: Function) => (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    setValue(e.target.value);
    if(callback) callback(e.target.value);
  }

  return [ value, handleValue ];
}

export default useChange;