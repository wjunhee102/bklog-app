import React from 'react';
import { ComponentMeta, ComponentStory } from '@storybook/react';
import '../../assets/index.css';
import SignInComponent from '../../components/auth/sign-in/SignInComponent';
import FullSizeContainer from '../common/FullScreenContainer';

export default {
  title: 'Auth/SignIn',
  component: SignInComponent
} as ComponentMeta<typeof SignInComponent>

const Template: ComponentStory<typeof SignInComponent> = args => (
  <FullSizeContainer>
    <SignInComponent {...args} />
  </FullSizeContainer>
)

const inputProps = (emailError: boolean, pwdError: boolean) => {
  return [
    {
      value: "",
      onChange: () => {},
      id: "email-address",
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "example@example.com",
      autoComplete: "on",
      error: emailError,
      style: "rounded-t-md"
    },
    {
      value: "",
      onChange: () => {},
      id: "password",
      name: "password",
      type: "password",
      label: "password",
      placeholder: "비밀번호",
      autoComplete: "off",
      error: pwdError,
      style: "rounded-b-md"
    }
  ]
}

export const Primary = Template.bind({});
Primary.args = {
  handleSubmit: (e: any) => { e.preventDefault() },
  inputProps: inputProps(false, false),
  error: null,
  errorEmail: false,
  errorPwd: false
}


export const Error = Template.bind({});
Error.args = {
  handleSubmit: (e: any) => { e.preventDefault() },
  inputProps: inputProps(true, true),
  error: {
    type: "AUTH",
    detail: "dsad",
    message: "오류",
    code: "022"
  },
  errorEmail: true,
  errorPwd: true
}