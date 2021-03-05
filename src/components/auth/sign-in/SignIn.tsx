import React from 'react';
import SignInForm from './SignInForm';

function SignIn() {

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 shadow rounded-md">
      <div className="max-w-md w-full space-y-10">
        <div>
          <h2 className="text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
        </div>
        <SignInForm />
      </div>
    </div>
  ) 
}

export default SignIn;