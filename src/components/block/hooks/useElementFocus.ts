import { useCallback } from 'react';

function useElementFocus<T = HTMLElement>(element: T) {
  
  const handleElementFocus = useCallback(() => {
    if(element instanceof HTMLElement) {
      element.focus();
    }
  }, [element]);
  
  return {
    handleElementFocus
  }
}

export default useElementFocus;