import React from 'react';
import SignInForm from './components/SignInForm';
import { InputPropsType } from './hooks/useSignIn';
import { ApiErrorType } from '../../../utils/api-utils';
import './SignIn.scss';

interface SignInComponentProps {
  handleSubmit: (e: any) => void;
  inputProps: InputPropsType[];
  error: ApiErrorType;
  errorEmail: boolean;
  errorPwd: boolean;
}

const SignInComponent: React.FC<SignInComponentProps> = ({
  handleSubmit,
  inputProps,
  error,
  errorEmail,
  errorPwd
}) => {

  return (
    <div className="sign-in">
      <div className="sign-in-component">

        <div>
          <h2 className="sign-in-title">
            Sign in to your account
          </h2>
        </div>

        <SignInForm
          onSubmit={handleSubmit}
          inputProps={inputProps}
          error={error}
          errorEmail={errorEmail}
          errorPwd={errorPwd}
        />
        
      </div>
    </div>
  );
}

export default SignInComponent;