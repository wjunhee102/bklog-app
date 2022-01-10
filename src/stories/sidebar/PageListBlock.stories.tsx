import { ComponentMeta, ComponentStory } from '@storybook/react';
import React from 'react';
import '../../assets/index.css';
import PageListBlock from '../../components/sidebar/component/page-list/elements/PageListBlock';
import { ReqUpdatePageInfo } from '../../store/modules/page/utils';
import '../../components/sidebar/component/page-list/PageList.scss';

export default {
  title: 'Sidebar/PageList/Block',
  component: PageListBlock
} as ComponentMeta<typeof PageListBlock>

const Template: ComponentStory<typeof PageListBlock> = (args: any) => (
  <div style={{ width: "242px", border: "1px solid #000"}}>
    <PageListBlock {...args} />
  </div>
);

export const Primary = Template.bind({});
Primary.args = {
  title: "private",
  onUpdatePage: (data: ReqUpdatePageInfo) => { console.log(data) },
  onDeletePage: (pageId: string) => { console.log(pageId) },
  editable: true,
  pageList: [
    {
      title: "Page1",
      id: "1",
      penName: "test"
    },
    {
      title: "Page2",
      id: "2",
      penName: "test"
    },
    {
      title: "Page3",
      id: "3",
      penName: "test"
    },
    {
      title: "Page4",
      id: "4",
      penName: "test"
    }
  ]
}