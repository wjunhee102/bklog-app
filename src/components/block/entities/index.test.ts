import { Block } from "./block/Block";
import { NumberedBlock } from "./block/text/NumberedBlock";
import { TextBlock } from "./block/text/TextBlock";
import { BlockData, TextBlockData } from "./block/type";

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

const TEST_BLOCK_1: Array<BlockData> = [
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
const TEST_BLOCK_2: BlockData[] = [
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

  console.log(test1, test2.getTextContents);

  console.log(test1.getTextContents, test1.getHtmlContents);

  expect(test1.getBlockData.id).toEqual(TEXT_BLOCK.id);
  expect(test2).toBeInstanceOf(Block);
})

function createBlockList(blockDataList: BlockData[]) {
  let blockList: Block<any>[] = [];

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

function checkInstanceOfBlock(blockList: Block<any>[]): boolean {

  for(const block of blockList) {

    switch(block.type) {
      case "text":
        if(block instanceof TextBlock === false) return false;
      
        break;

      case "numbered":
        if(block instanceof NumberedBlock === false) return false;
      
        break;
    }
  
  }

  return true;
}

test('create Block List',  () => {
  const blockList = createBlockList(TEST_BLOCK_2);

  expect(checkInstanceOfBlock(blockList)).toEqual(true);
})