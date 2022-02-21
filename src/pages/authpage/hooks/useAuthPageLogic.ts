import { useEffect, useState } from "react";
import { UseAuthPageTypes } from "./useAuthPage";

function useAuthPageLogic({
  useAuthHooks,
  usePageHooks,
  navigate
}: UseAuthPageTypes) {
  const [ errMessage, setErrMessage ] = useState<string | null>(null); 

  const {
    authState: { user, error, loading, errorToggle, signUpSuccess },  
    onResetError
  } = useAuthHooks;

  const {
    onChangeToggle
  } = usePageHooks;

  useEffect(() => {
    if(user) {
      onChangeToggle(true);
      navigate(`/bklog/id/${user.id}`);
    }
  },[user]);

  useEffect(() => {
    if(error) {
      setErrMessage(error.message);
    } else {
      setErrMessage(null);
    }
  }, [error]);

  useEffect(() => {
    if(error) {
      onResetError();
    }
  }, []);

  useEffect(() => {
    if(signUpSuccess) {
      navigate(`/auth/sign-in`);
    }
  }, [signUpSuccess]);

  return {
    errMessage,
    errorToggle,
    onResetError,
    loading
  }
}

export default useAuthPageLogic;