import { copyToNewObjectArray, createTempData, ResBlockUtils, SetBlockDataList, setUpdateModifyDataOfBlock, TempDataType } from ".";
import { BlockData, RawBlockData } from "../../types";

// const parseString = (text: string): string[] => {
//   return text.split(/-/);
// }

// const convertArg = (arg: any[]): string => {
//   if(arg.length === 1) return `${arg[0]}`;
//   return arg.reduce((acc, cur) =>  !acc? `${cur}` : `${acc}-${cur}`);
// }

// const isPosition = (position: string) => 
//   (block: RawBlockData | BlockData) =>  
//   block.position === position;

// function resetBlockPosition(
//   preBlockDataList: BlockData[] | RawBlockData[], 
//   sortedBlockDataList: BlockData[]
// ): BlockData[] {

//   const blockList = preBlockDataList.concat();

//   const rootBlockList = sortedBlockDataList.filter((block) => parseString(block.position).length === 1);
//   const length = rootBlockList.length - 1
//   let nextPosition: number = Number(rootBlockList[length].position);
//   let index = rootBlockList[length].index;

//   return sortedBlockDataList.concat(blockList.map((block: BlockData | RawBlockData ) => Object.assign({}, block, {
//     position: `${++nextPosition}`,
//     index: ++index
//   })));
// }

// export function sortBlock2(blockDataList: BlockData[] | RawBlockData[]): BlockData[] {
//   let length = blockDataList.length - 1;

//   if(length === -1) return [];

//   let index = 1;
//   let currentPosition: string[] = ["1"];
//   let parentId: string | null = null;

//   const preBlockDataList = blockDataList.concat();
//   const sortedBlockDataList: BlockData[] = []; 

//   let preBlockListIdx: number = preBlockDataList.findIndex(isPosition(covertArg(currentPosition)));

//   while(length) {
//     sortedBlockDataList.push(Object.assign({}, preBlockDataList[preBlockListIdx], {
//       index
//     }));
//     preBlockDataList[preBlockListIdx] = preBlockDataList[length];
//     preBlockDataList.pop();
//     length--;
//     index++;

//     let stringLength = currentPosition.length;
//     let nextPosition: string[] = currentPosition.concat();
//     nextPosition.push("1");

//     preBlockListIdx = preBlockDataList.findIndex(isPosition(covertArg(nextPosition)));

//     while(preBlockListIdx === -1) {
//       stringLength--;
//       nextPosition.pop();
//       nextPosition[stringLength] = `${Number(nextPosition[stringLength]) + 1}`;

//       if(stringLength === -1) {
//         return resetBlockPosition(preBlockDataList, sortedBlockDataList);
//       }

//       preBlockListIdx = preBlockDataList.findIndex(isPosition(covertArg(nextPosition)));
//     }

//     currentPosition = nextPosition;
//   }

//   sortedBlockDataList.push(Object.assign({}, preBlockDataList[0], {
//     index
//   }));

//   return sortedBlockDataList;
// }


export function sortBlock<T extends RawBlockData = any>(blockDataList: T[]): T[] {
  return blockDataList.concat().sort((a, b) => {
    if(a.position === b.position) {
      return 0
    }
    const ary1 = a.position.split(/-/);
    const ary2 = b.position.split(/-/);

    let length = 0;
    while(ary1[length] && ary2[length]) {
      const aNum = Number(ary1[length]);
      const bNum = Number(ary2[length]);

      if(aNum > bNum) {
        return 1;
      } else if(aNum < bNum) {
        return -1;
      }

      length++;
    }

    if(!ary1[length] && !ary2[length]) {
      return 0;
    } else {
      return ary1[length]? 1 : -1;
    }
  });
}

function initBlock2(blockDataList: BlockData[] | RawBlockData[]) {
  const preBlockDataList = sortBlock(blockDataList);
  const newBlockDataList: BlockData[] = [];

  let positions: [number, string][] = []; //[position, id]
  let positionsLength = 0;
  let index = 1;
  let preBlockListlength = preBlockDataList.length - 1;


  positions.push([preBlockDataList[0].position.split(/-/).length, preBlockDataList[0].id]);
  newBlockDataList.push(Object.assign({}, preBlockDataList[0], {
    index: 0,
    parentId: "root"
  }));

  preBlockDataList.shift();

  while(preBlockListlength) {
    let length = preBlockDataList[0].position.split(/-/).length;

    if(positions[positionsLength][0] === length) {

      positions[positionsLength] = [length, preBlockDataList[0].id];

    } else if(positions[positionsLength][0] < length){

      positions.push([length, preBlockDataList[0].id]);
      positionsLength++;

    } else {

      for(let i = 0; i <= positions[positionsLength][0] - length; i++) {
        positions.pop();
        positionsLength--;
      } 

      positions[positionsLength] = [length, preBlockDataList[0].id];
    }
    
    newBlockDataList.push(Object.assign({}, preBlockDataList[0], {
      index,
      parentId: !positionsLength? "root" : positions[positionsLength - 1][1]
    }));

    preBlockListlength--;
    index++;
    preBlockDataList.shift();
  }

  return newBlockDataList;
}

export function orderingBlock(blockDataList: BlockData[] | RawBlockData[]): ResBlockUtils {
  const preBlockDataList = copyToNewObjectArray(blockDataList);
  const newBlockDataList: BlockData[] = [];
  const tempData: TempDataType = { update: [] };
  const modifyData: any[] = [];

  let preBlockListlength = preBlockDataList.length - 1;

  if(preBlockListlength === -1) {
    return {
      blockList: [],
      modifyData,
      tempData
    }
  }

  const stackId: string[] = [];
  let stackIdLength = 0;
  let index = 1;
  let currentPosition = [1];
  let currentPositionLength = 0;

  stackId.push(preBlockDataList[0].id);

  newBlockDataList.push(Object.assign({}, preBlockDataList[0], {
    index: 0,
    parentId: "root",
    position: "1"
  }));

  if(preBlockDataList[0].position !== "1") {

    tempData.update?.push(createTempData(preBlockDataList[0].id, {
      position: preBlockDataList[0].position
    }));

    modifyData.push(
      setUpdateModifyDataOfBlock(preBlockDataList[0].id, {
        position: "1"
      })
    );

  }

  preBlockDataList.shift();

  while(preBlockListlength) {
    let block = preBlockDataList.shift();
    
    if(!block) {
      console.log("not block", preBlockDataList, blockDataList);
      return {
        blockList: [],
        modifyData,
        tempData
      };
    }
    
    let length = block.position.split(/-/).length - 1;

    if(currentPositionLength === length) {
      
      stackId[stackIdLength] = block.id;
      currentPosition[currentPositionLength]++;

    } else if(currentPositionLength < length){

      stackId.push(block.id);
      stackIdLength++;
      currentPosition.push(1);
      currentPositionLength++;

    } else {

      for(let i = 0; i <= currentPositionLength - length; i++) {
        currentPosition.pop();
        currentPositionLength--;
        stackId.pop();
        stackIdLength--;
      } 

      currentPosition[currentPositionLength]++;
      stackId[stackIdLength] = block.id;
    }

    let position = currentPosition.join("-");

    if(position !== block.position) {

      tempData.update?.push(createTempData(block.id, {
        position: block.position
      }));

      modifyData.push(setUpdateModifyDataOfBlock(block.id, {
        position
      }));
      
    }
    
    newBlockDataList.push(Object.assign({}, block, {
      index,
      parentId: !stackIdLength? "root" : stackId[stackIdLength - 1],
      position
    }));

    preBlockListlength--;
    index++;
  }

  return {
    blockList: newBlockDataList,
    tempData,
    modifyData
  };
}

function initBlock(blockDataList: RawBlockData[] | BlockData[]): ResBlockUtils {
  return orderingBlock(sortBlock(blockDataList));
}

const reducer = (acc: any, cur: BlockData) => {
  if(!acc.hasOwnProperty([cur.parentId])) {
    acc[cur.parentId] = []
  } 

  acc[cur.parentId].push(cur);

  return acc;
}

function setBlockList(blockDataList: BlockData[]): SetBlockDataList | null {
  return blockDataList[0]? blockDataList.reduce(reducer, {}) : null;
}

/**
type = {
  root: [
    "a1",
    "a2",
    "a3"
  ],
  "a1": [
    "a4",
    "a5"
  ],
  "a2": [
    "a6",
    "a7"
  ],
  "a3": [
    "a8"
  ],
  "a7": [
    "a9"
  ]
}

type = [
  ["a1", "1"],
  ["a2", "2"],
  ["a3", "3"],
  ["a4", "1-1"],
  ["a5", "1-2"],
  ["a6", "2-1"],
  ["a7", "2-2"],
  ["a9", "2-2-1"],
  ["a8", "3-1"]
]

type {
  root: [],
  "parentId1": [],
  "parentId2": [],
  "parentId3": []
}

위치를 옮길 때는 parentId를 null하고 position 변경
부모의 position이 변경됐을 때는 parentId를 기반으로 children 찾기
*/

const orderingBlockUtils = {
  sortBlock,
  orderingBlock,
  initBlock,
  setBlockList
}

export default orderingBlockUtils;

