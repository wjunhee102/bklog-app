import { 
  insertBlock,
  copyBlockDataList,
  excludeBlockList
} from './store/modules/bklog/utils';
import { page } from './data/db.json';
import orderingBlock from './store/modules/bklog/utils/ordering';

const TEST_BLOCKS = page.blocks;

const TEST_BLOCKDATALIST = [
  {
    id: "c7ce6d39-bf2a-4712-9318-d2313a917a62",
    type: "container",
    parentId: null,
    preBlockId: "d5cc2725-97ec-494b-bc80-c16f96379e11",
    nextBlockId: "s5cc2725-97ec-494b-bc80-c16f96379e61",
    property: null,
    children: [
      "a85758ba-bbb5-45e1-aaa0-e3395e0dfd78",
      "3723c55f-66f0-4ad0-b796-0dbcd8d82ce8",
      "2453d55f-66f0-4ad0-b796-0dbcd8d82ce8"
    ]
  },
  {
    id: "a85758ba-bbb5-45e1-aaa0-e3395e0dfd78",
    type: "block",
    parentId: "c7ce6d39-bf2a-4712-9318-d2313a917a62",
    preBlockId: null,
    nextBlockId: "3723c55f-66f0-4ad0-b796-0dbcd8d82ce8",
    property: {
      "type": "bk-h1",
      "styles": {
        "color": "black",
        "backgroudColor": "white"
      },
      "contents": [
        ["블록 "],
        ["1 입", [["b"], ["fc", "#fc0"]]],
        ["니다."]
      ]
    },
    children: []
  },
  {
    id: "3723c55f-66f0-4ad0-b796-0dbcd8d82ce8",
    type: "block",
    parentId: "c7ce6d39-bf2a-4712-9318-d2313a917a62",
    preBlockId: "a85758ba-bbb5-45e1-aaa0-e3395e0dfd78",
    nextBlockId: "2453d55f-66f0-4ad0-b796-0dbcd8d82ce8",
    property: {
      "type": "bk-h1",
      "styles": {
        "color": "black",
        "backgroudColor": "white"
      },
      "contents": [
        ["블록 "],
        ["2 입", [["i"]]],
        ["니다."]
      ]
    },
    children: [
      "4453c55f-66f0-4ad0-b796-0dbcd8d82ce8"
    ]
  },
  {
    id: "4453c55f-66f0-4ad0-b796-0dbcd8d82ce8",
    type: "block",
    parentId: "3723c55f-66f0-4ad0-b796-0dbcd8d82ce8",
    preBlockId: null,
    nextBlockId: null,
    property: {
      "type": "bk-h1",
      "styles": {
        "color": "black",
        "backgroudColor": "white"
      },
      "contents": [
        ["블록 "],
        ["3 입", [["b"]]],
        ["니다."]
      ]
    },
    children: [
    ]
  },
  {
    id: "2453d55f-66f0-4ad0-b796-0dbcd8d82ce8",
    type: "block",
    parentId: "c7ce6d39-bf2a-4712-9318-d2313a917a62",
    preBlockId: "3723c55f-66f0-4ad0-b796-0dbcd8d82ce8",
    nextBlockId: null,
    property: {
      "type": "bk-h1",
      "styles": {
        "color": "black",
        "backgroudColor": "white"
      },
      "contents": [
        ["블록 "],
        ["4 입", [["b"]]],
        ["니다."]
      ]
    },
    children: [
    ]
  }
]

const TEST_PRE_ID = "2453d55f-66f0-4ad0-b796-0dbcd8d82ce8";

function testCopyBlockList() {
  const newDataList = copyBlockDataList(TEST_BLOCKDATALIST);
  const aaa = copyBlockDataList(TEST_BLOCKDATALIST);
  const testDataList = orderingBlock(TEST_BLOCKS);
  const testDataIdList = newDataList.map(block => block.id);
  
  const insertedBlock = orderingBlock(insertBlock(testDataList, newDataList, TEST_PRE_ID));
  const newInsertedBlock = [...insertedBlock];

  console.log(aaa, testDataList, testDataIdList, insertedBlock);
  const deletedBlock = orderingBlock(excludeBlockList(newInsertedBlock, testDataIdList));
  
  return deletedBlock;
}

export const newDataList = copyBlockDataList(TEST_BLOCKDATALIST);

export const TEST_CASE_01 = testCopyBlockList();