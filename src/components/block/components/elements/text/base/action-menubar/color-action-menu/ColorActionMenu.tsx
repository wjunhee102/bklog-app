import React, { useMemo } from 'react';
import { ContentType } from '../../../../../../types';
import BlockScrollMenu from '../../../../../virtual-scroll/BlockScrollMenu';
import BlockScrollMenuArticles, { ButtonProps } from '../../../../../virtual-scroll/BlockScrollMenuAriticles';
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
    title: "Default",
    value: null,
    IconComponent: <ColorActionIcon style={""} />
  },
  {
    title: "Gray",
    value: "rgba(107, 114, 128, 1)",
    IconComponent: <ColorActionIcon style={`${type}-gray-500`} />
  },
  {
    title: "Brown",
    value: "rgba(180, 83, 9, 1)",
    IconComponent: <ColorActionIcon style={`${type}-yellow-700`} />
  },
  {
    title: "Orange",
    value: "rgba(252, 211, 77, 1)",
    IconComponent: <ColorActionIcon style={`${type}-yellow-500`} />
  },
  {
    title: "Yellow",
    value: "rgba(251, 191, 36, 1)",
    IconComponent: <ColorActionIcon style={`${type}-yellow-400`} />
  },
  {
    title: "Green",
    value: "rgba(16, 185, 129, 1)",
    IconComponent: <ColorActionIcon style={`${type}-green-500`} />
  }
  , 
  {
    title: "Blue",
    value: "rgba(59, 130, 246, 1)",
    IconComponent: <ColorActionIcon style={`${type}-blue-500`} />
  }
  , 
  {
    title: "Purple",
    value: "rgba(139, 92, 246, 1)",
    IconComponent: <ColorActionIcon style={`${type}-purple-500`} />
  }
  , 
  {
    title: "Pink",
    value: "rgba(244, 114, 182, 1)",
    IconComponent: <ColorActionIcon style={`${type}-pink-400`} />
  }
  , 
  {
    title: "Red",
    value: "rgba(239, 68, 68, 1)",
    IconComponent: <ColorActionIcon style={`${type}-red-500`} />
  }
]

const ColorActionMenuList = (handleClick: (type: "fc" | "bc") => (value: string) => () => void) => [
  {
    title: "color",
    buttonList: colorMenu("text"),
    handleClick: handleClick("fc")
  },
  {
    title: "background",
    buttonList: colorMenu("bg"),
    handleClick: handleClick("bc")
  }
];

interface ColorActionMenuArticleProps {
  handleClick: (type: "fc" | "bc") => (value: string) => () => void;
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


const setColorStyle = (textStyle: ContentType[]) => textStyle.reduce((acc, cur) => {
  if(cur[0] === "bc") {
    acc["backgroundColor"] = cur[1];
  } else if(cur[0] === "fc") {
    acc["color"] = cur[1];
  }

  return acc;
}, {});

interface ColorActionMenuProps {
  handleClick: (type: "fc" | "bc") => (value: string) => () => void;
  toggle: boolean;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  textStyle: ContentType[];
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