import React, { useCallback, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BlockProps } from '../../Block';
import BlockUtilsMenu from '../../../common/block-utils-menu';
import { BlockData } from '../../../../types';
import { createBlockData } from '../../../../reducer/utils';

interface BlockContentsAreaProps extends BlockProps {
  childrenBlockData: BlockData<any, any>[];
}

const BlockContentsArea: React.FC<BlockContentsAreaProps> = ({
  blockData, useBlockReducer, childrenBlockData, children
}) => {

  const {
    state: {
      isCliping,
      isGrab
    },
    onChangeEditorState,
    onChangeEditingId,
    onSetTempClip,
    onAddBlock
  } = useBlockReducer;

  const [ utilToggle, setUtilToggle ] = useState<boolean>(false);
  const [ isHover, setHover ]         = useState<boolean>(false);

  const handleContentsHover = useCallback(() => {
    if(!isGrab) setHover(true);
  }, [isGrab]);

  const handleContentsMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleAddBlock = useCallback(() => {
    const { position } = blockData;
    const newBlockData = createBlockData({ position });
    onAddBlock([ newBlockData ], position, true, newBlockData.id);
  }, [blockData]);

  const handleGrabMouseDown = useCallback(() => {
    onChangeEditorState('isGrab', true);
    onChangeEditingId(null);

    if(!isCliping) {
      if(childrenBlockData) {
        onSetTempClip([blockData.index, ...childrenBlockData.map(child => child.index)]);
      } else {
        onSetTempClip([blockData.index]);
      }
    }
  }, [isCliping, childrenBlockData, blockData.index]);

  useEffect(() => {
    if(!isHover) setUtilToggle(false);
  }, [isHover]);

  return (
    <div 
      className="block-contents-area"
      onMouseOver={handleContentsHover}
      onMouseLeave={handleContentsMouseLeave}
    >

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

      { children }

    </div>
  );
}

export default BlockContentsArea;

