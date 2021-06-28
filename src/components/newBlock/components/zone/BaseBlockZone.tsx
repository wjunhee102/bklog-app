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
    selected,
    setSelect,
    down, 
    setDown,
    childrenBlockData,
    downPosition,
    rightPosition,
    handleMouseEnter,
    handleMouseLeave,
    handleMouseUp,
    handleMouseDown
  } = useBlockBase(blockData, hooks, parentInfo);

  return (
    <div 
      data-index={blockData.index} 
      className="block-zone"
    >
      {
        /**
         * block-utils
         */
      }
      <div className="block-utils">
        <div className="block-add-button">
          <FontAwesomeIcon icon={faPlus} />
        </div>
        <div 
          className="block-type-change-button"
          onMouseDown={handleMouseDown}
        >
          <FontAwesomeIcon icon={faGripVertical} />
        </div>
      </div>

      { children(selected, setSelect) }
      
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
      <div className="block-cover">

        <div className="left">
          <div className="box"></div>
        </div>

        <div 
          className={classNames("down", {"on": down})}
          onMouseEnter={handleMouseEnter(downPosition, setDown)}
          onMouseLeave={handleMouseLeave(setDown)}
          onMouseUp={handleMouseUp()}
        >
          <div className="box"></div>
        </div>
        
      </div>
    </div>
  )
}

export default BaseBlockZone;