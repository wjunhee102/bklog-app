import React, { useState, useEffect, ChangeEvent } from 'react';
import useAuth from '../../../hooks/useAuth';
import BkInput from '../../form/BkInput';
import BkForm from '../../form/BkForm';


interface InputComponentProps {
  onChange: ChangeEvent<HTMLInputElement>;
  value: string | number; 
}

function InputComponent() {
  return (
    <div>
      <label htmlFor="email" className="sr-only">Email address</label>
      <input id="email-address" name="email" type="email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 focus:ring-1 sm:text-sm" placeholder="Email address" />
    </div>
  )
}

function FormComponent() {

  const {
    onSignInUser
  } = useAuth();

  const [id, setId] = useState<string>("");
  const [pwd, setPwd] = useState<string>("");

  const handleInputId = (e:any) => {
    setId(e.target.value);
  }

  const handleInputPwd = (e:any) => {
    setPwd(e.target.value);
  }

  const handleClickSubmit = () => {
    onSignInUser({email: id, password: pwd});
  }

  const cancelFormEvent = (e: React.FormEvent) => {
    e.preventDefault();
  } 

  return (
    <div className="p-10">
      <form className="w-auto h-auto" onSubmit={cancelFormEvent}>
        <div className="p-4">
          <InputComponent />
        </div>

        <div>
          <label>
            <div>password</div>
            <input onChange={handleInputPwd} type="password" name="pwd" value={pwd} />
          </label>
        </div>
        <div>
          <button onClick={handleClickSubmit}>확인</button>
        </div>
      </form>
    </div>
  )
}

function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <img className="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow" />
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Sign in to your account
          </h2>
          {/* <p className="mt-2 text-center text-sm text-gray-600">
            Or
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              start your 14-day free trial
            </a>
          </p> */}
        </div>
        <form className="mt-12 space-y-10" action="#">
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email" className="sr-only">Email address</label>
              <input id="email-address" name="email" type="email" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 focus:ring-1 sm:text-sm" placeholder="Email address" />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input id="password" name="password" type="password" className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 focus:ring-1 sm:text-sm" placeholder="Password" />
            </div>
          </div>

          <div>
            <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  ) 
}

export default SignIn;