import { Block } from "../../entities/block/abstract/Block";
import { NumberedBlock } from "../../entities/block/text/NumberedBlock";
import { TextBlock } from "../../entities/block/text/TextBlock";
import { StagedBlockData, TextGenericType, UnionBlockData, UnionRawBlockData } from "../../entities/block/type";
import { BLOCK_CONTAINER } from "../../entities/block/type/types/container";
import { BLOCK_NUMBERED} from "../../entities/block/type/types/text";
import { HistoryBlockToken } from "../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { CreateRawHistoryBlockData, CreateRawModifyBlockData, UpdateRawHistoryBlockData } from "../../entities/modify/type";
import { HistoryBlockService } from "../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../modify/block/ModifyBlockService";
import { HistoryBlockData, ModifyBlockData } from "../modify/type";
import { BlockService } from "./BlockService";

const TEST_TYPE: typeof BLOCK_CONTAINER = "container2" as typeof BLOCK_CONTAINER;

const TEXT_BLOCK = {
  position: "1",
  index: 1,
  parentId: "root",
  id: "1",
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
const TEST_BLOCK_4: Array<UnionRawBlockData> = [
  {
    position: "1",
    id: "4T1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."]
    ]
  },
  {
    position: "1-1",
    id: "4T1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1-1입니다."]
    ]
  },
  {
    position: "1-1-1",
    id: "4T1-1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1-1-1입니다."]
    ]
  },
  {
    position: "2",
    id: "4T2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  },
  {
    position: "3",
    id: "4T3",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."]
    ]
  },
  {
    position: "4",
    id: "4T4",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."]
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

test("create BlockList", () => {
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

test("sort", () => {
  const [ blockDataList, modifyBlockTokenList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockList = BlockService.createBlockList(blockDataList);

  if(!blockList) return false;

  const result = new BlockService(blockList).sort().getBlockList().map(block => block.id);

  expect(result.join("-")).toEqual("2T1-2T1-1-2T2-2T3");
});

test("ordering", () => {
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

test("update blockList staged property", () => {
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

test("add block in list", () => {
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

test("remove block in list", () => {
  const [ blockDataList1 ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList1) return false;

  const blockList1 = BlockService.createBlockList(blockDataList1);

  if(!blockList1) return false;

  const blockService1 = new BlockService(blockList1).sort().ordering().removeBlockInList(["2T1"]);

  expect(blockService1.getBlockList().map(block => block.position).join(",")).toEqual("1,2,3");
  expect(blockService1.getData().modifyBlockTokenList.filter(data => data.command === "delete")[0].id).toEqual("2T1");
  expect(blockService1.getData().modifyBlockTokenList.filter(data => data.command === "update")[0].payload.position).toEqual('1');
  expect(blockService1.getData().historyBlockTokenList.filter(data => data.command === "create")[0].id).toEqual("2T1");
  expect(blockService1.getData().historyBlockTokenList.filter(data => data.command === "update")[0].payload.position).toEqual("1-1");
});

test("remove text block in list", () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockList1 = BlockService.createBlockList(blockDataList);

  if(!blockList1) return false;

  const blockService = new BlockService(blockList1).sort().ordering().removeTextBlockInLIst(2, 1, "블록2입니다.");
  
  const { blockList, modifyBlockTokenList, historyBlockTokenList } = blockService.getData();

  if(!(modifyBlockTokenList[0] && historyBlockTokenList[0])) return false;

  const m1 = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[3].id)[0];
  const m2 = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[0].id)[0];
  const h1 = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[3].id)[0];
  const h2 = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[0].id)[0];

  expect(blockList.map(block => block.position).join(",")).toEqual("1,1-1,2");
  expect(blockList[1].contents[0][0]).toEqual("블록 2입니다.블록2입니다.");
  expect(m1.command).toEqual("delete");
  expect(m2.payload.contents[0][0]).toEqual("블록 2입니다.블록2입니다.");
  expect(h1.command).toEqual("create");
  expect(h2.payload.contents[0][0]).toEqual("블록 2입니다.");
});

test("change block position", () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockService = new BlockService(BlockService.createBlockList(blockDataList));

  const { 
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = blockService.sort().ordering().changeBlockPosition(["2T1-1"], "3").getData();

  expect(blockList[TEST_BLOCK_2.length-1].position).toEqual("4");
  expect(modifyBlockTokenList.filter(data => data.command === "update")[0].payload.position).toEqual("4");
  expect(historyBlockTokenList.filter(data => data.command === "update")[0].payload.position).toEqual(TEST_BLOCK_2[0].position);
});

test("switchBlockList", () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockService = new BlockService(BlockService.createBlockList(blockDataList));

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = blockService.sort().ordering().switchBlockList(["2T1"], "3").getData();

  const m1 = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[0].id)[0];
  const m2 = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[1].id)[0];
  const h1 = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[0].id)[0];
  const h2 = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[1].id)[0];

  expect(blockList.map(block => block.position).join(",")).toEqual("1,2,3,4");
  expect(blockList[TEST_BLOCK_2.length-1].id).toEqual(TEST_BLOCK_2[1].id);
  expect(modifyBlockTokenList.length).toEqual(2);
  expect(historyBlockTokenList.length).toEqual(2);
  expect(m1.payload.position).toEqual("1");
  expect(m2.payload.position).toEqual("4");
  expect(h1.payload.position).toEqual(TEST_BLOCK_2[0].position);
  expect(h2.payload.position).toEqual(TEST_BLOCK_2[1].position);

});

test('update block list', () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_4);

  if(!blockDataList) return false;

  const blockService = new BlockService(BlockService.createBlockList(blockDataList)).sort().ordering();

  const initPosition = blockService.getBlockList().map(block => block.position).join(',');
  const blockContents1: string = blockService.getBlockList()[1].contents[0][0];
  let block1: TextBlock = blockService.getBlockList()[1] as TextBlock;
  
  block1 = block1.regeneration({
    id: "4T5",
    position: "4",
    contents: [["블럭 5입니다."]]
  })[0];

  const modifyBlockData: ModifyBlockData = {
    create: [
      new ModifyBlockToken(
        ModifyBlockService
        .setCreateModifyData(block1.getBlockData()))
        .getRawData() as CreateRawModifyBlockData
    ],
    update: [
      {
        id: "4T1-1",
        payload: {
          contents: [["반갑습니다."]]
        }
      }
    ],
    delete: ["4T4"]
  }

  const blockService2 = new BlockService(blockService.getBlockList()).updateBlockList(modifyBlockData);

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = blockService2.getData();

  expect(blockList.length).toEqual(TEST_BLOCK_4.length);
  expect(blockList[1].contents[0][0]).toEqual("반갑습니다.");
  expect(blockList[TEST_BLOCK_4.length-1].contents[0][0]).toEqual(block1.contents[0][0]);
  expect(blockList.filter(block => block.position === "4")[0].id).toEqual(block1.id);
  expect(modifyBlockTokenList.length).toEqual(0);
  expect(historyBlockTokenList.length).toEqual(3);

});

test('restore block list', () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_4);

  if(!blockDataList) return false;

  const blockService = new BlockService(BlockService.createBlockList(blockDataList)).sort().ordering();

  const initPosition = blockService.getBlockList().map(block => block.position).join(',');
  const blockContents1: string = blockService.getBlockList()[1].contents[0][0];
  const block1 = blockService.getBlockList()[1].regeneration({})[0];
  const block4 = blockService.getBlockList()[5].regeneration({})[0];

  const blockService2 = new BlockService(blockService.getBlockList());

  const { historyBlockTokenList } = blockService2.updateBlockListStagedProperty([{
    id: "4T1-1",
    index: 1,
    contents: [["반갑습니다."]]
  }]).getData();

  const blockContents2: string = blockService2.getBlockList()[1].contents[0][0];

  const blockContents3: string = blockService2
    .restoreBlockList({ update: [historyBlockTokenList[0].getRawData() as UpdateRawHistoryBlockData]})
    .getBlockList()[1].contents[0][0];

  const historyList = blockService2
  .removeBlockInList([block1.id, block4.id])
  .getData()
  .historyBlockTokenList;

  const historyBlockData: HistoryBlockData = {
    create: historyList
    .filter(token => token.command === "create")
    .map(token => token.getRawData() as CreateRawHistoryBlockData),
    update: historyList
    .filter(token => token.command === "update")
    .map(token => token.getRawData() as UpdateRawHistoryBlockData)
  } 

  const changedPosition = blockService2
    .restoreBlockList(historyBlockData)
    .getBlockList()
    .map(block => block.position)
    .join(',');

  expect(changedPosition).toEqual(initPosition);
  expect(blockContents1).toEqual(blockContents3);
  expect(blockContents2).toEqual("반갑습니다.");

});

test("change block type", () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_4);

  if(!blockDataList) return false;

  const blockService = new BlockService(BlockService.createBlockList(blockDataList));

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = blockService.changeBlockType(0, BLOCK_NUMBERED).changeBlockType(0, BLOCK_CONTAINER).getData();

  expect(blockList[0]).toBeInstanceOf(NumberedBlock);
  expect(modifyBlockTokenList.length).toEqual(1);
  expect(historyBlockTokenList.length).toEqual(1);
  expect(modifyBlockTokenList[0].payload.type).toEqual(BLOCK_NUMBERED);
  expect(historyBlockTokenList[0].payload.type).toEqual(TEST_BLOCK_4[0].type);

});