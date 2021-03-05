import React, { useState, useEffect } from 'react';
import classNames from 'classnames';
import useAuth from '../../../hooks/useAuth';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';

interface InputComponentProps {
  onChange: any;
  value: string | number; 
  placeholder: string;
  label: string;
  className?: string;
  type: string;
  name: string;
  id?: string;
}

const defaultInputStyle = "appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 focus:ring-1 sm:text-sm";

function InputComponent({
  onChange,
  value,
  placeholder,
  label,
  className,
  type,
  name,
  id,
}: InputComponentProps) {
  return (
    <div>
      <label 
        htmlFor={type} 
        className="sr-only"
      >
        { label }
      </label>
      <input 
        id={id} 
        name={name} 
        type={type} 
        className={
          classNames(
            className,
            defaultInputStyle
          )
        }
        placeholder={placeholder} 
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

function SignInForm() {

  const {
    getError,
    onSignInUser
  } = useAuth();

  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<boolean>(false);

  const handleInputEmail = (e:any) => {
    if(error) {
      console.log("2")
      setError(false);
    }
    setEmail(e.target.value);
  }

  const handleInputPwd = (e:any) => {
    if(error) {
      setError(false);
    }
    setPassword(e.target.value);
  }

  const handleClickSubmit = () => {
    if(email && password) {
      onSignInUser({email, password});
    } else {
      setError(true);
    }
  }

  const cancelFormEvent = (e: React.FormEvent) => {
    e.preventDefault();
  } 

  useEffect(() => {
    if(getError && getError.signIn) {
      console.log("1")
      setError(true);
    }
  },[getError]);

  return (
    <form className="mt-12" onSubmit={cancelFormEvent} action="#">
      <div className="rounded-md shadow-sm -space-y-px">
        <InputComponent
          className="rounded-t-md"
          value={email}
          onChange={handleInputEmail}
          id="email-address" 
          name="email"
          type="email"
          label="Email address"
          placeholder="Email address"
        />
        <InputComponent 
          className="rounded-b-md"
          value={password}
          onChange={handleInputPwd}
          id="password" 
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
        />
      </div>
      <div 
        className="mb-8 leading-6 h-6 block text-red-500 text-sm font-semibold text-left px-2"
      > 
        { error? `가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.` : null } 
      </div>

      <div>
        <button type="submit" onClick={handleClickSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-600">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <FontAwesomeIcon className="text-base text-purple-300 group-hover:text-purple-200" icon={faLock} />
          </span>
          Sign in
        </button>
      </div>
    </form>
  )
}

export default SignInForm;