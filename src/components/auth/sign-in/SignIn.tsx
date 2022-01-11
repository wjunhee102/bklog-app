import React from 'react';
import { UseAuthPageTypes } from '../../../pages/authpage/hooks/useAuthPage';
import useSignIn from './hooks/useSignIn';
import SignInComponent from './SignInComponent';

interface SignInProps {
  authPageHooks: UseAuthPageTypes;
}

const SignIn: React.FC<SignInProps> = ({
  authPageHooks
}) => {
  return <SignInComponent {...useSignIn(authPageHooks.useAuthHooks)} />;
}

export default SignIn;