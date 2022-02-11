import { RawBlockData, RawBlockDataProps, UnionBlockGenericType, UnionRawBlockData } from "../../entities/block/type";
import { HistoryBlockToken } from "../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockService } from "./block/HistoryBlockService";
import { ModifyBlockService } from "./block/ModifyBlockService";


const TEST_BLOCK_1: Array<RawBlockData<UnionBlockGenericType>> = [
  {
    position: "1",
    id: "T-1",
    type: "text",
    styleType: "bk-h2",
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

const TEST_BLOCK_2: Array<RawBlockDataProps<UnionBlockGenericType>> = [
  {
    position: "1",
    id: "T2-1",
    type: "numbered",
    contents: ["테스트"]
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

test('push modifyBlockService', () => {
  const m1 = new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(TEST_BLOCK_1[0].id, TEST_BLOCK_2[0]));
  const m2 = new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(TEST_BLOCK_1[0].id, TEST_BLOCK_1[0]));
  const m3 = new ModifyBlockToken(ModifyBlockService.setCreateModifyData(TEST_BLOCK_1[0]));
  const m4 = new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(TEST_BLOCK_1[1].id, TEST_BLOCK_2[0]));

  const modifyBlockService = new ModifyBlockService([m1, m2, m3, m4]).merge();

  expect(modifyBlockService.getTokenList().length).toEqual(2);
  expect(modifyBlockService.getTokenList()[0].command).toEqual("create");
});

test('push historyBlockService', () => {
  const h1 = new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(TEST_BLOCK_1[0].id, TEST_BLOCK_2[0]));
  const h2 = new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(TEST_BLOCK_1[0].id, TEST_BLOCK_1[0]));
  const h3 = new HistoryBlockToken(HistoryBlockService.setCreateModifyData(TEST_BLOCK_1[0]));
  const h4 = new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(TEST_BLOCK_1[1].id, TEST_BLOCK_2[0]));

  const historyBlockService = new HistoryBlockService([h1, h2, h3, h4]).merge();

  expect(historyBlockService.getTokenList().length).toEqual(2);
  expect(historyBlockService.getTokenList()[1].command).toEqual("create");
});