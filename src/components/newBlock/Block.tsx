import React, { useEffect, useState } from 'react';
import useBlock from './hooks/useBlock';
import { BlockData } from './types';
import BlockElement from './BlockEle';
import './block.scss';
import { useIdleTimer } from 'react-idle-timer';

const Block: React.FC = () => {
  const hooks = useBlock();
  
  const {
    state,
    stage,
    blockLength,
    initBlock,
    onAddBlock,
    onDeleteBlock,
    onRevertBlock,
    onSwitchBlock,
    onCommitBlock
  } = hooks;

  const handleOnIdle = () => {
    if(state.stage[0]) onCommitBlock();
  }

  const { getLastActiveTime } = useIdleTimer({
    timeout: 10 * 60 * 5,
    onIdle: handleOnIdle,
    debounce: 500
  });

  return (
    <div className="block-editor blockEditor items-center overflow-auto w-full notranslate text-gray-700 bg-white h-full rounded-md shadow-md">
      <div className="cover mb-8"></div>
      <div className="m-auto h-full block-container">
        {
          initBlock?
          initBlock.root.map((block: BlockData, idx: number) =>
            <BlockElement 
              key={idx}
              idx={idx}
              blockData={block}
              hooks={hooks}
            />
          ) : <div></div>
        }
      </div>
    </div>
  )
}

export default Block;