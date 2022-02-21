import { useEffect } from "react";
import { ReturnConnectStoreHook } from "../../block";
import { UnionRawBlockData } from "../../block/entities/block/type";
import { UseBlockType } from "../../block/hooks/useBlock";
import { ModifyBlockService } from "../../block/service/modify/block/ModifyBlockService";

const initialBlockList: UnionRawBlockData[] = [
  {
    position: "1",
    id: "d5cc272592ec494bbc80c16f96379e61",
    type: "text",
    styleType: "bk-p",
    styles: null,
    contents: [
      ["안녕하세요.", [["b"]]]
    ]
  },
  {
    position: "2",
    id: "d5cc272597ec494bbc80c16f96379e62",
    type: "text",
    styleType: "bk-p",
    styles: null,
    contents: [
      ["Bklog 데모입니다.", [["b"]]]
    ]
  },
  {
    position: "3",
    id: "d5cc272597ec494bbc80c16f96379a61",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 203, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
    ]
  },
  {
    position: "3-1",
    id: "d5cc272597ec494bbc80c16f96379261",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(0, 203, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
    ]
  },
  {
    position: "3-2",
    id: "d5cc2725d7ec494bbc80c16f96379261",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 103, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
    ]
  },
  {
    position: "4",
    id: "d5cc2725d7esc494bbc80c16f96379261",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 103, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
    ]
  },
  {
    position: "5",
    id: "d5cc2725d7ec494bbc80c13d6f96379261",
    type: "image",
    styleType: "none",
    styles: {
      width: "150px"
    },
    contents: {
      url: "/img/smile.png"
    }
  }
]

function useConnectEditor(useBlockReducer: UseBlockType): ReturnConnectStoreHook {
  const updated = false;

  const {
    state: {
      preBlockInfo,
      modifyBlockTokenList,
      historyBack
    },
    onInitBlockState
  } = useBlockReducer;

  useEffect(() => {
    onInitBlockState(initialBlockList);
  }, []);

  useEffect(() => {
    console.log(new ModifyBlockService(modifyBlockTokenList, true).getData());
  }, [modifyBlockTokenList]);

  useEffect(() => {
    console.log(preBlockInfo);
  }, [preBlockInfo]);

  useEffect(() => {
    console.log(historyBack);
  }, [historyBack]);
  
  return {
    updated
  }
}

export default useConnectEditor;