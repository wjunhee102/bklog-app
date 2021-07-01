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

function useBlockBase(blockData: BlockData, hooks: UseBlockType, parentInfo?: ParentInfoType) {
  const {
    state,
    initBlock,
    onSwitchBlock,
    isCliping,
    isHoldingDown,
    isGrab,
    tempClipData,
    onChangeEditingId,
    onChangeEditorState,
    onChangeTargetPosition,
    onSetTempClip,
    onClearTempClip
  } = hooks;

  const [ isHover, setHover ]   = useState<boolean>(false);
  const [ selected, setSelect ] = useState<boolean>(false);
  const [ down, setDown ]       = useState<boolean>(false);
  const [ right, setRight ]     = useState<boolean>(false);

  const parentSelected = parentInfo? parentInfo.selected : false;

  const childrenBlockData = useMemo(() => initBlock.hasOwnProperty(blockData.id)? 
    initBlock[blockData.id] : null, [initBlock]); 

  const downPosition = useMemo(() => 
    calculatrionPosition(blockData.position, parentInfo && parentInfo.type === "container"? "child" : "next"), 
  [blockData.position]);

  const rightPosition = useMemo(() => 
    calculatrionPosition(blockData.position, parentInfo && parentInfo.type === "container"? "next" : "child"), 
  [blockData.position]);

  const handleSelectMouseEnter = useCallback((
    position: string, 
    set: React.Dispatch<React.SetStateAction<boolean>>
  ) => () => {
    if(isGrab && !selected && !parentSelected) {
      set(true);
      onChangeTargetPosition(position);
    }
  }, [tempClipData, isCliping, isGrab]);

  const handleSelectMouseLeave = useCallback((set: React.Dispatch<React.SetStateAction<boolean>>) => () => {
    set(false);
  }, []);

  const handleSelectMouseUp = useCallback((container?: boolean) => () => {
    if(tempClipData[0] !== undefined) onSwitchBlock(tempClipData.map(index => state.blockList[index].id), container);
  }, [tempClipData, isGrab]);

  const handleGrabMouseDown = useCallback(() => {
    onChangeEditorState({ isGrab: true });
    onChangeEditingId(null);
    if(!isCliping) {
      if(childrenBlockData) {
        onSetTempClip([blockData.index, ...childrenBlockData.map(child => child.index)]);
      } else {
        onSetTempClip([blockData.index]);
      } 
    }
  }, [isCliping, childrenBlockData, blockData.index]);

  const handleContentsHover = useCallback(() => {
    if(!isGrab) setHover(true);
  }, [isGrab]);

  const handleContentsBlur = useCallback(() => {
    setHover(false);
  }, []);

  const handleContentsMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  useEffect(() => {
    if(!isGrab && (down || right)) {
      setDown(false);
      setRight(false);
      setSelect(false);
      if(!isCliping) onClearTempClip();
    }
  }, [isGrab]);

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

  return {
    parentSelected,
    isHover,
    setHover,
    selected,
    setSelect,
    down,
    setDown,
    setRight,
    childrenBlockData,
    downPosition,
    rightPosition,
    handleSelectMouseEnter,
    handleSelectMouseLeave,
    handleSelectMouseUp,
    handleGrabMouseDown,
    handleContentsHover,
    handleContentsMouseLeave,
    handleContentsBlur
  }
}

export type UseBlockBaseType = ReturnType<typeof useBlockBase>;

export default useBlockBase;