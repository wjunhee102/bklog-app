import { UseBlockType } from "../../../../../hooks/useBlock";
import { getSelectionStart, getSelectionEnd, setSelectionRange } from '../../../../../utils/selectionText';
import { BaseProps } from "../../../zone/base/BaseBlockZone";
import useKeyboardActionHandlerAll from "../../../../../hooks/useKeyboardActionHandlerAll";
import { UnionTextBlock } from "../../../../../entities/block/type";
import { BLOCK_BULLETED, BLOCK_NUMBERED } from "../../../../../entities/block/type/types/text";
import useBaseTextBlockUtils from "../../../../../hooks/useBaseTextBlockUtils";

// const BulletList = ['.', '-'];
interface UseTextBlockProps {
  block: UnionTextBlock;
  useBlockReducer: UseBlockType;
  zoneProps: BaseProps;
}

function useTextBlock(props: UseTextBlockProps) {
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
    onDeleteBlock,
    onDeleteTextBlock,
    onDeleleTitleBlock,
    onChangeBlockType,
    onClearStateItem
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
        if((cursorStart && cursorEnd) === 1) {
          onClearStateItem("stagedTextBlockData");
          switch(e.target.innerText[0]) {
            case "1":
              onChangeBlockType(block.index, BLOCK_NUMBERED);
              break;
            case "-":
              onChangeBlockType(block.index, BLOCK_BULLETED);
              break;
          }
          
        } else {
          setCursorEnd(0);
          onEditTextBlock(block.id, block.index, e.target.innerHTML);
          onCommitTextBlock();
        }
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
        console.log("backspace")
        if(cursorStartPoint === 0 && cursorEndPoint === 0) {
          if(!e.target.innerHTML || e.target.innerHTML === "<br>") {
            const nextEditIndex = block.index - 1;
            onDeleteBlock([block], nextEditIndex);
          } else if(block.index !== 0) {
            onDeleteTextBlock(block.index, e.target.innerHTML, e.target.innerText.length);
          } else {
            onDeleleTitleBlock(e.target.innerText);
          }
          
        }
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
  };
}

export type UseTextBlockType = ReturnType<typeof useTextBlock>;

export default useTextBlock;