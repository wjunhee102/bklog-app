import React from 'react';
import { updateObject } from '../../../../../store/utils';
import { UseBlockType } from '../../../hooks/useBlock';
import { BlockData, BlockDataProps } from '../../../types';
import { Token } from '../../../utils/token';
import BlockUtilsMenuArticle from './BlockUtilsMenuArticle';

interface BlockUtilsMenuProps {
  className?: string;
  blockData: BlockData;
  useBlockReducer: UseBlockType;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockUtilsMenu: React.FC<BlockUtilsMenuProps> = ({
  className,
  blockData,
  useBlockReducer,
  setToggle
}) => {
  const {
    onDeleteBlock,
    onAddBlock,
    onChangeStyleType
  } = useBlockReducer;

  const handleDelete = () => {
    onDeleteBlock([blockData], blockData.index !== 0? blockData.index - 1 : 0);
    setToggle(false);
  }

  const handleDuplicate = () => {
    const newBlockData = updateObject<BlockData, BlockDataProps>(blockData, {
      id: Token.getUUID()
    });

    onAddBlock([newBlockData], blockData.position, true, newBlockData.id);
    setToggle(false);
  }

  const handleTurnInto = (value: string) => {
    onChangeStyleType(blockData.id, value);
    setToggle(false);
  }

  return <BlockUtilsMenuArticle
    className={className}
    handleDelete={handleDelete}
    handleDuplicate={handleDuplicate}
    handleTurnInto={handleTurnInto}
  />;
}

export default BlockUtilsMenu;