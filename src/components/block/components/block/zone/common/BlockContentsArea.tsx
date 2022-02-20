import React, { useCallback, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BlockComponentProps } from '../../BlockComponent';
import BlockUtilsMenu from '../../../common/block-utils-menu';
import { UnionBlock } from '../../../../entities/block/type';
import { TextBlock } from '../../../../entities/block/text/TextBlock';

interface BlockContentsAreaProps extends BlockComponentProps {
  childrenBlock: UnionBlock[] | null;
}

const BlockContentsArea: React.FC<BlockContentsAreaProps> = ({
  block, useBlockReducer, childrenBlock, children
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
    const { position } = block;
    const newBlockData = TextBlock.createBlockData({ position });

    if(!newBlockData) return false;

    const newBlock = new TextBlock(newBlockData);

    onAddBlock([ newBlock ], position, true, newBlockData.id);
  }, [block]);

  const handleGrabMouseDown = useCallback(() => {
    onChangeEditorState('isGrab', true);
    onChangeEditingId();

    if(!isCliping) {
      if(childrenBlock) {
        onSetTempClip([block.index, ...childrenBlock.map(child => child.index)]);
      } else {
        onSetTempClip([block.index]);
      }
    }
  }, [isCliping, childrenBlock, block.index]);

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
              block={block}
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

