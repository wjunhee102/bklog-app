import { useHistory } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useBKlog from "../../../hooks/useBKlog";
import { History } from 'history';
import { useEffect, useState } from "react";
import useStoreReset from "../../../hooks/useStoreReset";

function handleErrorPopup({
  type, 
  code
}: { type: string, code: string | number}, 
  history?: History<unknown>){
    return () => {
      if(type === "AUTH" && code == "002" && history) {
        history.push("/home");
      }
  } 
}

function useBkPage() {
  const [ errMessage, setErrMessage ] = useState<string>(null);
  const [ errorToggle, setErrToggle ] = useState<boolean>(false);

  const {
    authState,
    onCheckToken,
  } = useAuth();

  const {
    bklogState
  } = useBKlog();

  const {
    onAllReset
  } = useStoreReset();

  const history = useHistory();

  const handleCallback = () => {
    onAllReset();
    history.push("/home");
  } 

  useEffect(() => {
    if(bklogState.error) {
      if(bklogState.error.type !== "Bklog" && bklogState.error.code !== "002" && bklogState.error.code !== "004") {
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

export default useBkPage;