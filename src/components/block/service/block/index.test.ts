import { Block } from "../../entities/block/abstract/Block";
import { UnionBlockData, UnionRawBlockData } from "../../entities/block/type";
import { BlockService } from "./BlockService";

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

const TEST_BLOCK_1: Array<UnionRawBlockData> = [
  {
    position: "1",
    id: "T-1",
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
    id: "T-1-1",
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
    id: "T-1-2",
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
    id: "T-1-2-1",
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

const TEST_BLOCK_2: Array<UnionBlockData> = [
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

test('create BlockList', () => {
  const { blockDataList, modifyBlockTokenList } = BlockService.createBlockDataList(TEST_BLOCK_1);

  if(!blockDataList) {
    console.log(modifyBlockTokenList);

    return false;
  }

  const blockList = BlockService.createBlockList(blockDataList);

  if(!blockList) {
    return false;
  }

  console.log(blockList);

  console.log(new BlockService(blockList).sort().ordering().getData());

  expect(blockList[0]).toBeInstanceOf(Block);
  expect(blockList.length).toEqual(TEST_BLOCK_1.length);
});