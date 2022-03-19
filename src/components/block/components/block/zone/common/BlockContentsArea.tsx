import React, { useCallback, useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGripVertical, faPlus } from '@fortawesome/free-solid-svg-icons';
import { BlockComponentProps } from '../../BlockComponent';
import BlockUtilsMenu from '../../../common/block-utils-menu';
import { UnionBlock } from '../../../../entities/block/type';
import { TextBlock } from '../../../../entities/block/text/TextBlock';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

interface BlockContentsAreaProps extends BlockComponentProps {
  childrenBlock: UnionBlock[] | null;
}

const BlockContentsArea: React.FC<BlockContentsAreaProps> = ({
  block, useBlockReducer, childrenBlock, children
}) => {

  const {
    state: {
      editable,
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
    if(editable && !isGrab) setHover(true);
  }, [isGrab]);

  const handleContentsMouseLeave = useCallback(() => {
    setHover(false);
  }, []);

  const handleAddBlock = useCallback(() => {
    const newBlockData = TextBlock.createBlockData({ previousId: block.id });

    if(!newBlockData) return false;

    const newBlock = new TextBlock(newBlockData);

    onAddBlock([ newBlock ], block.id, true, true, newBlockData.id);
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


        {
          editable?
          (
            <>
              <div className="block-add-button-box">

              <button 
                className="block-add-button"
                onClick={handleAddBlock}
              >
                <FontAwesomeIcon icon={faPlus as IconProp} />
              </button> 

              </div>

              <div className="block-type-change-button-box">

                <button
                  className="block-type-change-button"
                  onClick={() => setUtilToggle(!utilToggle)}
                  onMouseDown={handleGrabMouseDown}
                >
                  <FontAwesomeIcon icon={faGripVertical as IconProp} />
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
            </>
          ) : null
        }

      </div>

      { children }

    </div>
  );
}

export default BlockContentsArea;

