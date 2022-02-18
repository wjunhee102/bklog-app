import { useEffect, useMemo, useState } from "react";
import { ParentInfoType } from "../../BlockComponent";
import { UseBlockType } from "../../../../hooks/useBlock";
import { UnionBlock } from "../../../../entities/block/type";

function useBlockBase(block: UnionBlock, useBlockReducer: UseBlockType, parentInfo?: ParentInfoType) {
  
  const {
    state: {
      isGrab,
      updatedBlockIdList,
      tempClipData
    },
    initBlock,
    onSetTempClip
  } = useBlockReducer;

  const [ selected, setSelect ]       = useState<boolean>(false);
  const [ updated, setUpdated ]       = useState<boolean>(false);

  const parentSelected = parentInfo? parentInfo.selected : false;

  const childrenBlock = useMemo(() => initBlock && initBlock.hasOwnProperty(block.id)? 
    initBlock[block.id] : null, [initBlock]); 

  useEffect(() => {
    if(tempClipData.includes(block.index)) {
      setSelect(true);
    } else {
      setSelect(false);
    }
  }, [tempClipData]);

  useEffect(() => {
    if(parentSelected && childrenBlock) {
      onSetTempClip(childrenBlock.map(child => child.index));
    }
  }, [parentSelected]);

  useEffect(() => {
    if(updatedBlockIdList[0]) {
      setUpdated(updatedBlockIdList.includes(block.id));
    } else {
      setUpdated(false);
    }
  }, [updatedBlockIdList]);

  return {
    isGrab,
    parentSelected,
    selected,
    setSelect,
    updated,
    childrenBlock,
  }
}

export type UseBlockBaseType = ReturnType<typeof useBlockBase>;

export default useBlockBase;