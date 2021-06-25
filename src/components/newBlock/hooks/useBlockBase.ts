import { useEffect, useMemo, useRef, useState } from "react";
import { BlockData } from "../types";
import { UseBlockType } from "./useBlock";

function useBlockBase(blockData: BlockData, hooks: UseBlockType) {
  const [ selected, setSelect ] = useState<boolean>(false);

  const blockRef = useRef<HTMLDivElement>(null);

  const {
    initBlock,
    onDeleteBlock,
    onChangeEditingId,
    editingBlockId,
    deleting,
    setDeleting
  } = hooks;

  const childrenBlockData = useMemo(() => initBlock.hasOwnProperty(blockData.id)? 
    initBlock[blockData.id] : null, [initBlock]); 

  const handleKeyDown = (e: any) => {
    if(e.key === "Backspace" && deleting) {
      e.preventDefault();
      onDeleteBlock([blockData]);
      if(blockData.index > 1) onChangeEditingId(blockData.index - 1);
    }
  }

  const handleKeyUp = (e: any) => {
    setDeleting(false);
  }

  const handleFocus = (element: any) => {
    element.focus();
  }

  useEffect(() => {
    if(deleting) {
      if(editingBlockId === blockData.id) {
        if(blockRef.current) {
          handleFocus(blockRef.current);
        }
      }
    }
  }, [editingBlockId]);

  return {
    selected,
    setSelect,
    childrenBlockData,
    handleKeyDown,
    handleKeyUp,
    blockRef
  }
}

export type UseBlockBaseType = ReturnType<typeof useBlockBase>;

export default useBlockBase;