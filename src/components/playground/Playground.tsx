import React, { useEffect } from 'react';
import BlockEditor, { ReturnConnectStoreHook } from '../block';
import { UnionRawBlockData } from '../block/entities/block/type';
import { UseBlockType } from '../block/hooks/useBlock';

const initialBlockList: UnionRawBlockData[] = [
  {
    parentId: null,
    previousId: null,
    id: "T1",
    type: "text",
    styleType: "bk-p",
    styles: null,
    contents: [
      ["안녕하세요.", [["b"]]]
    ]
  },
  {
    parentId: null,
    previousId: "T1",
    id: "T2",
    type: "text",
    styleType: "bk-p",
    styles: null,
    contents: [
      ["Bklog 데모입니다.", [["b"]]]
    ]
  },
  {
    parentId: null,
    previousId: "T2",
    id: "T3",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 203, 255)"]]]
    ]
  },
  {
    parentId: "T3",
    previousId: null,
    id: "T3-1",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(0, 203, 255)"]]]
    ]
  },
  {
    parentId: "T3",
    previousId: "T3-1",
    id: "T3-2",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 103, 255)"]]]
    ]
  },
  {
    parentId: null,
    previousId: "T3",
    id: "T4",
    type: "text",
    styleType: "bk-h4",
    styles: null,
    contents: [
      ["문서", [["b"], ["fc", "rgb(73, 103, 255)"]]]
    ]
  },
  {
    parentId: null,
    previousId: "T4",
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
      blockList,
      modifyBlockTokenList
    },
    onInitBlockState,
    onInitPageTitle
  } = useBlockReducer;

  useEffect(() => {
    onInitBlockState(initialBlockList);
    onInitPageTitle("안녕하세요");
  }, []);

  useEffect(() => {
    console.log(blockList);
    console.log(modifyBlockTokenList);
  }, [blockList]);

  return {
    updated
  }
}

const Playground: React.FC = () => {
  return (
    <div className="playground">
      <BlockEditor connectStoreHook={useConnectEditor} />
    </div>
  );
}

export default Playground;