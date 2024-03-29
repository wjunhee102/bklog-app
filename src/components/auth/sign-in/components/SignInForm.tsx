import React from 'react';
import classNames from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import InputComponent from '../../InputComponent';
import { InputPropsType } from '../hooks/useSignIn';
import { ApiErrorType } from '../../../../utils/api-utils';
import { faLock } from '@fortawesome/free-solid-svg-icons';

interface SignInFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  inputProps: InputPropsType[];
  error: ApiErrorType | null;
  errorEmail: boolean;
  errorPwd: boolean;
}

const SignInForm: React.FC<SignInFormProps> = ({
  onSubmit,
  inputProps,
  error,
  errorEmail,
  errorPwd
}) => {

  return (
    <form className="mt-12" onSubmit={onSubmit} action="#">
      <div className="rounded-md shadow-sm -space-y-px">
        {
          inputProps.map((props)=>
            <InputComponent
              key={props.id}
              labelClass="sr-only"
              className={classNames(
                "dark:bg-gray-100 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 focus:ring-1 sm:text-sm focus:ring-offset-1",
                props.style,
                {"border-red-500": props.error}
              )}
              value={props.value}
              onChange={props.onChange}
              id={props.id} 
              name={props.name}
              type={props.type}
              label={props.label}
              placeholder={props.placeholder}
              autoComplete={props.autoComplete}
            />
          )
        }
      </div>
      <div 
        className="mb-8 leading-6 h-6 block text-red-500 text-sm font-semibold text-left px-2"
      > 
        { 
          error? 
          `가입하지 않은 계정이거나, 잘못된 비밀번호입니다.` 
          : errorEmail || errorPwd 
          ? `계정과 패스워드를 입력해주세요.` 
          : null 
        } 
      </div>

      <div>
        <button type="submit" className="gradient gradient-hover whitespace-nowrap group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white active:outline-none active:ring-2 active:ring-offset-1">
          <span className="absolute left-0 inset-y-0 flex items-center pl-3">
            <FontAwesomeIcon className="text-base text-white group-hover:text-purple-200" icon={faLock as any} />
          </span>
          Sign in
        </button>
      </div>
    </form>
  );
}

export default SignInForm;