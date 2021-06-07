import React, { useEffect, useState } from 'react';
import { testDB } from './db';
import useBlock from './hooks/useBlock';
import { orderingBlock, sortBlock } from './reducer/utils/ordering';
import { BlockData, RawBlockData } from './types';
import BlockElement from './BlockEle';
import './block.scss';

const Block: React.FC = () => {

  const hooks = useBlock();

  const {
    initBlock
  } = hooks;

  useEffect(() => {
    const data = orderingBlock(sortBlock(testDB));
    const data2 = sortBlock(testDB);
    console.log(data, data2);
    console.log("initBlock", initBlock);

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