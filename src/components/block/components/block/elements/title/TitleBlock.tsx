import React from 'react';
import { BlockProps } from '../../Block';
import TitleBlockEle from './TitleBlockEle';

const TitleBlock: React.FC<BlockProps> = (props) => {
  return (
    <div className="block-zone">
      <div className="block-contents-area">
        <TitleBlockEle {...props} />
      </div>
    </div>
  );
}

export default TitleBlock;