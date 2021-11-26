import { useState, useMemo, useEffect } from 'react';
import useAuth from "../../../../hooks/useAuth";
import useChange from '../../../../hooks/useChange';
import { regEmail, regPassword, regPenName } from '../../utils';

interface ErrorType {
  used?: boolean;
  valid?: boolean;
  name: string
}

function createErrorMessage({ used, valid, name }: ErrorType) {
  if(valid) {
    return `${name} 형식에 맞지 않습니다.`
  } else if(used) {
    return `사용하고 있는 ${name}입니다.`
  } else {
    return "필수 정보입니다.";
  }
}

export interface InputPropsType {
  id: string;
  name: string;
  type: string;
  label: string;
  placeholder: string;
  value: string | number;
  onChange: (callback?: any) => void;
  error: boolean;
  errorMessage?: string;
  onBlur?: any;
}

type SetInputPropsType = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error: boolean,
  errorMessage?: string
} 

const setInputProps = (
  lastName: SetInputPropsType,
  firstName: SetInputPropsType,
  penName: SetInputPropsType,
  email: SetInputPropsType,
  password: SetInputPropsType
): InputPropsType[] => [
  {
    id: "last-name",
    name: "lastName",
    type: "text",
    label: "성",
    placeholder: "성",
    value: lastName.value,
    onChange: lastName.onChange,
    error: lastName.error,
    errorMessage: "필수 정보입니다."
  },
  {
    id: "first-name",
    name: "firstName",
    type: "text",
    label: "이름",
    placeholder: "이름",
    value: firstName.value,
    onChange: firstName.onChange,
    error: firstName.error,
    errorMessage: "필수 정보입니다."
  },
  {
    id: "pen-name",
    name: "penName",
    type: "text",
    label: "필명",
    placeholder: "영문 필수, 중복이 불가합니다.",
    value: penName.value,
    onChange: penName.onChange,
    error: penName.error,
    errorMessage: penName.errorMessage
  },
  {
    id: "email-address",
    name: "email",
    type: "email",
    label: "계정(이메일)",
    placeholder: "example@example.com",
    value: email.value,
    onChange: email.onChange,
    error: email.error,
    errorMessage: email.errorMessage
  },
  {
    id: "password",
    name: "password",
    type: "password",
    label: "비밀번호",
    placeholder: "영문, 숫자 조합 8 ~ 12자로 작성해주세요.",
    value: password.value,
    onChange: password.onChange,
    error: password.error,
    errorMessage: password.errorMessage
  }
];

// 전송 전에 validation 체크
function useSignUp() {

  const [ lastName, handleInputLName, errorLastName, handleErrorLName ] = useChange("");
  const [ firstName, handleInputFName, errorFirstName, handleErrorFName ] = useChange("");
  const [ penName, handleInputPName, errorPenName, handleErrorPName ] = useChange("");
  const [ email, handleInputEmail, errorEmail, handleErrorEmail ] = useChange("");
  const [ password, handleInputPwd, errorPwd, handleErrorPwd ] = useChange("");

  const [ emailUsed, setEmailUsed ]      = useState<boolean>(false);
  const [ emailValid, setEmailValid ]    = useState<boolean>(false);
  const [ passwordValid, setPwdValid ]   = useState<boolean>(false);
  const [ penNameUsed, setPNUsed ]       = useState<boolean>(false);
  const [ penNameValid, setPNValid ]     = useState<boolean>(false);

  const {
    authState: {
      signUpState
    },
    onSignUpUser,
    onCheckEmailUsed,
    onCheckPenNameUsed
  } = useAuth();

  const inputPropsList = useMemo(() => setInputProps({
    value: lastName,
    onChange: handleInputLName(),
    error: errorLastName
  }, {
    value: firstName,
    onChange: handleInputFName(),
    error: errorFirstName
  }, {
    value: penName,
    onChange: handleInputPName(onCheckPenNameUsed),
    error: errorPenName,
    errorMessage: createErrorMessage({
      name: "필명",
      used: penNameUsed,
      valid: penNameValid
    })
  }, {
    value: email,
    onChange: handleInputEmail(onCheckEmailUsed),
    error: errorEmail,
    errorMessage: createErrorMessage({
      name: "이메일",
      used: emailUsed,
      valid: emailValid
    }) 
  }, {
    value: password,
    onChange: handleInputPwd(),
    error: errorPwd,
    errorMessage: createErrorMessage({
      name: "비밀번호",
      valid: passwordValid
    }) 
  }), [
    lastName,
    handleInputLName,
    errorLastName,
    firstName,
    handleInputFName,
    errorFirstName,
    penName,
    penNameUsed,
    penNameValid,
    handleInputPName,
    errorPenName,
    email,
    emailUsed,
    emailValid,
    handleInputEmail,
    errorPenName,
    password,
    passwordValid,
    handleInputPwd,
    errorPwd,
    createErrorMessage
  ]);

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
    }

  }

  useEffect(() => {
    if(penName) {
      if(!regPenName.test(penName)) {
        setPNValid(true);
        if(!errorPenName) handleErrorPName(true);
      } else {
        setPNValid(false);
      }

      if(signUpState.penNameUsed) {
        setPNUsed(true);
        if(!errorPenName) handleErrorPName(true);
      } else {
        setPNUsed(false);
      }
    }
  }, [penName, signUpState.penNameUsed]);

  useEffect(() => {
    if(email) {
      if(!regEmail.test(email)) {
        setEmailValid(true);
        if(!errorEmail) handleErrorEmail(true);
      } else {
        setEmailValid(false);
      }

      if(signUpState.emailUsed) {
        setEmailUsed(true);
        if(!errorEmail) handleErrorEmail(true);
      } else {
        setEmailUsed(false);
      }
    }
  }, [email, signUpState.emailUsed]);

  useEffect(() => {
    if(password) {
      if(!regPassword.test(password)) {
        setPwdValid(true);
        handleErrorPwd(true);
      } else {
        setPwdValid(false);
      }
    }
  }, [password]);

  return {
    handleSubmit,
    inputPropsList
  }
}

export default useSignUp;