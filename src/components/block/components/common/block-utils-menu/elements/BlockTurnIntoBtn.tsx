import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExchangeAlt, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import ActionButton from '../../action-button';
import BlockTurnIntoMenu from '../../block-turn-into/BlockTurnIntoMenu';

interface BlockTurnIntoBtnProps {
  handleClick: (value: string) => void;
}

const BlockTurnIntoBtn: React.FC<BlockTurnIntoBtnProps> = ({
  handleClick
}) => {
  return (
    <div className="block-turninto-btn-box">
      <div className="block-turninto-btn">
        <ActionButton
          IconComponent={<FontAwesomeIcon className="text-gray-500" icon={faExchangeAlt as any} />}
        > 
          <div className="title-box">
            <div> 변경하기 </div> 
            <div>
              <FontAwesomeIcon className="text-gray-400" icon={faCaretRight as any} />
            </div>
          </div>
        </ActionButton>
      </div>

      <BlockTurnIntoMenu handleClick={handleClick} />
      
    </div>
  );
}

export default BlockTurnIntoBtn;