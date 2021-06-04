import { BlockData, RawBlockData } from "../../types";

const reg = /[-]/;

function findBlock(
  preBlockDataList: BlockData[] | RawBlockData[], 
  newBlockDataList: BlockData[], 
  idx: number,
  newIdx: number
) {
  const temp = preBlockDataList[idx];
  newBlockDataList.push(Object.assign({}, temp, { index: newIdx }));

}

function parsePosition(position: string): string[] {
  return position.split(reg);
}

function convertPosition(arg: string[]) {
  let position = arg.shift();
  console.log("convertPosition", arg, position);
  if(arg[0]) {
    for(const part of arg) {
      position = `${position}-${part}`;
    }
  }
  return position;
}

function resetPosition(blockList: RawBlockData[] | BlockData[]): BlockData[] {
  return blockList
    .filter(block => block.type !== "container")
    .map((block, idx) => Object.assign({}, block, { 
      index: idx + 1,
      position: `${idx+1}`
    }));
}

const isPosition = (position: string) => 
  (block: RawBlockData | BlockData) =>  
  block.position === position;

export function sortBlock(blockDataList: BlockData[] | RawBlockData[]): BlockData[] {
  let length = blockDataList.length - 1;

  if(length === -1) return [];

  let index = 1;
  let currentPosition: string = "1";

  const preBlockDataList = blockDataList.concat();
  const sortedBlockDataList: BlockData[] = []; 

  let preBlockListIdx: number = preBlockDataList.findIndex(isPosition(currentPosition));

  while(length) {
    sortedBlockDataList.push(Object.assign({}, preBlockDataList[preBlockListIdx], {
      index
    }));
    preBlockDataList[preBlockListIdx] = preBlockDataList[length];
    preBlockDataList.pop();
    length--;
    index++;

    let nextPosition: string = currentPosition.concat("-1");

    preBlockListIdx = preBlockDataList.findIndex(isPosition(nextPosition));

    while(preBlockListIdx === -1 && nextPosition) {
      const lastNumber: string = `${Number(nextPosition.slice(-3, -2)) + 1}`;
      nextPosition = nextPosition.slice(0, -3).concat(lastNumber);
      preBlockListIdx = preBlockDataList.findIndex(isPosition(nextPosition));
      console.log("1", nextPosition, preBlockListIdx);
    }

    currentPosition = nextPosition;
  }

  console.log("currentPosition", currentPosition);

  sortedBlockDataList.push(Object.assign({}, preBlockDataList[0], {
    index
  }));

  return sortedBlockDataList;
}