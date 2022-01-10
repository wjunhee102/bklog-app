import { NavigateFunction, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import useBklog from "../../../hooks/useBklog"
import { useEffect, useState } from "react";
import useStoreReset from "../../../hooks/useStoreReset";
import usePage from "../../../hooks/usePage";

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

export interface BkPageHooksTypes {
  useBklogHooks: ReturnType<typeof useBklog>;
  usePageHooks: ReturnType<typeof usePage>;
  useAuthHooks: ReturnType<typeof useAuth>;
}

function useBkPage() {
  const [ errMessage, setErrMessage ] = useState<string>(null);
  const [ errorToggle, setErrToggle ] = useState<boolean>(false);

  const useAuthHooks = useAuth();
  const useBklogHooks = useBklog();
  const usePageHooks = usePage();

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

  const navigate = useNavigate();

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
    errMessage,
    bkPageHooks: { useAuthHooks, useBklogHooks, usePageHooks }
  }
}

export default useBkPage;