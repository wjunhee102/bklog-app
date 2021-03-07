import React, { useEffect } from 'react';
import classNames from 'classnames';
import InputComponent from '../InputComponent';
import useChange from '../../../hooks/useChange';
import useAuth from '../../../hooks/useAuth';

interface ErrorType {
  used?: boolean;
  valid?: boolean;
  name: string
}

function createErrorMessage({ used, valid, name }: ErrorType) {
  if(valid) {
    return `${name} 형식에 맞지 않습니다.`
  }
  if(used) {
    return `사용하고 있는 ${name}입니다.`
  }
  return "필수 정보입니다.";
}

interface InputPropsType {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (e: any) => void;
  error: boolean;
  errorMessage?: string;
}

function SignUpForm() {

  const [ lastName, handleInputLName, errorLastName, handleErrorLName ] = useChange<string>("");
  const [ firstName, handleInputFName, errorFirstName, handleErrorFName ] = useChange<string>("");
  const [ penName, handleInputPName, errorPenName, handleErrorPName ] = useChange<string>("");
  const [ email, handleInputEmail, errorEmail, handleErrorEmail ] = useChange<string>("");
  const [ password, handleInputPwd, errorPwd, handleErrorPwd ] = useChange<string>("");

  const { authState: { error: {signUpUser : 
    { emailUsed, emailValid, passwordValid, penNameUsed, penNameValid }}}, 
    onSignUpUser 
  } = useAuth();

  const inputProps: InputPropsType[] = [
    {
      id: "last-name",
      name: "lastName",
      type: "text",
      label: "성",
      placeholder: "성",
      value: lastName,
      onChange: handleInputLName,
      error: errorLastName,
      errorMessage: "필수 정보입니다."
    },
    {
      id: "first-name",
      name: "firstName",
      type: "text",
      label: "이름",
      placeholder: "이름",
      value: firstName,
      onChange: handleInputFName,
      error: errorFirstName,
      errorMessage: "필수 정보입니다."
    },
    {
      id: "pen-name",
      name: "penName",
      type: "text",
      label: "필명",
      placeholder: "영문 필수, 중복이 불가합니다.",
      value: penName,
      onChange: handleInputPName,
      error: errorPenName,
      errorMessage: createErrorMessage({
        name: "필명",
        used: penNameUsed,
        valid: penNameValid
      }) 
    },
    {
      id: "email-address",
      name: "email",
      type: "email",
      label: "계정(이메일)",
      placeholder: "example@example.com",
      value: email,
      onChange: handleInputEmail,
      error: errorEmail,
      errorMessage: createErrorMessage({
        name: "이메일",
        used: emailUsed,
        valid: emailValid
      }) 
    },
    {
      id: "password",
      name: "password",
      type: "password",
      label: "비밀번호",
      placeholder: "영문, 숫자 조합 8 ~ 12자로 작성해주세요.",
      value: password,
      onChange: handleInputPwd,
      error: errorPwd,
      errorMessage: createErrorMessage({
        name: "비밀번호",
        valid: passwordValid
      }) 
    }
  ];

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if(!errorLastName && !errorFirstName && !errorEmail && !errorPenName && !errorPwd) {
      if(penName && firstName && lastName && email && password) {
        onSignUpUser({
          penName,
          firstName,
          lastName,
          email,
          password
        })
      } else {
        handleErrorLName(lastName? false : true);
        handleErrorFName(firstName? false : true);
        handleErrorPName(penName? false : true);
        handleErrorEmail(email? false : true);
        handleErrorPwd(password? false : true);
      }
    } else {
      console.log("실행 안됨")
    }
  }

  useEffect(()=> {
    if(emailUsed || emailValid) {
      handleErrorEmail(true);
    } 
    if(penNameUsed || penNameValid) {
      handleErrorPName(true);
    }
    if(passwordValid) {
      handleErrorPwd(true);
    }
  },[emailUsed, emailValid, passwordValid, penNameUsed, penNameValid])

  return (
    <form onSubmit={handleSubmit}>

      <div className="overflow-hidden sm:rounded-md mb-8">
        
        <div className="rounded-md p-2 space-y-4">
          
          {
            inputProps.map(props =>(
              <InputComponent 
                key={props.id}
                boxClass="relative group"
                labelClass="pl-1 mb-1 block text-sm font-medium text-gray-700 dark:text-gray-50"
                className={classNames(
                  "rounded-md dark:bg-gray-100 appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 focus:ring-1 sm:text-sm",
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
        <button type="submit" onClick={handleSubmit} className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-500 hover:bg-purple-600 active:outline-none active:ring-2 active:ring-offset-2 active:ring-purple-600">
          Sign up
        </button>
      </div>

    </form>
  )
}

export default SignUpForm;