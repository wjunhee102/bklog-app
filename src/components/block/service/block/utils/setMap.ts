import { BlockIdMap } from ".";

function createBlockIdMap<T extends { id: string }>(data: T[]): BlockIdMap {
  const blockIdMap = new Map<string, true>();

  data.forEach(data => { 
    if(!data.id) throw new Error("not id property (createBlockIdMap)");

    blockIdMap.set(data.id, true); 
  });

  return blockIdMap;
}

export default {
  createBlockIdMap
}