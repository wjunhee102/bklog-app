import React from 'react';
import SignUpForm from './SignUpForm';

function SignUp() {
  return (
    <div className="sign-up relative overflow-auto flex items-center w-full h-full bg-gray-50 dark:bg-black shadow rounded-md">
      <div className="absolute left-0 top-auto py-32 w-full h-auto box-contents flex justify-center">
        <div className="max-w-md w-full h-auto space-y-10">
          <div>
            <h2 className="text-center text-3xl font-extrabold text-gray-900 dark:text-gray-100">
              Sign up
            </h2>
          </div>  
          <SignUpForm />
        </div>
      </div>
    </div>
  )
}

export default SignUp;