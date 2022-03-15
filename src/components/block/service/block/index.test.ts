import { Block } from "../../entities/block/abstract/Block";
import { NumberedBlock } from "../../entities/block/text/NumberedBlock";
import { TextBlock } from "../../entities/block/text/TextBlock";
import { StagedBlockData, TextGenericType, UnionBlockData, UnionRawBlockData } from "../../entities/block/type";
import { BLOCK_CONTAINER } from "../../entities/block/type/types/container";
import { BLOCK_BULLETED, BLOCK_NUMBERED, BLOCK_TEXT} from "../../entities/block/type/types/text";
import { HistoryBlockToken } from "../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockService } from "../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../modify/block/ModifyBlockService";
import { HistoryBlockData, ModifyBlockData } from "../modify/type";
import { BlockService } from "./BlockService";
import { createBlockIdMap } from "./utils";

const TEST_TYPE: typeof BLOCK_CONTAINER = "container2" as typeof BLOCK_CONTAINER;

const TEXT_BLOCK = {
  parentId: null,
  previousId: null,
  index: 1,
  id: "1",
  type: "text",
  styleType: "bk-h1",
  styles: null,
  contents: [
    ["블록 1입니다.", ["b"]]
  ]
}

const TEST_NOT_BLOCK = {
  parentId: null,
  previousId: null,
  id: "T1-1CONTAINER",
  type: TEST_TYPE,
  styleType: "container",
  styles: null,
  contents: {}
}

const TEST_BLOCK_1: UnionRawBlockData[] = [
  {
    parentId: null,
    previousId: null,
    id: "T1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."]
    ]
  },
  {
    parentId: "T1",
    previousId: "1",
    id: "T1-1",
    type: "numbered",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  },
  {
    parentId: "T1",
    previousId: "2",
    id: "T1-2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."]
    ]
  },
  {
    parentId: "T1-2",
    previousId: "T1-2-2",
    id: "T1-2-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."]
    ]
  }
];

const TEST_BLOCK_2: UnionRawBlockData[] = [
  {
    parentId: "2T1",
    previousId: null,
    id: "2T1-1",
    type: "numbered",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  },
  {
    parentId: null,
    previousId: null,
    id: "2T1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1-1입니다."]
    ]
  },
  {
    parentId: null,
    previousId: "2T2",
    id: "2T3",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."]
    ]
  },
  {
    parentId: null,
    previousId: "2T1",
    id: "2T2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  }
];

const TEST_BLOCK_3: UnionBlockData[] = [
  {
    index: 4,
    parentId: null,
    previousId: "3T1-1-1",
    id: "3T2-2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."]
    ]
  },
  {
  
    index: 1,
    parentId: null,
    previousId: null,
    id: "3T1-1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."]
    ]
  },
  {
    previousId: "3T1-1-1-1",
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
    previousId: null,
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
const TEST_BLOCK_4: UnionRawBlockData[] = [
  {
    parentId: null,
    previousId: null,
    id: "4T1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1입니다."]
    ]
  },
  {
    parentId: "4T",
    previousId: null,
    id: "4T1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1-1입니다."]
    ]
  },
  {
    parentId: "4T1-1",
    previousId: null,
    id: "4T1-1-1",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 1-1-1입니다."]
    ]
  },
  {
    parentId: null,
    previousId: "4T1",
    id: "4T2",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 2입니다."]
    ]
  },
  {
    parentId: null,
    previousId: "4T2",
    id: "4T3",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 3입니다."]
    ]
  },
  {
    parentId: null,
    previousId: "4T3",
    id: "4T4",
    type: "text",
    styleType: "bk-h1",
    styles: null,
    contents: [
      ["블록 4입니다."]
    ]
  }
]

const TEST_STAGE_1: StagedBlockData<TextGenericType>[] = [
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

  new BlockService(blockList).sort().positioning().getData();

  expect(modifyBlockTokenList[0].id).toEqual('T1-1CONTAINER');
  expect(blockList[0]).toBeInstanceOf(Block);
  expect(blockList.length).toEqual(TEST_BLOCK_1.length);
  expect(blockList[3].previousId).toEqual(null);
});

test("sort", () => {
  const [ blockDataList, modifyBlockTokenList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockList = BlockService.createBlockList(blockDataList);

  if(!blockList) return false;

  const result = new BlockService(blockList).sort().getBlockList().map(block => block.id);

  expect(result.join(",")).toEqual("2T1,2T1-1,2T2,2T3");
});

test("sort", () => {
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
  
  const sortedId = blockService.sort().getBlockList().map(block => block.id).join(',');

  expect(sortedId).toEqual("3T1-1-1,3T1-1-1-1,3T1-1-1-2,3T2-2");

});

test("update blockList staged property", () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_1);

  if(!blockDataList) return false;

  const blockList = BlockService.createBlockList(blockDataList);

  if(!blockList) return false;

  const blockService = new BlockService(blockList);

  blockService.sort().positioning().updateBlockListStagedProperty(TEST_STAGE_1);

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

  expect(blockService.getBlockList().map(block => block.id).join(',')).toEqual("T1,T1-1,T1-2,T1-2-1")
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

  const blockService = new BlockService(blockList1).sort().positioning();

  expect(blockService.getBlockList().map(block => block.id).join(',')).toEqual("2T1,2T1-1,2T2,2T3");

  const { blockList: targetBlockList } = new BlockService(blockList2).sort().getData();

  const { 
    blockList, 
    modifyBlockTokenList,
    historyBlockTokenList
  } = blockService.addBlockInList(targetBlockList, "2T1", false).getData();
  console.log(historyBlockTokenList);
  if(!(modifyBlockTokenList[0] && historyBlockTokenList[0])) return false;

  expect(blockList.map(block => block.id).join(',')).toEqual("2T1,3T1-1-1,3T1-1-1-1,3T1-1-1-2,3T2-2,2T1-1,2T2,2T3");
  expect(modifyBlockTokenList
    .filter(data => data.command === "create")
    .map(data => data.payload.id)
    .join(",")).toEqual("3T1-1-1,3T1-1-1-1,3T1-1-1-2,3T2-2");
  // expect(historyBlockTokenList
  //   .filter(data => data.command === "delete")
  //   .map(data => data.id)
  //   .join(",")).toEqual("3T2-2,3T1-1-1-2,3T1-1-1-1,3T1-1-1");
});

test("remove block in list", () => {
  const [ blockDataList1 ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList1) return false;

  const blockList1 = BlockService.createBlockList(blockDataList1);

  if(!blockList1) return false;

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = new BlockService(blockList1).sort().positioning().removeBlockInList(["2T1"]).getData();

  expect(blockList.map(block => block.id).join(",")).toEqual("2T1-1,2T2,2T3");
  expect(modifyBlockTokenList.filter(data => data.command === "delete")[0].id).toEqual("2T1");
  expect(modifyBlockTokenList.filter(data => data.command === "update")[0].payload.parentId).toEqual(null);
  expect(historyBlockTokenList.filter(data => data.command === "create")[0].id).toEqual("2T1");
  expect(historyBlockTokenList.filter(data => data.command === "update" && data.id === "2T1-1")[0].payload.parentId).toEqual("2T1");
});

test("remove text block in list", () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockList1 = BlockService.createBlockList(blockDataList);

  if(!blockList1) return false;

  const blockService = new BlockService(blockList1).sort().positioning().removeTextBlockInLIst(2, 1, "블록2입니다.");
  
  const { blockList, modifyBlockTokenList, historyBlockTokenList } = blockService.getData();

  if(!(modifyBlockTokenList[0] && historyBlockTokenList[0])) return false;

  const m1 = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[3].id)[0];
  const m2 = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[0].id)[0];
  const h1 = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[3].id)[0];
  const h2 = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[0].id)[0];

  expect(blockList.map(block => block.id).join(",")).toEqual("2T1,2T1-1,2T3");
  expect(blockList[1].contents[0][0]).toEqual("블록 2입니다.블록2입니다.");
  expect(m1.command).toEqual("delete");
  expect(m2.payload.contents[0][0]).toEqual("블록 2입니다.블록2입니다.");
  expect(h1.command).toEqual("create");
  expect(h2.payload.contents[0][0]).toEqual("블록 2입니다.");
});


// TODO
test("change block position", () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockService = new BlockService(BlockService.createBlockList(blockDataList));

  const { 
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = blockService.sort().positioning().changeBlockPosition(createBlockIdMap([{ id: "2T1-1" }]), "2T3", true).getData();

  expect(blockList[TEST_BLOCK_2.length-1].id).toEqual("2T1-1");
  expect(modifyBlockTokenList.filter(data => data.command === "update")[0].payload.previousId).toEqual("2T3");
  expect(historyBlockTokenList.filter(data => data.command === "update" && data.id === "2T1-1")[0].payload.parentId).toEqual(TEST_BLOCK_2[1].id);
});

test("switchBlockList", () => {
  const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_2);

  if(!blockDataList) return false;

  const blockService = new BlockService(BlockService.createBlockList(blockDataList));

  const {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  } = blockService.sort().positioning().switchBlockList(createBlockIdMap([{ id: "2T1" }]), "2T3", true).getData();

  const m1 = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[0].id)[0];
  const m2 = modifyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[1].id)[0];
  const h1 = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[0].id)[0];
  const h2 = historyBlockTokenList.filter(data => data.id === TEST_BLOCK_2[1].id)[0];

  expect(blockList.map(block => block.id).join(",")).toEqual("2T1-1,2T2,2T3,2T1");
  expect(blockList[TEST_BLOCK_2.length-1].id).toEqual(TEST_BLOCK_2[1].id);
  expect(modifyBlockTokenList.length).toEqual(3);
  expect(historyBlockTokenList.length).toEqual(3);
  expect(m1.payload.parentId).toEqual(null);
  expect(m2.payload.previousId).toEqual("2T3");
  expect(h1.payload.parentId).toEqual(TEST_BLOCK_2[1].id);
  expect(h2.payload.previousId).toEqual(null);
});

// test('update block list', () => {
//   const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_4);

//   if(!blockDataList) return false;

//   const blockService = new BlockService(BlockService.createBlockList(blockDataList)).sort().ordering();

//   const initPosition = blockService.getBlockList().map(block => block.position).join(',');
//   const blockContents1: string = blockService.getBlockList()[1].contents[0][0];
//   let block1: TextBlock = blockService.getBlockList()[1] as TextBlock;
  
//   block1 = block1.regeneration({
//     id: "4T5",
//     position: "4",
//     contents: [["블럭 5입니다."]]
//   })[0];

//   const modifyBlockData: ModifyBlockData = {
//     create: [
//       new ModifyBlockToken(
//         ModifyBlockService
//         .setCreateModifyData(block1.getBlockData()))
//         .getRawData()
//     ],
//     update: [
//       {
//         id: "4T1-1",
//         type: "text",
//         payload: {
//           contents: [["반갑습니다."]]
//         }
//       }
//     ],
//     delete: [{ id: "4T4", type: "text" }]
//   }

//   const blockService2 = new BlockService(blockService.getBlockList()).updateBlockList(modifyBlockData);

//   const {
//     blockList,
//     modifyBlockTokenList,
//     historyBlockTokenList
//   } = blockService2.getData();

//   expect(blockList.length).toEqual(TEST_BLOCK_4.length);
//   expect(blockList[1].contents[0][0]).toEqual("반갑습니다.");
//   expect(blockList[TEST_BLOCK_4.length-1].contents[0][0]).toEqual(block1.contents[0][0]);
//   expect(blockList.filter(block => block.position === "4")[0].id).toEqual(block1.id);
//   expect(modifyBlockTokenList.length).toEqual(0);
//   expect(historyBlockTokenList.length).toEqual(3);

// });

// test('restore block list', () => {
//   const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_4);

//   if(!blockDataList) return false;

//   const blockService = new BlockService(BlockService.createBlockList(blockDataList)).sort().ordering();

//   const initPosition = blockService.getBlockList().map(block => block.position).join(',');
//   const blockContents1: string = blockService.getBlockList()[1].contents[0][0];
//   const block1 = blockService.getBlockList()[1].regeneration({})[0];
//   const block4 = blockService.getBlockList()[5].regeneration({})[0];

//   const blockService2 = new BlockService(blockService.getBlockList());

//   const { historyBlockTokenList } = blockService2.updateBlockListStagedProperty([{
//     id: "4T1-1",
//     index: 1,
//     contents: [["반갑습니다."]]
//   }]).getData();

//   const blockContents2: string = blockService2.getBlockList()[1].contents[0][0];

//   const blockContents3: string = blockService2
//     .restoreBlockList({ update: [historyBlockTokenList[0].getRawData()]})
//     .getBlockList()[1].contents[0][0];

//   const historyList = blockService2
//   .removeBlockInList([block1.id, block4.id])
//   .getData()
//   .historyBlockTokenList;

//   const historyBlockData: HistoryBlockData = {
//     create: historyList
//     .filter(token => token.command === "create")
//     .map(token => token.getRawData()),
//     update: historyList
//     .filter(token => token.command === "update")
//     .map(token => token.getRawData())
//   } 

//   const changedPosition = blockService2
//     .restoreBlockList(historyBlockData)
//     .getBlockList()
//     .map(block => block.position)
//     .join(',');

//   expect(changedPosition).toEqual(initPosition);
//   expect(blockContents1).toEqual(blockContents3);
//   expect(blockContents2).toEqual("반갑습니다.");

// });

// test("change block type", () => {
//   const [ blockDataList ] = BlockService.createBlockDataList(TEST_BLOCK_4);

//   if(!blockDataList) return false;

//   const blockService = new BlockService(BlockService.createBlockList(blockDataList));

//   const {
//     blockList,
//     modifyBlockTokenList,
//     historyBlockTokenList
//   } = blockService
//     .changeBlockType(0, BLOCK_NUMBERED)
//     .changeBlockType(0, BLOCK_CONTAINER)
//     .changeBlockType(0, BLOCK_NUMBERED)
//     .changeBlockType(0, BLOCK_TEXT)
//     .changeBlockType(0, BLOCK_BULLETED)
//     .changeBlockType(0, BLOCK_NUMBERED)
//     .getData();

//   expect(blockList[0]).toBeInstanceOf(NumberedBlock);
//   expect(modifyBlockTokenList.length).toEqual(1);
//   expect(historyBlockTokenList.length).toEqual(1);
//   expect(modifyBlockTokenList[0].payload.type).toEqual(BLOCK_NUMBERED);
//   expect(historyBlockTokenList[0].payload.type).toEqual(TEST_BLOCK_4[0].type);

// });