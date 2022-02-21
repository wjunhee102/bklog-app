import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import '../../assets/index.css';
import PageBtn from '../../components/sidebar/component/page-btn';
import { ReqUpdatePageInfo } from '../../store/modules/page/utils';

export default {
  title: 'SideBar/PageBtn',
  component: PageBtn
} as ComponentMeta<typeof PageBtn>;

const Template: ComponentStory<typeof PageBtn> = (args: any) => (
  <div style={{ width: "242px", border: "1px solid #000"}}>
    <PageBtn {...args} />
  </div>
  
);

export const Primary = Template.bind({});
Primary.args = {
  penName: "test",
  onUpdatePage: (data: ReqUpdatePageInfo) => { console.log(data) },
  onDeletePage: (pageId: string) => { console.log(pageId) },
  editable: true
}