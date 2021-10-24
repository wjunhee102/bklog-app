import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import BlockMenuBar from '../../components/block/components/menubar';
import '../../assets/index.css';

export default {
  title: 'Block/BlockMenubar',
  component: BlockMenuBar
} as ComponentMeta<typeof BlockMenuBar>

const Template: ComponentStory<typeof BlockMenuBar> = (args) => <BlockMenuBar {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  children: <div>B</div>
}

