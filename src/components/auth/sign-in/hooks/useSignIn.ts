import { useEffect } from 'react';
import useAuth from "../../../../hooks/useAuth";
import useChange from '../../../../hooks/useChange';
import { regEmail, regPassword } from '../../utils';

export interface InputPropsType {
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  autoComplete: string;
  error: boolean;
  style: string;
}

function useSignIn() {

  const {
    authState: { error },
    onSignInUser
  } = useAuth();

  const [ email, handleInputEmail, errorEmail, handleErrorEmail ] = useChange("test@test.com");
  const [ password, handleInputPwd, errorPwd, handleErrorPwd ] = useChange("password12!");

  const inputProps: InputPropsType[] = [
    {
      value: email,
      onChange: handleInputEmail(),
      id: "email-address",
      name: "email",
      type: "email",
      label: "Email address",
      placeholder: "example@example.com",
      autoComplete: "on",
      error: errorEmail,
      style: "rounded-t-md"
    },
    {
      value: password,
      onChange: handleInputPwd(),
      id: "password",
      name: "password",
      type: "password",
      label: "password",
      placeholder: "비밀번호",
      autoComplete: "off",
      error: errorPwd,
      style: "rounded-b-md"
    }
  ]

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if(!errorEmail && !errorPwd) {
      if(email && password) {
        onSignInUser({email, password});
      } else {
        handleErrorEmail(email? false : true);
        handleErrorPwd(password? false : true);
      }
    } 
    
  }

  useEffect(() => {
    if(email) {
      if(!regEmail.test(email)) {
        handleErrorEmail(true);
      }
    }
  }, [email]);

  useEffect(() => {
    if(password) {
      if(!regPassword.test(password)) {
        handleErrorPwd(true);
      }
    }
  }, [password]);

  return {
    handleSubmit,
    inputProps,
    error,
    errorEmail,
    errorPwd
  }
}

export default useSignIn;