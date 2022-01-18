import { useMemo } from "react";
import { keyboardActionHandler, KeyboardActionTable } from "../utils";

function useKeyboardActionHandler(actionTable: KeyboardActionTable, dependency: any[]) {
  return useMemo(() => keyboardActionHandler(actionTable), [dependency]);
}

export default useKeyboardActionHandler;