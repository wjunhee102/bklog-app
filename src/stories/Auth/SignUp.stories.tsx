import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../assets/index.css';
import SignUpComponent from '../../components/auth/sign-up/SignUpComponent';
import FullScreenContainer from '../common/FullScreenContainer';

export default {
  title: 'Auth/SignUp',
  component: SignUpComponent
} as ComponentMeta<typeof SignUpComponent>

const Template: ComponentStory<typeof SignUpComponent> = args => (
  <FullScreenContainer>
    <SignUpComponent {...args} />
  </FullScreenContainer>
)

const onChange = (e: any) => {  };

const inputPropsList = (error: boolean) => [
  {
    id: "last-name",
    name: "lastName",
    type: "text",
    label: "성",
    placeholder: "성",
    value: "",
    onChange,
    error,
    errorMessage: "필수 정보입니다."
  },
  {
    id: "first-name",
    name: "firstName",
    type: "text",
    label: "이름",
    placeholder: "이름",
    value: "",
    onChange,
    error,
    errorMessage: "필수 정보입니다."
  },
  {
    id: "pen-name",
    name: "penName",
    type: "text",
    label: "필명",
    placeholder: "영문 필수, 중복이 불가합니다.",
    value: "",
    onChange,
    error,
    errorMessage: "필수 정보입니다."
  },
  {
    id: "email-address",
    name: "email",
    type: "email",
    label: "계정(이메일)",
    placeholder: "example@example.com",
    value: "",
    onChange,
    error,
    errorMessage: "필수 정보입니다."
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "비밀번호",
    placeholder: "영문, 숫자 조합 8 ~ 12자로 작성해주세요.",
    value: "",
    onChange,
    error,
    errorMessage: "필수 정보입니다."
  }
]

export const Primary = Template.bind({});
Primary.args = {
  handleSubmit: (e: any) => { e.preventDefault() },
  inputPropsList: inputPropsList(false)
}

export const Error = Template.bind({});
Error.args = {
  handleSubmit: (e: any) => { e.preventDefault() },
  inputPropsList: inputPropsList(true)
}