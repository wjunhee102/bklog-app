import React from 'react';
import useSignUp from './hooks/useSignUp';
import SignUpComponent from './SignUpComponent';

const SignUp: React.FC = () => {
  return <SignUpComponent {...useSignUp()} />
}

export default SignUp;