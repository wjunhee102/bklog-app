import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ParentInfoType } from "../../Block";
import { BlockData } from "../../../../types";
import { UseBlockType } from "../../../../hooks/useBlock";

function useBlockBase(blockData: BlockData, useBlockReducer: UseBlockType, parentInfo?: ParentInfoType) {
  
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

  const childrenBlockData = useMemo(() => initBlock.hasOwnProperty(blockData.id)? 
    initBlock[blockData.id] : null, [initBlock]); 

  useEffect(() => {
    if(tempClipData.includes(blockData.index)) {
      setSelect(true);
    } else {
      setSelect(false);
    }
  }, [tempClipData]);

  useEffect(() => {
    if(parentSelected && childrenBlockData) {
      onSetTempClip(childrenBlockData.map(child => child.index));
    }
  }, [parentSelected]);

  useEffect(() => {
    if(updatedBlockIdList[0]) {
      setUpdated(updatedBlockIdList.includes(blockData.id));
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
    childrenBlockData,
  }
}

export type UseBlockBaseType = ReturnType<typeof useBlockBase>;

export default useBlockBase;