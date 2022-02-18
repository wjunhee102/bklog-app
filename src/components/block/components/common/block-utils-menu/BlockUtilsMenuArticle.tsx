import React from 'react';
import classNames from 'classnames';
import BlockScrollMenu from '../block-scroll-menu';
import './BlockUtilsMenu.scss';
import BlockDeleteBtn from './elements/BlockDeleteBtn';
import BlockDuplicateBtn from './elements/BlockDuplicateBtn';
import BlockTurnIntoBtn from './elements/BlockTurnIntoBtn';

interface BlockUtilsMenuArticleProps {
  className?: string;
  handleDelete: () => void;
  handleDuplicate: () => void;
  handleTurnInto: (value: string) => void;
}

const BlockUtilsMenuArticle: React.FC<BlockUtilsMenuArticleProps> = ({
  className,
  handleDelete,
  handleDuplicate,
  handleTurnInto
}) => {

  return (
    <div className={classNames(
      "block-utils-menu-box",
      { [className as string]: className }
    )}>
      <BlockScrollMenu className="block-utils-menu">
        <BlockDeleteBtn handleClick={handleDelete} />
        <BlockDuplicateBtn handleClick={handleDuplicate} />
        <BlockTurnIntoBtn handleClick={handleTurnInto} />
      </BlockScrollMenu>
    </div>
  );
}

export default BlockUtilsMenuArticle;