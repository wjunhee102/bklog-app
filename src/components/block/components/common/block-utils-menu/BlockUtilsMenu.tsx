import React from 'react';
import { BlockType, UnionBlock } from '../../../entities/block/type';
import { UseBlockType } from '../../../hooks/useBlock';
import { BlockService } from '../../../service/block/BlockService';
import BlockUtilsMenuArticle from './BlockUtilsMenuArticle';

interface BlockUtilsMenuProps {
  className?: string;
  block: UnionBlock;
  useBlockReducer: UseBlockType;
  setToggle: React.Dispatch<React.SetStateAction<boolean>>;
}

const BlockUtilsMenu: React.FC<BlockUtilsMenuProps> = ({
  className,
  block,
  useBlockReducer,
  setToggle
}) => {
  const {
    onDeleteBlock,
    onAddBlock,
    onChangeBlockType
  } = useBlockReducer;

  const handleDelete = () => {
    onDeleteBlock([block], block.index !== 0? block.index - 1 : 0);
    setToggle(false);
  }

  const handleDuplicate = () => {
    const newBlock = BlockService.copyBlockList([block])[0];

    if(!newBlock) return false;

    onAddBlock([newBlock], block.id, true, true, newBlock.id);

    setToggle(false);
  }

  const handleTurnInto = (value: string) => {
    onChangeBlockType(block.id, value as BlockType);
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