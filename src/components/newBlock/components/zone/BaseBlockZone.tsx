import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import useBlockBase from "../../hooks/useBlockBase";
import { BlockProps, ParentInfoType } from "../Block";
import ChildrenBlock from "../ChildrenBlock";
import classNames from "classnames";

interface BaseBlockZoneProps extends BlockProps {
  children: (
    selected: boolean, 
    setSelect: React.Dispatch<React.SetStateAction<boolean>>
  ) => React.ReactNode;
  parentInfo?: ParentInfoType | undefined;
}

const BaseBlockZone: React.FC<BaseBlockZoneProps> = ({ blockData, hooks, parentInfo, children }) => {
  const {
    parentSelected,
    isHover,
    selected,
    setSelect,
    down, 
    setDown,
    childrenBlockData,
    downPosition,
    rightPosition,
    handleSelectMouseEnter,
    handleSelectMouseLeave,
    handleSelectMouseUp,
    handleGrabMouseDown,
    handleContentsBlur,
    handleContentsHover,
    handleContentsMouseLeave
  } = useBlockBase(blockData, hooks, parentInfo);

  return (
    <div 
      data-index={blockData.index} 
      className={classNames(
        "block-zone",
        { selected: parentSelected? false : selected }
      )}
      draggable={!hooks.isGrab}
    >
      {/*block-utils */}
      <div 
        className="contents-area"
        onMouseOver={handleContentsHover}
        onMouseLeave={handleContentsMouseLeave}
      >

        <div className={classNames(
          "block-utils",
          { on: isHover }
        )}>
          <div className="block-add-button">
            <FontAwesomeIcon icon={faPlus} />
          </div>
          <div 
            className="block-type-change-button"
            onMouseDown={handleGrabMouseDown}
          >
            <FontAwesomeIcon icon={faGripVertical} />
          </div>
        </div>

        { children(selected, setSelect) }

      </div>
      
      <ChildrenBlock 
        childrenBlockData={childrenBlockData} 
        hooks={hooks} 
        parentInfo={{
          type: blockData.type,
          selected
        }} 
      />

      {
        /**
         * block-cover
         */
      }
      <div className={classNames(
        "block-select-area",
        { selected:  hooks.isGrab }
      )}>

        <div className={classNames(
          "area",
          "rigth-drop-area",
          { on: false }
        )}>
          <div className="box"></div>
        </div>

        <div 
          className={classNames(
            "area", 
            "down-drop-area",
            { on: down }
          )}
          onMouseEnter={handleSelectMouseEnter(downPosition, setDown)}
          onMouseLeave={handleSelectMouseLeave(setDown)}
          onMouseUp={handleSelectMouseUp()}
        >
          <div className="box"></div>
        </div>
        
      </div>
    </div>
  )
}

export default BaseBlockZone;