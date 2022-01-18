import { useCallback, useMemo } from "react";
import { checkInstanceOfHTMLElement } from "../utils";
import { getSelectionEnd, getSelectionStart, setSelectionRange } from "../utils/selectionText";

interface UseMoveCurSorPointProps<T extends HTMLElement = HTMLDivElement> {
  element: T;
  setCursorStart: (point: number) => void;
  setCursorEnd: (point: number) => void;
  cursorStart: number;
  cursorEnd?: number;
}

function useCursorPointHandler<T extends HTMLElement = HTMLDivElement>({
  element,
  setCursorStart,
  setCursorEnd,
  cursorStart,
  cursorEnd
}: UseMoveCurSorPointProps<T>) {

  const cursorHandlers = useMemo(() => ({
    handleSetCursorPoint: () => {
      if(checkInstanceOfHTMLElement(element)) {
        const getStartPosition = getSelectionStart(element);
        const getEndPosition = getSelectionEnd(element);
        setCursorStart(getStartPosition);
        setCursorEnd(getEndPosition);
      }
    },
    handleMoveToWantPoint: (start: number, end: number) => {
      if(checkInstanceOfHTMLElement(element)) {
        setSelectionRange(element, start, end);
      }
    },
    handleMoveToEndPoint: () => {
      if(checkInstanceOfHTMLElement(element)) {
        const length = element.innerText.length;
        setSelectionRange(element, length, length);
        setCursorStart(length);
        setCursorEnd(length);
      }
    }
  }), [element]);

  const handleRefreshCursorPoint = useCallback(() => {
    if(checkInstanceOfHTMLElement(element)) {
      setSelectionRange(element, cursorStart, cursorEnd? cursorEnd : cursorStart);
    }
  }, [element, cursorStart, cursorEnd]);

  return {
    ...cursorHandlers,
    handleRefreshCursorPoint
  }
}

export default useCursorPointHandler;