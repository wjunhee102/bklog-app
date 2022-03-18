import { SetBlockList} from ".";
import { UnionBlock } from "../../entities/block/type";

const reducer = (acc: any, cur: UnionBlock, idx: number) => {
  cur.setIndex(idx);

  if(!cur.parentId) {
    if(!acc.root) acc.root = [];
    
    acc.root.push(cur);

    return acc;
  }

  if(!acc.hasOwnProperty([cur.parentId])) {
    acc[cur.parentId] = []
  } 

  acc[cur.parentId].push(cur);

  return acc;
}

function setBlockList(blockList: UnionBlock[]): SetBlockList | null {
  return blockList[0]? blockList.reduce(reducer, {}) : null;
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
  setBlockList
}

export default orderingBlockUtils;

