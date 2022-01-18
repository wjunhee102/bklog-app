import React from 'react';
import { KeyboardActionTable } from '.';
import { setSelectionRange } from './selectionText';

/**
 * startAction에서 true가 리턴되면 함수 종료
 * @param actionTable 
 */
function keyboardActionHandler(actionTable: KeyboardActionTable) {
  return (e: React.KeyboardEvent<any>) => {
    if(actionTable.startAction) {
      if(actionTable.startAction(e)) return;
    }
      
    if(actionTable.hasOwnProperty(e.key)) {
      actionTable[e.key](e);
    } else {
      if(actionTable.defaultAction) actionTable.defaultAction(e);
    }

    if(actionTable.finallyAction) actionTable.finallyAction(e);
  }
} 

function setCursorPoint<T = HTMLDivElement>(element: T, start: number, end: number) {
  if(element instanceof HTMLElement) {
    setSelectionRange(element, start, end);
  }
}

export default {
  keyboardActionHandler,
  setCursorPoint
}