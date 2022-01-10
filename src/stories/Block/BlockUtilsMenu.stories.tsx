import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import '../../assets/index.css';
import BlockUtilsMenuArticle from '../../components/block/components/common/block-utils-menu/BlockUtilsMenuArticle';

export default {
  title: 'Block/BlockUtilsMenu',
  component: BlockUtilsMenuArticle
} as ComponentMeta<typeof BlockUtilsMenuArticle>;

const Template: ComponentStory<typeof BlockUtilsMenuArticle> = (args: any) => (
  <BlockUtilsMenuArticle {...args} />
)

export const Primary = Template.bind({});
Primary.args = {
  handleDelete: () => console.log("del"),
  handleDuplicate: () => console.log("duple"),
  handleTurnInto: (value: string) => console.log(value)
}