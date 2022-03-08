import { NavigateFunction } from "react-router-dom";
import { useEffect, useState } from "react";
import useStoreReset from "../../../hooks/useStoreReset";
import { UseBkPageTypes } from "./useBkPage";

function handleErrorPopup({
  type, 
  code
}: { type: string, code: string | number}, 
  navigate?: NavigateFunction){
    return () => {
      if(type === "AUTH" && code == "002" && navigate) {
        navigate("/home");
      }
  } 
}

function useBkPageLogic({
  usePageHooks,
  useAuthHooks,
  useBklogHooks,
  navigate
}: UseBkPageTypes) {
  const [ errMessage, setErrMessage ] = useState<string | null>(null);
  const [ errorToggle, setErrToggle ] = useState<boolean>(false);

  const {
    authState,
    onCheckToken,
  } = useAuthHooks;

  const {
    bklogState
  } = useBklogHooks;

  const {
    onAllReset
  } = useStoreReset();

  const handleCallback = () => {
    onAllReset();
    navigate("/home");
  } 

  useEffect(() => {
    if(bklogState.error) {
      if(bklogState.error.type !== "Bklog" && bklogState.error.code !== "001" && bklogState.error.code !== "004") {
        setErrToggle(true);
        setErrMessage(bklogState.error.message);
      }
    } else if(authState.error) {
      setErrToggle(authState.errorToggle);
      setErrMessage(authState.error.message);
    } else {
      setErrToggle(false);
      setErrMessage(null);
    }
  }, [bklogState.error, authState.error]);

  return {
    handleCallback,
    errorToggle,
    errMessage
  }
}

export default useBkPageLogic;