import React from 'react';
import useBKlog from '../hooks/useBKlog';
import Block from '../components/bklog/Block';

import { BlockData } from '../types/bklog';

function BKlogContainer() {  
  const { state, onAddBlock } = useBKlog();

  const click = () => {
    onAddBlock();
  }
  const blockData:any = state.blocks? state.blocks : null;

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