import { useMemo } from "react";
import { keyboardActionHandler, KeyboardActionTable } from "../utils";

interface UseKeyboardActionProps {
  keyUp?: KeyboardActionTable;
  keyPress?: KeyboardActionTable;
  keyDown?: KeyboardActionTable;
}

function useKeyboardActionHandler(props: UseKeyboardActionProps, dependency: any[]) {
  return useMemo(() => {
    const {
      keyUp,
      keyDown,
      keyPress
    } = props;

    return {
      handleKeyUp: keyUp? keyboardActionHandler(keyUp) : undefined,
      handleKeyDown: keyDown? keyboardActionHandler(keyDown) : undefined,
      handleKeyPress: keyPress? keyboardActionHandler(keyPress) : undefined
    }
  }, dependency);
}

export default useKeyboardActionHandler;