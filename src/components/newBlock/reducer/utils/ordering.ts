import { BlockData, RawBlockData } from "../../types";

const parseString = (text: string): string[] => {
  return text.split(/-/);
}

const covertArg = (arg: any[]): string => {
  return arg.reduce((acc, cur) =>  !acc? `${cur}` : `${acc}-${cur}`);
}

const isPosition = (position: string) => 
  (block: RawBlockData | BlockData) =>  
  block.position === position;

function resetBlockPosition(
  preBlockDataList: BlockData[] | RawBlockData[], 
  sortedBlockDataList: BlockData[]
): BlockData[] {

  const blockList = preBlockDataList.concat();

  const rootBlockList = sortedBlockDataList.filter((block) => parseString(block.position).length === 1);
  const length = rootBlockList.length - 1
  let nextPosition: number = Number(rootBlockList[length].position);
  let index = rootBlockList[length].index;

  return sortedBlockDataList.concat(blockList.map((block: BlockData | RawBlockData ) => Object.assign({}, block, {
    position: `${++nextPosition}`,
    index: ++index
  })));
}

export function sortBlock(blockDataList: BlockData[] | RawBlockData[]): BlockData[] {
  let length = blockDataList.length - 1;

  if(length === -1) return [];

  let index = 1;
  let currentPosition: string[] = ["1"];

  const preBlockDataList = blockDataList.concat();
  const sortedBlockDataList: BlockData[] = []; 

  let preBlockListIdx: number = preBlockDataList.findIndex(isPosition(covertArg(currentPosition)));

  if(preBlockListIdx === -1) {
    return preBlockDataList
    .filter(block => block.type !== "container")
    .map((block, idx) => Object.assign({}, block, {
      index: idx,
      position: `${idx}`
    }));
  }

  while(length) {
    sortedBlockDataList.push(Object.assign({}, preBlockDataList[preBlockListIdx], {
      index
    }));
    preBlockDataList[preBlockListIdx] = preBlockDataList[length];
    preBlockDataList.pop();
    length--;
    index++;

    let stringLength = currentPosition.length;
    let nextPosition: string[] = currentPosition.concat();
    nextPosition.push("1");

    preBlockListIdx = preBlockDataList.findIndex(isPosition(covertArg(nextPosition)));

    while(preBlockListIdx === -1) {
      stringLength--;
      nextPosition.pop();
      nextPosition[stringLength] = `${Number(nextPosition[stringLength]) + 1}`;

      if(stringLength === -1) {
        return resetBlockPosition(preBlockDataList, sortedBlockDataList);
      }

      preBlockListIdx = preBlockDataList.findIndex(isPosition(covertArg(nextPosition)));
    }

    currentPosition = nextPosition;
  }

  sortedBlockDataList.push(Object.assign({}, preBlockDataList[0], {
    index
  }));

  return sortedBlockDataList;
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

(a, b) => {
      if(a === b) {
        return 0
      }
      const ary1 = a.split(/-/);
      const ary2 = b.split(/-/);

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
    }
 */

