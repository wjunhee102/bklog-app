import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { ALL_RESET } from "../store/utils";

function useStoreReset() {
  const dispatch = useDispatch();

  const onAllReset = useCallback(() => {
    dispatch({type: ALL_RESET});
  }, [dispatch]);

  return {
    onAllReset
  }
}

export default useStoreReset;