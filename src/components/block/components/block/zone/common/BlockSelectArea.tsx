import React, { Dispatch, SetStateAction, useCallback, useMemo, useEffect } from 'react';
import classNames from "classnames";
import DropAreaComponent from './DropAreaComponent';
import { BlockProps, ParentInfoType } from '../../Block';

function createDropDirection(id: string, direction: string) {
  return `${direction}-${id}`;
}

const convertArg = (arg: any[]): string => {
  if(arg.length === 1) return `${arg[0]}`;
  return arg.reduce((acc, cur) =>  !acc? `${cur}` : `${acc}-${cur}`);
}

function calculartionPosition(
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

interface DropData {
  position: string;
  direction: string;
}

interface BlockSelectAreaProps extends BlockProps {
  parentInfo?: ParentInfoType;
  selected: boolean;
  setSelect: Dispatch<SetStateAction<boolean>>;
}

const BlockSelectArea: React.FC<BlockSelectAreaProps> = ({
  blockData, 
  useBlockReducer, 
  parentInfo,
  selected,
  setSelect
}) => {
  
  const {
    currentDropDirection,
    setDropDirection,
    state: {
      blockList,
      isGrab,
      isCliping,
      tempClipData
    },
    onChangeTargetPosition,
    onSwitchBlock,
    onClearStateItem
  } = useBlockReducer;

  const parentSelected = parentInfo? parentInfo.selected : false;

  const dropDataList: DropData[] = useMemo(() => [
    {
      position: calculartionPosition(blockData.position, parentInfo && parentInfo.type === "container"? "next" : "child"),
      direction: "right"
    },
    {
      position: calculartionPosition(blockData.position, parentInfo && parentInfo.type === "container"? "child" : "next"),
      direction: "down"
    }
  ], [blockData.position]);

  const handleSelectMouseEnter = useCallback((
    position: string, 
    direction: string
  ) => () => {
    if(isGrab && !selected && !parentSelected) {
      setDropDirection(direction);
      onChangeTargetPosition(position);
    }
  }, [tempClipData, isGrab]);

  const handleSelectMouseLeave = useCallback(() => {
    setDropDirection(null);
  }, []);

  const handleSelectMouseUp = useCallback((createContainer?: boolean) => () => {
    if(tempClipData[0] !== undefined) onSwitchBlock(tempClipData.map(index => blockList[index].id), createContainer);
    setDropDirection(null);
  }, [tempClipData]);

  useEffect(() => {
    if(!isGrab && currentDropDirection) {
      setDropDirection(null);
      setSelect(false);
      if(!isCliping) onClearStateItem('tempClipData');
    }
  }, [isGrab]);

  return (
    <div className={classNames(
      "block-select-area",
      { "selected": isGrab }
    )}>
      <div className="select-area-container">

      {
        dropDataList.map(({ position, direction }, idx) => (
          <DropAreaComponent
            key={idx}
            on={currentDropDirection === createDropDirection(blockData.id, direction)}
            dropDirection={direction}
            onMouseEnter={handleSelectMouseEnter(position, createDropDirection(blockData.id, direction))}
            onMouseLeave={handleSelectMouseLeave}
            onMouseUp={handleSelectMouseUp()}
          />
        ))
      }        

      </div>
    </div>
  );
}

export default BlockSelectArea;