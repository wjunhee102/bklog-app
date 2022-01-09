import { NavigateFunction, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useBKlog from "../../../hooks/useBKlog";
import { useEffect, useState } from "react";
import useStoreReset from "../../../hooks/useStoreReset";

// function handleErrorPopup({
//   type, 
//   code
// }: { type: string, code: string | number}, 
//   navigate?: NavigateFunction){
//     return () => {
//       if(type === "AUTH" && code == "002" && history) {
//         navigate("/home");
//       }
//   } 
// }

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

  const navigate = useNavigate();

  const handleCallback = () => {
    onAllReset();
    navigate("/home");
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