import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BlockScrollMenu, { ButtonProps } from '../../components/block/components/virtual-scroll/BlockScrollMenu';
import '../../assets/index.css';

export default {
  title: 'Block/BlockScrollMenu',
  component: BlockScrollMenu
} as ComponentMeta<typeof BlockScrollMenu>;

const MenuList: ButtonProps[] = [
  {
    title: "Text",
    value: "p",
    img: "/img/text.png"
  },
  {
    title: "Heading 1",
    value: "h1",
    img: "/img/header1.png"
  },
  {
    title: "Heading 2",
    value: "h2",
    img: "/img/header2.png"
  },
  {
    title: "Heading 3",
    value: "h3",
    img: "/img/header3.png"
  },
  {
    title: "To-do list",
    value: "todo",
    img: "/img/to-do.png"
  },
  {
    title: "Bulleted list",
    value: "bulleted",
    img: "/img/bulleted-list.png"
  },
  {
    title: "Numbered list",
    value: "numbered",
    img: "/img/numbered-list.png"
  }
]

const MenuList2 = {
  buttonList: MenuList,
  handleClick: (value: string) => () => console.log(value),
  title: "turn into"
}

const Template: ComponentStory<typeof BlockScrollMenu> = (args) => <BlockScrollMenu {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  menuList: [MenuList2, MenuList2]
}