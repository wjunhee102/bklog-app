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

  while(length !== -1) {
    sortedBlockDataList.push(Object.assign({}, preBlockDataList[preBlockListIdx], {
      index
    }));
    preBlockDataList[preBlockListIdx] = preBlockDataList[length];
    preBlockDataList.pop();
    length -= 1;
    index++;

    let nextPosition: string | undefined | null = `${currentPosition}-1`;

    preBlockListIdx = preBlockDataList.findIndex(isPosition(nextPosition));

    if(preBlockListIdx === -1) {

      let positionArray = parsePosition(currentPosition);
      let positionLength = positionArray.length;
      

      while(preBlockListIdx !== -1 || !nextPosition || positionLength) {
        positionArray[--positionLength] = positionArray[positionArray.length] + 1;
        nextPosition = convertPosition(positionArray);
        
        if(nextPosition) {
          preBlockListIdx = preBlockDataList.findIndex(isPosition(nextPosition));
        } else {
          console.log("position 불일치");
          return resetPosition(blockDataList);
        }
       
      }

    }

    currentPosition = nextPosition;
  }

  return sortedBlockDataList;
}