import React from 'react';
import { BlockType } from '../../../../../../entities/block/type';
import { BLOCK_BULLETED, BLOCK_NUMBERED, BLOCK_TEXT, BLOCK_TODO } from '../../../../../../entities/block/type/types/text';
import BlockTurnIntoBtnList from '../../../../../common/button-list/BlockTurnIntoBtnList';
import BlockScrollMenu from '../../../../../common/virtual-scroll/BlockScrollMenu';
import BlockScrollMenuArticles, { ButtonProps } from '../../../../../common/virtual-scroll/BlockScrollMenuAriticles';
import ActionMenuBox from '../common/ActionMenuBox';
import ActionMenuToggle from '../common/ActionMenuToggle';

const BlockTypeTable = {
  [BLOCK_TEXT]     : "텍스트",
  [BLOCK_TODO]     : "체크리스트",
  [BLOCK_BULLETED] : "구분점 목록",
  [BLOCK_NUMBERED] : "번호 목록"
}

const switchBlockType = (type: BlockType) => type in BlockTypeTable? 
  BlockTypeTable[type as keyof typeof BlockTypeTable] : "Text";

const menuList = (handleClick: (value: string | null) => () => void) => [
  {
    title: "변경하기",
    buttonList: BlockTurnIntoBtnList,
    handleClick
  }
]

interface BlockTypeActionMenuArticleProps {
  handleClick: (value: string | null) => () => void;
  toggle: boolean;
}

const BlockTypeActionMenuArticle: React.FC<BlockTypeActionMenuArticleProps> | null = ({
  handleClick,
  toggle
}) => {
  return toggle? (
    <div className="menu-box">
      <BlockScrollMenu>
        <BlockScrollMenuArticles menuList={menuList(handleClick)} />
      </BlockScrollMenu>
    </div>
  ) : null;
}

interface BlockTypeActionMenuProps {
  type: string;
  handleClick: (value: string | null) => () => void;
  toggle: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const BlockTypeActionMenu: React.FC<BlockTypeActionMenuProps> = ({
  handleClick,
  toggle,
  onClick,
  type
}) => {

  return (
    <ActionMenuBox>
      <ActionMenuToggle
        onClick={onClick}
      >
        { switchBlockType(type as BlockType) }
      </ActionMenuToggle>
      <BlockTypeActionMenuArticle handleClick={handleClick} toggle={toggle} /> 
    </ActionMenuBox>
  );
}

export default BlockTypeActionMenu;