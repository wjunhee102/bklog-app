import React from 'react';
import { TitleBlock } from '../../../../entities/block/title/TitleBlock';
import { BlockComponentProps } from '../../BlockComponent';
import TitleBlockEle from './TitleBlockEle';

const TitleBlockComponent: React.FC<BlockComponentProps<TitleBlock>> = (props) => {
  return (
    <div className="block-zone">
      <div className="block-contents-area">
        <TitleBlockEle {...props} />
      </div>
    </div>
  );
}

export default TitleBlockComponent;