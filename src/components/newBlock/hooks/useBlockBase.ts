import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ParentInfoType } from "../components/Block";
import { BlockData } from "../types";
import { UseBlockType } from "./useBlock";

const convertArg = (arg: any[]): string => {
  if(arg.length === 1) return `${arg[0]}`;
  return arg.reduce((acc, cur) =>  !acc? `${cur}` : `${acc}-${cur}`);
}

function calculatrionPosition(
  position: string, 
  command: "next" | "child" 
) {
  switch (command) {
    case "child":
      const currentPosition = position.split(/-/);
      currentPosition.push("1");
      return convertArg(currentPosition);
    case "next":
      return position;
    default:
      return position;
  }
}

function findChildrenIndexList(childrenIdList: string[], blockDataList: BlockData[]): [string, number][] | undefined {
  const childrenList: [string, number][] = blockDataList.filter(block => childrenIdList.includes(block.parentId)).map(block => [block.id, block.index]);

  if(childrenIdList[0]) {
    findChildrenIndexList(childrenList.map(child => child[0]), blockDataList)
  }

  return childrenList;
}

function useBlockBase(blockData: BlockData, hooks: UseBlockType, parentInfo?: ParentInfoType) {
  const {
    state,
    initBlock,
    onSwitchBlock,
    cliping,
    holdingDown,
    graping,
    tempClipData,
    onChangeEditorState,
    onChangeTargetPosition,
    onSetTempClip,
    onClearTempClip
  } = hooks;

  const [ selected, setSelect ] = useState<boolean>(false);
  const [ down, setDown ] = useState<boolean>(false);
  const [ right, setRight ] = useState<boolean>(false);

  const childrenBlockData = useMemo(() => initBlock.hasOwnProperty(blockData.id)? 
    initBlock[blockData.id] : null, [initBlock]); 

  const downPosition = useMemo(() => 
    calculatrionPosition(blockData.position, parentInfo && parentInfo.type === "container"? "child" : "next"), 
  [blockData.position]);

  const rightPosition = useMemo(() => 
    calculatrionPosition(blockData.position, parentInfo && parentInfo.type === "container"? "next" : "child"), 
  [blockData.position]);

  const handleMouseEnter = useCallback((
    position: string, 
    set: React.Dispatch<React.SetStateAction<boolean>>
  ) => () => {
    if(graping) {
      set(true);
      onChangeTargetPosition(position);
    }
  }, [tempClipData, cliping, graping]);

  const handleMouseLeave = useCallback((set: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    console.log("mouseLeave");
    set(false);
  }, []);

  const handleMouseUp = useCallback((container?: boolean) => () => {
    onSwitchBlock(tempClipData.map(index => state.blockList[index].id, container))
    onChangeEditorState({ graping: false });
    if(!cliping) {
      onClearTempClip();
    } 
  }, [onSwitchBlock, tempClipData]);

  const handleMouseDown = () => {
    onChangeEditorState({ graping: true });
    setSelect(true);
    if(!tempClipData[0]) {
      if(childrenBlockData) {
        onSetTempClip([blockData.index, ...childrenBlockData.map(child => child.index)]);
      } else {
        onSetTempClip([blockData.index]);
      }
    } ;
  }

  useEffect(() => {
    if(!graping && (down || right)) {
      setDown(false);
      setRight(false);
      setSelect(false);
    }
  }, [graping]);

  useEffect(() => {
    console.log(parentInfo);
    if(parentInfo && parentInfo.selected && childrenBlockData) {
      console.log("aaaa");
      onSetTempClip(childrenBlockData.map(child => child.index));
    }
  }, [cliping, graping, holdingDown]);

  return {
    selected,
    setSelect,
    down,
    setDown,
    setRight,
    childrenBlockData,
    downPosition,
    rightPosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseUp,
    handleMouseDown
  }
}

export type UseBlockBaseType = ReturnType<typeof useBlockBase>;

export default useBlockBase;