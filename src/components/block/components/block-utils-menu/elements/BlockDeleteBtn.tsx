import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import ActionButton from '../../action-button';

interface BlockDeleteBtnProps {
  handleClick: () => void;
}

const BlockDeleteBtn: React.FC<BlockDeleteBtnProps> = ({
  handleClick
}) => {
  return (
    <div className="block-delete-btn">
      <ActionButton
        IconComponent={<FontAwesomeIcon className="text-gray-500" icon={faTrashAlt} />}
        onClick={handleClick}
      >
        삭제하기
      </ActionButton>
    </div>
  );
}

export default BlockDeleteBtn;