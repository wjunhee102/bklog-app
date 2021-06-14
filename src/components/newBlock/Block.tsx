import React, { useEffect, useState } from 'react';
import useBlock from './hooks/useBlock';
import { BlockData } from './types';
import BlockElement from './BlockEle';
import './block.scss';

const Block: React.FC = () => {

  const hooks = useBlock();

  const {
    state,
    initBlock
  } = hooks;

  useEffect(() => {
    console.log("4-1-5".indexOf("5"))
    console.log(state.blockList.filter((block: BlockData) => block.position.indexOf("1-1") === 0));
  }, []);

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