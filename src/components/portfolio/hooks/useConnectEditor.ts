import { useEffect } from "react";
import { ReturnConnectStoreHook } from "../../block";
import { UnionRawBlockData } from "../../block/entities/block/type";
import { UseBlockType } from "../../block/hooks/useBlock";
import { ModifyBlockService } from "../../block/service/modify/block/ModifyBlockService";

const initialBlockList: UnionRawBlockData[] = [
  {
    position: "1",
    id: "T1",
    type: "text",
    styleType: "bk-p",
    styles: null,
    contents: [
      ["안녕하세요.", [["b"]]]
    ]
  },
  {
    position: "2",
    id: "T2",
    type: "text",
    styleType: "bk-p",
    styles: null,
    contents: [
      ["Bklog 데모입니다.", [["b"]]]
    ]
  },
  {
    position: "3",
    id: "T3",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 203, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
    ]
  },
  {
    position: "3-1",
    id: "T3-1",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(0, 203, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
    ]
  },
  {
    position: "3-2",
    id: "T3-2",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 103, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
    ]
  },
  {
    position: "4",
    id: "T4",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 103, 255)"], ["a", "https://www.notion.so/Bklog-3445d5ed743d4223923ab33cc7565b36"]]]
    ]
  },
  {
    position: "5",
    id: "T5",
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