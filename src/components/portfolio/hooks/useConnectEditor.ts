import { useEffect } from "react";
import { ReturnConnectStoreHook } from "../../block";
import { UseBlockType } from "../../block/hooks/useBlock";
import { RawBlockData } from "../../block/types";

const initialBlockList: RawBlockData[] = [
  {
    position: "1",
    id: "d5cc2725-92ec-494b-bc80-c16f96379e61",
    type: "text",
    styleType: "bk-p",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["안녕하세요.", [["b"]]]
    ]
  },
  {
    position: "2",
    id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    type: "text",
    styleType: "bk-p",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["Bklog 데모입니다.", [["b"]]]
    ]
  }
]

function useConnectEditor(useBlockReducer: UseBlockType): ReturnConnectStoreHook {
  const updated = false;

  const {
    onInitBlockState
  } = useBlockReducer;

  useEffect(() => {
    onInitBlockState(initialBlockList);
  }, []);
  
  return {
    updated
  }
}

export default useConnectEditor;