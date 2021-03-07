import { BaseState, changeDarkMode } from "../store/modules/base/utils";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/modules";
import { useCallback } from "react";

function useBase() {
  const state: BaseState = useSelector((state: RootState) => state.base);

  const dispatch = useDispatch();

  const onChangeMode = useCallback(()=> dispatch(changeDarkMode()), [dispatch]);;

  return {
    baseState: state,
    onChangeMode
  }
}

export default useBase;