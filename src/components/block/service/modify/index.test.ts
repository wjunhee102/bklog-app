import { BlockDataProps, RawBlockData, RawBlockDataProps, UnionBlockGenericType } from "../../entities/block/type";
import { HistoryBlockToken } from "../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { COMMAND_CREATE, COMMAND_DELETE, COMMAND_UPDATE, ModifyBlockGenericType, RawModifyData } from "../../entities/modify/type";
import { HistoryBlockService } from "./block/HistoryBlockService";
import { ModifyBlockService } from "./block/ModifyBlockService";
import { ModifyService } from "./ModifyService";


const TEST_BLOCK_1: RawBlockData<UnionBlockGenericType>[] = [
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

const TEST_BLOCK_2: RawBlockDataProps<UnionBlockGenericType>[] = [
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

const createRaw = {
  id: "T-1",
  command: COMMAND_CREATE,
  payload: TEST_BLOCK_1[0]
}
const updateRaw = {
  id: "T-1-1",
  command: COMMAND_UPDATE,
  payload: {
    position: "1"
  }
}
const deleteRaw = {
  id: "T-1-2",
  command: COMMAND_DELETE,
  payload: {}
}
const rawModifyDataList = [createRaw, updateRaw, deleteRaw];
const rawHistoryDataList = [Object.assign({}, createRaw, {
  payload: Object.assign({}, createRaw.payload, {
    index: 0,
    parentId: "root"
  })
}) , updateRaw, deleteRaw];

test("push modifyBlockService", () => {
  const m1 = new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(TEST_BLOCK_1[0].id, TEST_BLOCK_2[0]));
  const m2 = new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(TEST_BLOCK_1[0].id, TEST_BLOCK_1[0]));
  const m3 = new ModifyBlockToken(ModifyBlockService.setCreateModifyData(TEST_BLOCK_1[0]));
  const m4 = new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(TEST_BLOCK_1[1].id, TEST_BLOCK_2[0]));

  const modifyBlockService = new ModifyBlockService([m1, m2, m3, m4]).merge();

  expect(modifyBlockService.getTokenList().length).toEqual(2);
  expect(modifyBlockService.getTokenList()[0].command).toEqual("create");
});

test("push historyBlockService", () => {
  const h1 = new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(TEST_BLOCK_1[0].id, TEST_BLOCK_2[0]));
  const h2 = new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(TEST_BLOCK_1[0].id, TEST_BLOCK_1[0]));
  const h3 = new HistoryBlockToken(HistoryBlockService.setCreateModifyData(TEST_BLOCK_1[0]));
  const h4 = new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(TEST_BLOCK_1[1].id, TEST_BLOCK_2[0]));

  const historyBlockService = new HistoryBlockService([h1, h2, h3, h4]).merge();

  expect(historyBlockService.getTokenList().length).toEqual(2);
  expect(historyBlockService.getTokenList()[1].command).toEqual("create");
});

test("get modify block data", () => {
  const modifyBlockService = new ModifyBlockService(rawModifyDataList.map(raw => new ModifyBlockToken(raw)));
  const historyBlockService = new HistoryBlockService(rawHistoryDataList.map(raw => new HistoryBlockToken(raw)));

  const modifyBlockData = modifyBlockService.getData();
  const historyBlockData = historyBlockService.getData();

  if(!(modifyBlockData && historyBlockData)) return false;
  if(!(
    modifyBlockData.create 
    && modifyBlockData.update
    && modifyBlockData.delete
    && historyBlockData.create
    && historyBlockData.update
    && historyBlockData.delete
  )) return false;

  const modifyRawData = modifyBlockData.update[0] as RawModifyData<ModifyBlockGenericType<UnionBlockGenericType>>;
  
  expect(Object.keys(modifyBlockData).length).toEqual(3);
  expect(Object.keys(historyBlockData).length).toEqual(3);
  expect(modifyBlockData.create[0].payload.id).toEqual(TEST_BLOCK_1[0].id);
  expect(modifyRawData.payload.position).toEqual(updateRaw.payload.position);

});

test("get Modify bklog data", () => {
  const modifyBlockService = new ModifyBlockService(rawModifyDataList.map(raw => new ModifyBlockToken(raw)));

  const modifyService = new ModifyService({
    modifyBlockTokenList: modifyBlockService.getTokenList()
  });

  const modifyBklogData = modifyService.merge().getData();

  if(!modifyBklogData) return false;

  const modifyBlockData = modifyBklogData.blockData;

  if(!modifyBlockData) return false;

  if(!( 
    modifyBlockData.create 
    && modifyBlockData.update
    && modifyBlockData.delete
  )) return false;

  const modifyRawData = modifyBlockData.update[0] as RawModifyData<ModifyBlockGenericType<UnionBlockGenericType>>;
  
  expect(modifyBlockData.create[0].payload.id).toEqual(TEST_BLOCK_1[0].id);
  expect(modifyRawData.payload.position).toEqual(updateRaw.payload.position);
});