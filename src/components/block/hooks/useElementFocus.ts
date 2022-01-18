import { useCallback } from 'react';

function handleFocus<T = HTMLElement>(element: T | null) {
  if(element instanceof HTMLElement) {
    element.focus();
  }
}

function useElementFocus<T = HTMLElement>(element: T) {

  const handleElementFocus = useCallback(() => {
    handleFocus(element);
  }, [element]);
  
  return {
    handleFocus,
    handleElementFocus
  }
}

export default useElementFocus;