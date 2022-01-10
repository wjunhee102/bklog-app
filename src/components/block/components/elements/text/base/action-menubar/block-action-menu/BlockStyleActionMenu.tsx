import React, { useState } from 'react';
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
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "부 머리말",
    value: "bk-h3",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "체크리스트",
    value: "bk-todo",
    IconComponent: <img src="/img/to-do.png" alt=""/> 
  },
  {
    title: "구분점 목록",
    value: "bk-bulleted",
    IconComponent: <img src="/img/bulleted-list.png" alt=""/>
  },
  {
    title: "번호 목록",
    value: "bk-numbered",
    IconComponent: <img src="/img/numbered-list.png" alt=""/>
  }
]

const BlockTypeTable = {
   "bk-p"        : "본문",
   "bk-h1"       : "제목",
   "bk-h2"       : "머리말",
   "bk-h3"       : "부 머리말",
   "bk-todo"     : "체크리스트",
   "bk-bulleted" : "구분점 목록",
   "bk-numbered" : "번호 목록"
}

const switchBlockType = (styleType: string) => styleType in BlockTypeTable? 
  BlockTypeTable[styleType] : "Text";


const menuList = (handleClick: (value: string) => () => void) => [
  {
    title: "변경하기",
    buttonList,
    handleClick
  }
]

interface BlockStyleActionMenuArticleProps {
  handleClick: (value: string) => () => void;
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
  handleClick: (value: string) => () => void;
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
  )
}

export default BlockStyleActionMenu;