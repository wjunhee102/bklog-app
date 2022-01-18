import { useCallback } from 'react';

function handleFocus<T extends HTMLElement = HTMLDivElement>(element: T | null) {
  if(element instanceof HTMLElement) {
    element.focus();
  }
}

function useElementFocus<T extends HTMLElement = HTMLDivElement>(element: T) {

  const handleElementFocus = useCallback(() => {
    handleFocus(element);
  }, [element]);
  
  return {
    handleFocus,
    handleElementFocus
  }
}

export default useElementFocus;