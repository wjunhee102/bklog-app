import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BlockScrollMenu from '../../components/block/components/common/virtual-scroll/BlockScrollMenu';
import '../../assets/index.css';
import '../../components/block/components/block/elements/common/action-menubar/TextBlockActionMenubar.scss';
import { ColorActionIcon } from '../../components/block/components/block/elements/common/action-menubar/color-action-menu/ColorActionMenu';
import BlockScrollMenuArticles, { ButtonProps } from '../../components/block/components/common/virtual-scroll/BlockScrollMenuAriticles';

export default {
  title: 'Block/BlockScrollMenu',
  component: BlockScrollMenu
} as ComponentMeta<typeof BlockScrollMenu>;

const MenuList: ButtonProps[] = [
  {
    title: "Text",
    value: "p",
    IconComponent: <img src="/img/text.png" alt=""/>
  },
  {
    title: "Heading 1",
    value: "h1",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "Heading 2",
    value: "h2",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "Heading 3",
    value: "h3",
    IconComponent: <img src="/img/header1.png" alt=""/>
  },
  {
    title: "To-do list",
    value: "todo",
    IconComponent: <img src="/img/to-do.png" alt=""/> 
  },
  {
    title: "Bulleted list",
    value: "bulleted",
    IconComponent: <img src="/img/bulleted-list.png" alt=""/>
  },
  {
    title: "Numbered list",
    value: "numbered",
    IconComponent: <img src="/img/numbered-list.png" alt=""/>
  }
]

const MenuList2 = {
  buttonList: MenuList,
  handleClick: (value: string) => () => console.log(value),
  title: "turn into"
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

const ColorActionMenuList = (handleClick: (value: string) => () => void) => [
  {
    title: "color",
    buttonList: colorMenu("text"),
    handleClick
  },
  {
    title: "background",
    buttonList: colorMenu("bg"),
    handleClick
  }
];


const Template: ComponentStory<typeof BlockScrollMenu> = (args: any) => (
  <BlockScrollMenu>
    <BlockScrollMenuArticles {...args} />
  </BlockScrollMenu>
);

export const Primary = Template.bind({});
Primary.args = {
  menuList: [MenuList2, MenuList2]
}

export const Color = Template.bind({});
Color.args = {
  menuList: ColorActionMenuList((value: string) => () => console.log(value))
}