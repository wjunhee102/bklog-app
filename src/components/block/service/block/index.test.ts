import { Block } from "../../entities/block/abstract/Block";
import { StagedBlockData, TextGenericType, UnionBlockData, UnionRawBlockData } from "../../entities/block/type";
import { BLOCK_CONTAINER } from "../../entities/block/type/types/container";
import { HistoryBlockToken } from "../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockService } from "../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../modify/block/ModifyBlockService";
import { BlockService } from "./BlockService";

const TEST_TYPE: typeof BLOCK_CONTAINER = "container2" as typeof BLOCK_CONTAINER;

const TEXT_BLOCK = {
  position: "1",
  index: 1,
  parentId: "root",
  id: "d5cc2725-97ec-494b-bc80-c16f96379e61",
  type: "text",
  styleType: "bk-h1",
  styles: null,
  contents: [
    ["블록 1입니다.", ["b"]]
  ]
}

const TEST_NOT_BLOCK = {
  position: "1-1",
  id: "T1-1CONTAINER",
  type: TEST_TYPE,
  styleType: "container",
  styles: null,
  contents: {}
}

const TEST_BLOCK_1: Array<UnionRawBlockData> = [
  {
    position: "1",
    id: "T1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."]
    ]
  },
  {
    position: "1-1",
    id: "T1-1",
    type: "numbered",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  },
  {
    position: "1-1",
    id: "T1-2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."]
    ]
  },
  {
    position: "1-2-4",
    id: "T1-2-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."]
    ]
  }
];

const TEST_BLOCK_2: Array<UnionRawBlockData> = [
  {
    position: "1-1",
    id: "2T1-1",
    type: "numbered",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  },
  {
    position: "1",
    id: "2T1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1-1입니다."]
    ]
  },
  {
    position: "3",
    id: "2T3",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."]
    ]
  },
  {
    position: "2",
    id: "2T2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  }
];

const TEST_BLOCK_3: Array<UnionBlockData> = [
  {
    position: "2-2",
    index: 4,
    parentId: "root",
    id: "3T2-2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."]
    ]
  },
  {
    position: "1-1-1",
    index: 1,
    parentId: "root",
    id: "3T1-1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."]
    ]
  },
  {
    position: "1-1-1-2",
    index: 3,
    parentId: "3T1-1-1",
    id: "3T1-1-1-2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."]
    ]
  },
  {
    position: "1-1-1-1",
    index: 2,
    parentId: "3T1-1-1",
    id: "3T1-1-1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  }
]

// parentId가 없을 경우
const TEST_BLOCK_4: Array<UnionBlockData> = [
  {
    position: "2-2",
    index: 4,
    parentId: "d5cc2725-97ec-494b-bc80-c16f96379e62",
    id: "4T2-2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."]
    ]
  },
  {
    position: "1-1-1",
    index: 1,
    parentId: "root",
    id: "4T1-1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."]
    ]
  },
  {
    position: "1-1-1-2",
    index: 3,
    parentId: "",
    id: "4T1-1-1-2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."]
    ]
  },
  {
    position: "1-1-1-1",
    index: 2,
    parentId: "",
    id: "4T1-1-1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  }
]

const TEST_STAGE_1: Array<StagedBlockData<TextGenericType>> = [
  {
    id: "T1",
    index: 0,
    contents: [["안녕하세요"]]
  },
  {
    id: "T1-1",
    index: 1,
    contents: [["반갑습니다."]]
  }
]

test('create BlockList', () => {
  const [ blockDataList, modifyBlockTokenList ] = BlockService.createBlockDataList([TEST_NOT_BLOCK, ...TEST_BLOCK_1]);

  if(!blockDataList) {
    return false;
  }

  const blockList = BlockService.createBlockList(blockDataList);

  if(!blockList) return false;
  
  if(!modifyBlockTokenList) return false;

  new BlockService(blockList).sort().ordering().getData();
  expect(modifyBlockTokenList[0].id).toEqual('T1-1CONTAINER');
  expect(blockList[0]).toBeInstanceOf(Block);
  expect(blockList.length).toEqual(TEST_BLOCK_1.length);
  expect(blockList[3].position).toEqual('1-2-1');
});

test('sort', () => {
  const [ blockDataList, modifyBlockTokenList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockList = BlockService.createBlockList(blockDataList);

  if(!blockList) return false;

  const result = new BlockService(blockList).sort().getBlockList().map(block => block.id);

  expect(result.join("-")).toEqual("2T1-2T1-1-2T2-2T3");
});

test('ordering', () => {
  const modifyBlockService = new ModifyBlockService([]);
  const historyBlockService = new HistoryBlockService([]);
  const [ blockDataList, modifyBlockTokenList ] = BlockService.createBlockDataList(TEST_BLOCK_3);

  if(!blockDataList) {
    return false;
  }

  const blockList = BlockService.createBlockList(blockDataList);

  if(!blockList) {
    return false;
  }
  const blockService = new BlockService(blockList);
  
  const sortedPosition = blockService.sort().getBlockList().map(block => block.position).join(',');

  expect(sortedPosition).toEqual("1-1-1,1-1-1-1,1-1-1-2,2-2");

  const [ resetedBlockList , historyBlockTokenList ] = BlockService.resetToTargetPosition(blockList, '1');

  expect(blockList.map(block => block.position).join(',')).toEqual("1,1-1,1-1,1");

  const orderedPosition = blockService.ordering().getBlockList().map(block => block.position).join(',')

  expect(orderedPosition).toEqual("1,1-1,1-2,2");

  const result = blockService.getData();

  if(result.modifyBlockTokenList) modifyBlockService.push(...result.modifyBlockTokenList);

  if(result.historyBlockTokenList) historyBlockService.push(...result.historyBlockTokenList);

  historyBlockService.pushReverse(...historyBlockTokenList);

});

test('update blockList staged property', () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_1);

  if(!blockDataList) return false;

  const blockList = BlockService.createBlockList(blockDataList);

  if(!blockList) return false;

  const blockService = new BlockService(blockList);

  blockService.sort().ordering().updateBlockListStagedProperty(TEST_STAGE_1);

  const { modifyBlockTokenList, historyBlockTokenList } = blockService.getData();

  if(!modifyBlockTokenList[0]) return false;
  if(!historyBlockTokenList[0]) return false;

  const modifyBlock1: ModifyBlockToken<TextGenericType> = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_1[0].id)[0] as ModifyBlockToken<TextGenericType>;
  const modifyBlock2: ModifyBlockToken<TextGenericType> = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_1[1].id)[0] as ModifyBlockToken<TextGenericType>;
  const historyBlock1: HistoryBlockToken<TextGenericType> = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_1[0].id)[0] as HistoryBlockToken<TextGenericType>;
  const historyBlock2: HistoryBlockToken<TextGenericType> = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_1[1].id)[0] as HistoryBlockToken<TextGenericType>;

  let M1contents: string = "";
  let M2contents: string = "";
  let H1contents: string = "";
  let H2contents: string = "";

  if(modifyBlock1.payload.contents) M1contents = modifyBlock1.payload.contents[0][0];
  if(modifyBlock2.payload.contents) M2contents = modifyBlock2.payload.contents[0][0];
  if(historyBlock1.payload.contents) H1contents = historyBlock1.payload.contents[0][0];
  if(historyBlock1.payload.contents) H2contents = historyBlock2.payload.contents[0][0];

  expect(blockService.getBlockList().map(block => block.position).join(',')).toEqual("1,1-1,1-2,1-2-1")
  expect(blockService.getBlockList()[0].contents[0][0]).toEqual("안녕하세요");
  expect(blockService.getBlockList()[1].contents[0][0]).toEqual("반갑습니다.");
  expect(M1contents).toEqual("안녕하세요");
  expect(M2contents).toEqual("반갑습니다.");
  expect(H1contents).toEqual(TEST_BLOCK_1[0].contents[0][0]);
  expect(H2contents).toEqual(TEST_BLOCK_1[1].contents[0][0]);
});

test('add block in list', () => {
  const [ blockDataList1 ] = BlockService.createBlockDataList(TEST_BLOCK_2);
  const [ blockDataList2 ] = BlockService.createBlockDataList(TEST_BLOCK_3);

  if(!(blockDataList1 && blockDataList2)) return false;

  const blockList1 = BlockService.createBlockList(blockDataList1);
  const blockList2 = BlockService.createBlockList(blockDataList2);

  if(!(blockList1 && blockList2)) return false;

  const blockService = new BlockService(blockList1).sort().ordering();

  expect(blockService.getBlockList().map(block => block.position).join(',')).toEqual("1,1-1,2,3");

  new BlockService(blockList2).sort();
  const { 
    blockList, 
    modifyBlockTokenList,
    historyBlockTokenList
  } = blockService.addBlockInList(blockList2, "1-1").getData();

  if(!(modifyBlockTokenList[0] && historyBlockTokenList[0])) return false;

  expect(blockList.map(block => block.position).join(',')).toEqual("1,1-1,1-2,1-2-1,1-2-2,1-3,2,3");
  expect(modifyBlockTokenList
    .filter(data => data.command === "create")
    .map(data => data.payload.position)
    .join(",")).toEqual("1-2,1-2-1,1-2-2,1-3");
  expect(historyBlockTokenList
    .filter(data => data.command === "delete")
    .map(data => data.id)
    .join(",")).toEqual("3T2-2,3T1-1-1-2,3T1-1-1-1,3T1-1-1");
});

test('remove block in list', () => {
  const [ blockDataList1 ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList1) return false;

  const blockList1 = BlockService.createBlockList(blockDataList1);

  if(!blockDataList1) return false;

  const blockService1 = new BlockService(blockList1).sort().ordering().removeBlockInList(["2T1"]);
  console.log(blockService1.getData().modifyBlockTokenList[1].payload);

  expect(blockService1.getBlockList().map(block => block.position).join(",")).toEqual("1,2,3");
  expect(blockService1.getData().modifyBlockTokenList.filter(data => data.command === "delete")[0].id).toEqual("2T1");
  expect(blockService1.getData().modifyBlockTokenList.filter(data => data.command === "update")[0].payload.position).toEqual('1');
  expect(blockService1.getData().historyBlockTokenList.filter(data => data.command === "create")[0].id).toEqual("2T1");
  expect(blockService1.getData().historyBlockTokenList.filter(data => data.command === "update")[0].payload.position).toEqual("1-1");
});

test('remove text block in list', () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockList = BlockService.createBlockList(blockDataList);

});

test('cahnge block position', () => {

});