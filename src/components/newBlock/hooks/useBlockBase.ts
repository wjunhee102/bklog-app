import { useEffect, useMemo, useRef, useState } from "react";
import { BlockData } from "../types";
import { UseBlockType } from "./useBlock";

function useBlockBase(blockData: BlockData, hooks: UseBlockType) {
  const [ selected, setSelect ] = useState<boolean>(false);


  const {
    initBlock
  } = hooks;

  const childrenBlockData = useMemo(() => initBlock.hasOwnProperty(blockData.id)? 
    initBlock[blockData.id] : null, [initBlock]); 

  return {
    selected,
    setSelect,
    childrenBlockData
  }
}

export type UseBlockBaseType = ReturnType<typeof useBlockBase>;

export default useBlockBase;