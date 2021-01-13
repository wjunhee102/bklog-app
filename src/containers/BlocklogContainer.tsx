import React from 'react';
import useBKlog from '../hooks/useBKlog';
import Block from '../components/bklog/Block';

import { BlockData } from '../types/bklog';

function BKlogContainer() {  
  const { state, initBlock, onAddBlock } = useBKlog();

  const click = () => {
    onAddBlock();
  }
  console.log(initBlock);
  const blockData:any = initBlock[0]? initBlock : null;

  return (
    <div className="blocklog">
      {
        blockData?
        blockData.map((block: BlockData)=> 
          <Block 
            blockData={block}
            key={block.id}
          />
        ) : <div>""</div>
      }
      <button onClick={click}>블럭 추가</button>
    </div>
  )
}

export default BKlogContainer;