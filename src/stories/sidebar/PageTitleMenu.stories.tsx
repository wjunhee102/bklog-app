import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import '../../assets/index.css';
import EditPageTitleMenu from '../../components/sidebar/component/page-btn/elements/edit-page-title-menu';

export default {
  title: 'Sidebar/PageTitleMenu/Edit',
  component: EditPageTitleMenu
} as ComponentMeta<typeof EditPageTitleMenu>

const Template: ComponentStory<typeof EditPageTitleMenu> = (args: any) => (
  <EditPageTitleMenu {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  handleClick: (key: string) => console.log(key)
}