import React from 'react';
import { InputPropsType } from './hooks/useSignUp';
import SignUpForm from './components/SignUpForm';
import './SignUp.scss';

interface SignUpComponentProps {
  handleSubmit: (e: any) => void;
  inputPropsList: InputPropsType[]
}

const SignUpComponent: React.FC<SignUpComponentProps> = ({
  handleSubmit,
  inputPropsList
}) => {

  return (
    <div className="sign-up">
      <div className="sign-up-component">
        <div className="sign-up-container">
          
          <div>
            <h2 className="sign-up-title">
              Sign up
            </h2>
          </div>  

          <SignUpForm
            onSubmit={handleSubmit}
            inputPropsList={inputPropsList}
          />

        </div>
      </div>
    </div>
  )
}

export default SignUpComponent;