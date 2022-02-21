import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../assets/index.css';
import GnbComponent from '../../components/gnb/GnbComponent';
import FullSizeContainer from '../common/FullScreenContainer';
import { UserInfo } from '../../store/modules/auth/utils';
import { UseGnbConnectStoreType } from '../../components/gnb/hooks/useGnbConnectStore';
import { BrowserRouter } from 'react-router-dom';

export default {
  title: 'Gnb/gnb',
  component: GnbComponent
} as ComponentMeta<typeof GnbComponent>

const dummyUseConnectStore = ( 
  toggle: boolean, 
  loading: boolean, 
  user: UserInfo 
) => ({
  loading,
  user,
  onSignOutUser: () => {},
  onAllReset: () => {}
});

const userInfo: UserInfo = {
  penName: "test",
  id: "test123!22",
  photo: null,
  coverImage: null,
  coverColor: null,
  bio: null,
  firstName: "test",
  lastName: "test",
  email: "test@test.com"
}

const Template: ComponentStory<typeof GnbComponent> = args => (
  <FullSizeContainer>
    <GnbComponent {...args} />
  </FullSizeContainer>
);

export const Primary = Template.bind({});
Primary.args = {
  useConnectStore: dummyUseConnectStore(false, false, userInfo)
}

export const Secondary = Template.bind({});
Secondary.args = {
  useConnectStore: dummyUseConnectStore(true, true, userInfo)
}