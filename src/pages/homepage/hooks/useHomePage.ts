import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useBKlog from "../../../hooks/useBklog";
import usePage from "../../../hooks/usePage";
import useStoreReset from "../../../hooks/useStoreReset";


function useHomePage() {

  const {
    onAllReset
   } = useStoreReset();

   const {
    onChangeToggle,
    pageState
   } = usePage();

  useEffect(() => {
    onChangeToggle(false);
  }, [pageState.toggle]);
}

export default useHomePage;