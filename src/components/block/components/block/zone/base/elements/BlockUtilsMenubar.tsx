import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BlockProps } from '../../../Block';
import BlockUtilsMenu from '../../../../common/block-utils-menu';

interface BlockUtilsMenubarProps extends BlockProps {
  handleAddBlock: () => void;
  handleGrabMouseDown: () => void;
  utilToggle: boolean;
  setUtilToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockUtilsMenubar: React.FC<BlockUtilsMenubarProps> = ({
  blockData,
  useBlockReducer,
  handleAddBlock,
  handleGrabMouseDown,
  utilToggle,
  setUtilToggle
}) => {
  return (
    <div className="block-utils-menubar">
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
  );
}

export default BlockUtilsMenubar;