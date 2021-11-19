import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClone } from '@fortawesome/free-solid-svg-icons';
import ActionButton from '../../action-button';

interface BlockDuplicateBtnProps {
  handleClick: () => void;
}

const BlockDuplicateBtn: React.FC<BlockDuplicateBtnProps> = ({
  handleClick
}) => {
  return (
    <div className="block-duplicate-btn">
      <ActionButton
        onClick={handleClick}
        IconComponent={<FontAwesomeIcon className="text-gray-500" icon={faClone} />}
      >
        복제하기
      </ActionButton>
    </div>
  );
}

export default BlockDuplicateBtn;