import React from 'react';
import { BlockTypes } from '../../../../../../../types';
import BlockTurnIntoBtnList from '../../../../../../common/button-list/BlockTurnIntoBtnList';
import BlockScrollMenu from '../../../../../../common/virtual-scroll/BlockScrollMenu';
import BlockScrollMenuArticles, { ButtonProps } from '../../../../../../common/virtual-scroll/BlockScrollMenuAriticles';
import ActionMenuBox from '../common/ActionMenuBox';
import ActionMenuToggle from '../common/ActionMenuToggle';

const BlockTypeTable = {
  "text"     : "텍스트",
  "todo"     : "체크리스트",
  "bulleted" : "구분점 목록",
  "numbered" : "번호 목록"
}

const switchBlockType = (type: BlockTypes) => type in BlockTypeTable? 
  BlockTypeTable[type] : "Text";

const menuList = (handleClick: (value: string) => () => void) => [
  {
    title: "변경하기",
    buttonList: BlockTurnIntoBtnList,
    handleClick
  }
]

interface BlockTypeActionMenuArticleProps {
  handleClick: (value: BlockTypes) => () => void;
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
  type: BlockTypes;
  handleClick: (value: string) => () => void;
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
        { switchBlockType(type) }
      </ActionMenuToggle>
      <BlockTypeActionMenuArticle handleClick={handleClick} toggle={toggle} /> 
    </ActionMenuBox>
  );
}

export default BlockTypeActionMenu;