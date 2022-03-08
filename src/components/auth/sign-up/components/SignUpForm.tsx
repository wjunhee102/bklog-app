import React from 'react';
import classNames from 'classnames';
import InputComponent from '../../InputComponent';
import { InputPropsType } from '../hooks/useSignUp';

interface SignUpFormProps {
  onSubmit: React.FormEventHandler<HTMLFormElement>;
  inputPropsList: InputPropsType[];
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  onSubmit,
  inputPropsList
}) => {

  return (
    <form onSubmit={onSubmit}>

      <div className="overflow-hidden sm:rounded-md mb-8">
        
        <div className="rounded-md p-2 space-y-4">
          
          {
            inputPropsList.map(props =>(
              <InputComponent 
                key={props.id}
                boxClass="relative group"
                labelClass="pl-1 mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50"
                className={classNames(
                  "input-component rounded-md dark:bg-gray-100 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:z-10 focus:ring-2 sm:text-sm focus:ring-offset-1",
                  {"border-red-500": props.error}
                )}
                value={props.value}
                onChange={props.onChange}
                id={props.id}
                name={props.name}
                type={props.type}
                label={props.label}
                placeholder={props.placeholder}
                autoComplete="off"
              >
                <span 
                  className={classNames(
                    "absolute right-0 top-0 text-red-500 text-sm",
                    {"hidden": !props.error}
                  )}
                >
                  {props.errorMessage}
                </span>
              </InputComponent>
            ))
          }

        </div>

      </div>

      <div className="p-2">
        <button type="submit" className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white gradient gradient-hover active:outline-none active:ring-2 active:ring-offset-1">
          Sign up
        </button>
      </div>

    </form>
  )
}

export default SignUpForm;