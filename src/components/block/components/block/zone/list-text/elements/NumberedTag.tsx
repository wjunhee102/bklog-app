import React, { useEffect } from 'react';
import { NumberedBlock } from '../../../../../entities/block/text/NumberedBlock';
import { ListTagProps } from './ListTag';

function getFrontPosition(position: string): string {
  const positionArg = position.split('-');
  const index = positionArg.length - 1;
  const lastPosition = +positionArg[index];

  if(lastPosition < 2) return "null";

  positionArg[index] = `${lastPosition - 1}`;    

  return positionArg.join('-');
}


const NumberedTag: React.FC<ListTagProps<NumberedBlock>> = ({
  block,
  useBlockReducer,
  parentTagType
}) => {
  
  const {
    state: {
      blockList
    }
  } = useBlockReducer;

  useEffect(() => {
    const inFrontOfBlock = blockList[block.index - 1];

    if(inFrontOfBlock
      && inFrontOfBlock instanceof NumberedBlock 
      && inFrontOfBlock.id === block.previousId
      && inFrontOfBlock.meta?.order
    ) {
      block.setOrder(inFrontOfBlock.meta.order + 1);

      return;
    }

    block.setOrder(1);
  }, [blockList[block.index - 1]?.meta]);

  return (
    <div className={`list-tag ${block.styleType}`}>
      {block.meta.order? block.meta.order : ""}.
    </div>
  );
}

export default NumberedTag;