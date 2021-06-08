import React, { useEffect, useState } from 'react';
import { testDB } from './db';
import useBlock from './hooks/useBlock';
import { orderingBlock, sortBlock } from './reducer/utils/ordering';
import { BlockData } from './types';
import BlockElement from './BlockEle';
import './block.scss';
import { resetToTargetPosition } from './reducer/utils';
import blockTest from './block.test';

const Block: React.FC = () => {

  const hooks = useBlock();

  const {
    initBlock
  } = hooks;

  useEffect(() => {
    const data = orderingBlock(sortBlock(testDB));
    const data2 = sortBlock(testDB);
    const data3 = data.blockDataList.slice(10, 26);
    console.log(data, data2);
    console.log("initBlock", initBlock);
    console.log(data3);
    console.log(resetToTargetPosition(data3, "4"));
    console.log(orderingBlock(resetToTargetPosition(data.blockDataList, "4")));
    blockTest();
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