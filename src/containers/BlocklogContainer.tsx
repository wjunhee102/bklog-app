import React from 'react';
import useBKlog from '../hooks/useBKlog';
import Block from '../components/bklog/Block';

function BKlogContainer() {  
  const { state, onAddBlock } = useBKlog();

  const click = () => {
    onAddBlock();
  }
  const blockData:any = state.blocks? state.blocks.map( (block:any) => {
    return {
      id: block.id,
      parentId: block.parentId,
      preId: block.preBlockId,
      nextId: block.nextBlockId,
      type: block.property.type,
      style: [],
      contents: block.property.contents,
      children: block.children
    }
  }) : null;

  return (
    <div className="blocklog">
      {
        blockData?
        blockData.map((block:any)=> 
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