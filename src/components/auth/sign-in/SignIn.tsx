import React from 'react';
import useSignIn from './hooks/useSignIn';
import SignInComponent from './SignInComponent';

const SignIn: React.FC = () => {
  return <SignInComponent {...useSignIn()} />;
}

export default SignIn;