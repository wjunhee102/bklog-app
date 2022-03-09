import { useEffect } from "react";
import { ReturnConnectStoreHook } from "../../block";
import { UseBlockType } from "../../block/hooks/useBlock";
import { data } from "./initialData";

function useConnectEditor(useBlockReducer: UseBlockType): ReturnConnectStoreHook {
  const updated = false;

  const {
    onInitBlockState,
    onInitPageTitle
  } = useBlockReducer;

  useEffect(() => {
    onInitBlockState(data);
    onInitPageTitle("안녕하세요 Bklog입니다!");
  }, []);

  return {
    updated
  }
}

export default useConnectEditor;