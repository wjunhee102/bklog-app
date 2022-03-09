import React from 'react';
import { UseAuthPageTypes } from '../../../pages/auth/hooks/useAuthPage';
import useSignUp from './hooks/useSignUp';
import SignUpComponent from './SignUpComponent';

interface SignUpProps {
  authPageHooks: UseAuthPageTypes;
}

const SignUp: React.FC<SignUpProps> = ({
  authPageHooks
}) => {
  return <SignUpComponent {...useSignUp(authPageHooks.useAuthHooks)} />
}

export default SignUp;