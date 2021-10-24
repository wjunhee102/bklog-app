import { useEffect } from "react";
import { ReturnConnectStoreHook } from "../../block";
import { UseBlockType } from "../../block/hooks/useBlock";
import { RawBlockData } from "../../block/types";

const initialBlockList: RawBlockData[] = [
  {
    position: "1",
    id: "d5cc272592ec494bbc80c16f96379e61",
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
    id: "d5cc272597ec494bbc80c16f96379e62",
    type: "text",
    styleType: "bk-p",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["Bklog 데모입니다.", [["b"]]]
    ]
  },
  {
    position: "3",
    id: "d5cc272597ec494bbc80c16f96379a61",
    type: "text",
    styleType: "bk-h4",
    styles: {
      color: "black",
      backgroudColor: "white"
    },
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 203, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
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