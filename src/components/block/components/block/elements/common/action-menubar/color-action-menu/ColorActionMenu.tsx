import React, { useMemo } from 'react';
import { TextContentStyleType } from '../../../../../../entities/block/type/types/text';
import BlockScrollMenu from '../../../../../common/virtual-scroll/BlockScrollMenu';
import BlockScrollMenuArticles, { ButtonProps } from '../../../../../common/virtual-scroll/BlockScrollMenuAriticles';
import ActionMenuBox from '../common/ActionMenuBox';
import ActionMenuToggle from '../common/ActionMenuToggle';

interface ColorActionIconProps {
  style: string;
}

export const ColorActionIcon: React.FC<ColorActionIconProps> = ({ style }) => {
  return (
    <div className={`${style} color-action-icon`}>A</div>
  )
}

const colorMenu = (type: string): ButtonProps[] => [
  {
    title: "기본",
    value: null,
    IconComponent: <ColorActionIcon style={""} />
  },
  {
    title: "회색",
    value: "rgba(107, 114, 128, 1)",
    IconComponent: <ColorActionIcon style={`${type}-gray-500`} />
  },
  {
    title: "갈색",
    value: "rgba(180, 83, 9, 1)",
    IconComponent: <ColorActionIcon style={`${type}-yellow-700`} />
  },
  {
    title: "주황",
    value: "rgba(252, 211, 77, 1)",
    IconComponent: <ColorActionIcon style={`${type}-yellow-500`} />
  },
  {
    title: "노랑",
    value: "rgba(251, 191, 36, 1)",
    IconComponent: <ColorActionIcon style={`${type}-yellow-400`} />
  },
  {
    title: "초록",
    value: "rgba(16, 185, 129, 1)",
    IconComponent: <ColorActionIcon style={`${type}-green-500`} />
  }
  , 
  {
    title: "파랑",
    value: "rgba(59, 130, 246, 1)",
    IconComponent: <ColorActionIcon style={`${type}-blue-500`} />
  }
  , 
  {
    title: "보라",
    value: "rgba(139, 92, 246, 1)",
    IconComponent: <ColorActionIcon style={`${type}-purple-500`} />
  }
  , 
  {
    title: "분홍",
    value: "rgba(244, 114, 182, 1)",
    IconComponent: <ColorActionIcon style={`${type}-pink-400`} />
  }
  , 
  {
    title: "빨강",
    value: "rgba(239, 68, 68, 1)",
    IconComponent: <ColorActionIcon style={`${type}-red-500`} />
  }
]

const ColorActionMenuList = (handleClick: (type: "fc" | "bc") => (value: string | null) => () => void) => [
  {
    title: "글자 색상",
    buttonList: colorMenu("text"),
    handleClick: handleClick("fc")
  },
  {
    title: "배경 색상",
    buttonList: colorMenu("bg"),
    handleClick: handleClick("bc")
  }
];

interface ColorActionMenuArticleProps {
  handleClick: (type: "fc" | "bc") => (value: string | null) => () => void;
  toggle: boolean;
}

const ColorActionMenuArticle: React.FC<ColorActionMenuArticleProps> | null = ({
  handleClick,
  toggle
}) => toggle? (
  <div className="menu-box">
    <BlockScrollMenu>
      <BlockScrollMenuArticles menuList={ColorActionMenuList(handleClick)} />
    </BlockScrollMenu>
  </div>
  ) : null;


const setColorStyle = (textStyle: TextContentStyleType[]) => textStyle.reduce((acc: any, cur) => {
  if(cur[0] === "bc") {
    acc["backgroundColor"] = cur[1];
  } else if(cur[0] === "fc") {
    acc["color"] = cur[1];
  }

  return acc;
}, {});

interface ColorActionMenuProps {
  handleClick: (type: "fc" | "bc") => (value: string | null) => () => void;
  toggle: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  textStyle?: TextContentStyleType[] | null;
}


const ColorActionMenu: React.FC<ColorActionMenuProps> = ({
  handleClick,
  toggle,
  onClick,
  textStyle
}) => {

  const toggleStyle = useMemo(() => 
    textStyle? setColorStyle(textStyle) : {}
  , [textStyle]);

  return (
    <ActionMenuBox> 
      <ActionMenuToggle
        onClick={onClick}
      >
        <span style={toggleStyle} className="color-toggle">A</span> 
      </ActionMenuToggle>
      <ColorActionMenuArticle handleClick={handleClick} toggle={toggle} />
    </ActionMenuBox>
  );
}

export default ColorActionMenu;