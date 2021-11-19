import React from 'react';
import BlockScrollMenu from '../block-scroll-menu';
import BlockScrollMenuArticles from '../block-scroll-menu/BlockScrollMenuArticles';
import BlockTurnIntoBtnList from '../button-list/BlockTurnIntoBtnList';
import './BlockTurnIntoMenu.scss';

const menuList = (handleClick: (value: string) => void) => [
  {
    buttonList: BlockTurnIntoBtnList,
    handleClick
  }
]

interface BlockTurnIntoMenuProps {
  handleClick: (value: string) => void;
}

const BlockTurnIntoMenu: React.FC<BlockTurnIntoMenuProps> = ({
  handleClick
}) => {
  return (
    <BlockScrollMenu className="block-turninto-menu">
      <BlockScrollMenuArticles menuList={menuList(handleClick)} />
    </BlockScrollMenu>
  );
}

export default BlockTurnIntoMenu;