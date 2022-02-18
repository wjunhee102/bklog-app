import { checkInstanceOfBlockList } from "../service/block/utils";
import { ModifyBlockService } from "../service/modify/block/ModifyBlockService";
import { Block } from "./block/abstract/Block";
import { NumberedBlock } from "./block/text/NumberedBlock";
import { TextBlock } from "./block/text/TextBlock";
import { UnionBlockData, TextBlockData, TextGenericType, UnionBlock } from "./block/type";
import { ModifyBlockToken } from "./modify/block/ModifyBlockToken";
import { ModifyDataToken } from "./modify/ModifyDataToken";

const TEXT_BLOCK = {
  position: "1",
  index: 1,
  parentId: "root",
  id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
  type: "text",
  styleType: "bk-h1",
  styles: null,
  contents: [
    ["블록 1입니다.", ["b"]],
    ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
    ["는 ", [["i"]]],
    ["황준희    ", [["b"], ["_"]]],
    [" 입니다.", [["fc", "#f00"]]]
  ]
}

const TEST_BLOCK_1: Array<UnionBlockData> = [
  {
    position: "1",
    index: 1,
    parentId: "root",
    id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-1",
    index: 2,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    id: "d5cc2725-97ec-494b-bc80-c163f96379e62",
    type: "numbered",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-2",
    index: 3,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    id: "d5cc2725-97ec-494b-bc80-c16f496379e63",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-2-1",
    index: 4,
    parentId: "d5cc2725-97ec-494b-bc80-c16f496379e63",
    id: "d5cc2725-97ec-494b-bc80-c162f96379e64",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  }
];
const TEST_BLOCK_2: UnionBlockData[] = [
  {
    position: "1-1-1",
    index: 1,
    parentId: "root",
    id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-1-1-1",
    index: 2,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    id: "d5cc2725-97ec-494b-bc80-c163f96379e62",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "1-1-1-2",
    index: 3,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e61",
    id: "d5cc2725-97ec-494b-bc80-c16f496379e63",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  },
  {
    position: "2-2",
    index: 4,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e62",
    id: "d5cc2725-97ec-494b-bc80-c162f96379e64",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."],
      ["저", [["b"], ["fc", "#c0f"], ["bc", "#000"], ["i"],["a", "https://www.naver.com"]]],
      ["는 ", [["i"]]],
      ["황준희    ", [["b"], ["_"]]],
      [" 입니다.", [["fc", "#f00"]]]
    ]
  }
]



test('create Block', () => {
  const test1 = new TextBlock(TEXT_BLOCK as TextBlockData);
  const test2 = new NumberedBlock(TEST_BLOCK_1[1] as TextBlockData);

  expect(test1.getBlockData().id).toEqual(TEXT_BLOCK.id);
  expect(test2).toBeInstanceOf(Block);
})

function createBlockList(blockDataList: UnionBlockData[]) {
  let blockList: UnionBlock[] = [];

  for(const blockData of blockDataList) {
    
    switch(blockData.type) {

      case "text":
        blockList.push(new TextBlock(blockData));
      break;

      case "numbered": 
        blockList.push(new NumberedBlock(blockData));
      break;

    }

  }

  return blockList;
}


test('create Block List',  () => {
  const blockList = createBlockList(TEST_BLOCK_2);
  expect(checkInstanceOfBlockList(blockList)).toEqual(true);
})

test('findIndex', () => {
  const test: string[] = [];
  const test2 = "1";

  expect(test.findIndex(t => t === test2)).toEqual(-1);
});

test('create ModifyDataToken', () => {
  const data = Block.createBlockData<TextGenericType>("text", { index: 1 });
  
  if(!data) return false;

  const test = ModifyBlockService.setCreateModifyData(data);
  
  const token = new ModifyBlockToken(test);

  expect(token).toBeInstanceOf(ModifyDataToken);
});

test('update Block', () => {
 
  const data = Block.createBlockData<TextGenericType>('numbered', { index: 1});
  if(!data) return false;

  const numberedBlock = new NumberedBlock(data);
  numberedBlock.setOrder(5);

  expect(numberedBlock.regeneration({ index: 4 })[0].index).toEqual(4);

})
