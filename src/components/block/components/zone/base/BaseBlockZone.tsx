import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import useBlockBase from "../../../hooks/useBlockBase";
import { BlockProps, ParentInfoType } from "../../Block";
import ChildrenBlock from "../../ChildrenBlock";
import classNames from "classnames";
import BlockUtilsMenu from "../../block-utils-menu";

interface BaseBlockZoneProps extends BlockProps {
  children: (
    selected: boolean, 
    setSelect: React.Dispatch<React.SetStateAction<boolean>>
  ) => React.ReactNode;
  parentInfo?: ParentInfoType | undefined;
}

const BaseBlockZone: React.FC<BaseBlockZoneProps> = ({ 
  blockData, useBlockReducer, parentInfo, children 
}) => {
  const {
    parentSelected,
    isHover,
    selected,
    setSelect,
    down, 
    setDown,
    utilToggle,
    setUtilToggle,
    childrenBlockData,
    downPosition,
    rightPosition,
    handleSelectMouseEnter,
    handleSelectMouseLeave,
    handleSelectMouseUp,
    handleGrabMouseDown,
    handleContentsBlur,
    handleContentsHover,
    handleContentsMouseLeave,
    handleAddBlock
  } = useBlockBase(blockData, useBlockReducer, parentInfo);

  return (
    <div 
      className={classNames(
        "block-zone",
        { selected: parentSelected? false : selected }
      )}
    >
      {/*block-utils */}
      <div 
        className="contents-area"
        onMouseOver={handleContentsHover}
        onMouseLeave={handleContentsMouseLeave}
      >

        <div className="block-utils">

          <div className="block-add-button-box">

            <button 
              className="block-add-button"
              onClick={handleAddBlock}
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>

          </div>
          
          <div className="block-type-change-button-box">

            <button
              className="block-type-change-button"
              onClick={() => setUtilToggle(!utilToggle)}
              onMouseDown={handleGrabMouseDown}
            >
              <FontAwesomeIcon icon={faGripVertical} />
            </button>

            {
              utilToggle? 
              <BlockUtilsMenu 
                useBlockReducer={useBlockReducer}
                blockData={blockData}
                setToggle={setUtilToggle}
              />
              : null
            }

          </div>
          
        </div>

        { children(selected, setSelect) }

      </div>
      
      <ChildrenBlock 
        childrenBlockData={childrenBlockData} 
        useBlockReducer={useBlockReducer} 
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
        { selected:  useBlockReducer.isGrab }
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