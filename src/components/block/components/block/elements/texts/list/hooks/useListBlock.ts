import { UnionTextBlock } from "../../../../../../entities/block/type";
import { BLOCK_TEXT } from "../../../../../../entities/block/type/types/text";
import useBaseTextBlockUtils from "../../utils/hooks/useBaseTextBlockUtils";
import { UseBlockType } from "../../../../../../hooks/useBlock";
import useKeyboardActionHandlerAll from "../../../../../../hooks/useKeyboardActionHandlerAll";
import { getSelectionEnd, getSelectionStart, setSelectionRange } from "../../../../../../utils/selectionText";
import { BaseProps } from "../../../../zone/base/BaseBlockZone";

interface useListBlockProps {
  block: UnionTextBlock;
  useBlockReducer: UseBlockType;
  zoneProps: BaseProps;
}

function useListBlock(props: useListBlockProps) {
  const { block, useBlockReducer } = props;

  const {
    cursorStart,
    cursorEnd,
    setCursorStart,
    setCursorEnd, 
    onChangeEditingId,
    onEditTextBlock,
    onAddTextBlock,
    onCommitTextBlock,
    onChangeBlockType
  } = useBlockReducer;

  const {
    styleToggle,
    blockContentsRef,
    contentsHTML,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    handleElementFocus,
    editable
  } = useBaseTextBlockUtils(props);

  const {
    handleKeyDown,
    handleKeyPress,
    handleKeyUp
  } = useKeyboardActionHandlerAll({
    keyUp: {
      startAction: (e: any) => {
        if(e.ctrlKey && e.key === "Meta") return true;
      },
      defaultAction: (e: any) => {
        onEditTextBlock(block.id, block.index, e.target.innerHTML);
      },
      finallyAction: (e: any) => {
        setCursorStart(getSelectionStart(e.target));
        setCursorEnd(getSelectionEnd(e.target));
      },
      Enter: (e: any) => {
        e.preventDefault();
      },
      ArrowUp: (e: any) => {
      },
      ArrowDown: (e: any) => {
      },
      Backspace: (e: any) =>{
        if(e.target.innerText.length !== (cursorStart && cursorEnd)) {
          onEditTextBlock(block.id, block.index, e.target.innerHTML);
        } 
      },
      " ": (e: any) => {
        setCursorEnd(0);
        onEditTextBlock(block.id, block.index, e.target.innerHTML);
        onCommitTextBlock();
      }
    },
    keyPress: {
      Enter: (e: any) => {
        if(e.key === "Enter") {
          e.preventDefault();
          onAddTextBlock(
            block.index, 
            e.target.innerHTML, 
            getSelectionStart(e.target), 
            getSelectionEnd(e.target)
          );
        }
      }
    },
    keyDown: {
      Backspace: (e: any) => {
        const cursorStartPoint = getSelectionStart(e.target);
        const cursorEndPoint   = getSelectionEnd(e.target);
        
        setCursorStart(cursorStartPoint);
        setCursorEnd(cursorEndPoint);

        if(cursorStartPoint === 0 && cursorEndPoint === 0) onChangeBlockType(block.index, BLOCK_TEXT);
      },
      ArrowUp: (e: any) => {
        e.preventDefault();
        setCursorStart(0);
        setCursorEnd(0);
        setSelectionRange(e.target, 0, 0);

        if(cursorStart === 0 && cursorEnd === 0) {
          onChangeEditingId(block.index - 1);
        } 
      },
      ArrowDown: (e: any) => {
        e.preventDefault();
        const contentsLength = e.target.innerText.length;
        setCursorStart(contentsLength);
        setCursorEnd(contentsLength);
        setSelectionRange(e.target, contentsLength, contentsLength);

        if((cursorEnd && cursorStart) === e.target.innerText.length) {
          onChangeEditingId(block.index + 1);
        }
      }
    }
  }, [block, cursorStart, cursorEnd]);

  return {
    cursorStart,
    cursorEnd,
    styleToggle,
    blockContentsRef,
    contentsHTML,
    handleKeyUp,
    handleKeyPress,
    handleKeyDown,
    handleClick,
    handleMouseUp,
    handleBlur,
    isFocus,
    handleElementFocus,
    editable
  }
}

export default useListBlock;