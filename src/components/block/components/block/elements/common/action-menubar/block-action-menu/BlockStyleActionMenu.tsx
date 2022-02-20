import React from 'react';
import { BlockType } from '../../../../../../entities/block/type';
import BlockScrollMenu from '../../../../../common/virtual-scroll/BlockScrollMenu';
import BlockScrollMenuArticles, { ButtonProps } from '../../../../../common/virtual-scroll/BlockScrollMenuAriticles';
import ActionMenuBox from '../common/ActionMenuBox';
import ActionMenuToggle from '../common/ActionMenuToggle';

const buttonList: ButtonProps[] = [
  {
    title: "본문",
    value: "bk-p",
    IconComponent: <img src="/img/text.png" alt=""/>
  },
  {
    title: "제목",
    value: "bk-h1",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "머리말",
    value: "bk-h2",
    IconComponent: <img src="/img/header2.png" alt=""/>
  },
  {
    title: "부 머리말",
    value: "bk-h3",
    IconComponent: <img src="/img/header3.png" alt=""/>
  }
]

const BlockTypeTable = {
   "bk-p"        : "본문",
   "bk-h1"       : "제목",
   "bk-h2"       : "머리말",
   "bk-h3"       : "부 머리말"
}

const switchBlockType = (styleType: string) => styleType in BlockTypeTable? 
  BlockTypeTable[styleType as keyof typeof BlockTypeTable] : "Text";


const menuList = (handleClick: (value: string | null) => () => void) => [
  {
    title: "변경하기",
    buttonList,
    handleClick
  }
]

interface BlockStyleActionMenuArticleProps {
  handleClick: (value: string | null) => () => void;
  toggle: boolean;
}

const BlockStyleActionMenuArticle: React.FC<BlockStyleActionMenuArticleProps> | null = ({
  handleClick,
  toggle
}) => {
  return toggle? (
    <div className="menu-box">
      <BlockScrollMenu>
        <BlockScrollMenuArticles menuList={menuList(handleClick)} />
      </BlockScrollMenu>
    </div>
  ) : null
}

interface BlockStyleActionMenuProps {
  styleType: string;
  handleClick: (value: string | null) => () => void;
  toggle: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const BlockStyleActionMenu: React.FC<BlockStyleActionMenuProps> = ({
  handleClick,
  toggle,
  onClick,
  styleType
}) => {

  return (
    <ActionMenuBox>
      <ActionMenuToggle
        onClick={onClick}
      >
        { switchBlockType(styleType) }
      </ActionMenuToggle>
      <BlockStyleActionMenuArticle handleClick={handleClick} toggle={toggle} /> 
    </ActionMenuBox>
  );
}

export default BlockStyleActionMenu;