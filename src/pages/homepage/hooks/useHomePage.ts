import { useEffect } from "react";
import useAuth from "../../../hooks/useAuth";
import useBKlog from "../../../hooks/useBKlog";
import usePage from "../../../hooks/usePage";
import useStoreReset from "../../../hooks/useStoreReset";


function useHomePage() {

  const {
    onAllReset
   } = useStoreReset();

  useEffect(() => {
    // onAllReset();
    console.log("reset");
  }, []);
}

export default useHomePage;