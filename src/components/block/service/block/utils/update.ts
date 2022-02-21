import { checkKindOfBlockType, createBlock, ResBlockService } from ".";
import { BlockDataProps, BlockType, StagedBlockData, UnionBlock, UnionBlockGenericType } from "../../../entities/block/type";
import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockService } from "../../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../../modify/block/ModifyBlockService";

function updateBlockListStagedProperty(
  preBlockList: UnionBlock[],
  stagedBlockDataList: StagedBlockData[]
): ResBlockService {
  const blockList = preBlockList.concat();
  const modifyBlockTokenList: ModifyBlockToken[] = [];
  const historyBlockTokenList: HistoryBlockToken[] = [];

  for(const stagedBlockData of stagedBlockDataList) {

    const id = stagedBlockData.id;
    const index = stagedBlockData.index;

    if(blockList[index] && id === blockList[index].id) {

      const props: BlockDataProps<UnionBlockGenericType> = {
        ...stagedBlockData
      }

      props.id = undefined;
      props.index = undefined;
      delete props.id;
      delete props.index;

      const [ newBlock, preProps ] = blockList[index].regeneration(props as StagedBlockData);

      blockList[index] = newBlock;

      historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(newBlock.id, preProps)));
      modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(newBlock.id, props)));
      
    }

  }

  return {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  }
}

function insertBlockList(
  currentBlockList: UnionBlock[],
  newBlockList: UnionBlock[],
  targetPosition: string,
  keepCurrentBlockPosition: boolean = true
): UnionBlock[] {
  const blockList: UnionBlock[] = currentBlockList.concat();
  const index = blockList.findIndex(block => block.position === targetPosition);

  if(keepCurrentBlockPosition) {
    blockList.splice(index, 1, currentBlockList[index], ...newBlockList);
  } else {
    blockList.splice(index, 1, ...newBlockList, currentBlockList[index]);
  }

  return blockList;
}

function removeBlockList(
  currentBlockList: UnionBlock[],
  removedBlockList: UnionBlock[]
): ResBlockService {
  const blockList: UnionBlock[] = currentBlockList.concat();
  const removedIdList: string[] = removedBlockList.map(block => block.id);
  const modifyBlockTokenList: ModifyBlockToken[] = [];
  const historyBlockTokenList: HistoryBlockToken[] = [
    ...removedBlockList
    .map(block => 
      new HistoryBlockToken(HistoryBlockService.setCreateModifyData(block.getBlockData()))
    )
  ];
  const blockLength = blockList.length;

  for(const block of removedBlockList) {
    const position = block.position;

    modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setDeleteModifyData(block.id)));
    block.updateBlock({ position: "null" });

    for(let i = block.index + 1; i < blockLength; i++) {
      if(blockList[i].position.indexOf(position) !== 0) break;
      if(removedIdList.includes(blockList[i].id)) break;

      const rawNewPosition = blockList[i].position.split(/-/);
      rawNewPosition.pop();

      const newPosition = rawNewPosition.join('-');

      const preProps = blockList[i].updateBlock({
        position: newPosition
      });

      historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(blockList[i].id, preProps)))
      modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(blockList[i].id, {
        position: newPosition
      })));
    }

  }

  return {
    blockList: blockList.filter(block => block.position !== "null"),
    modifyBlockTokenList,
    historyBlockTokenList
  }
}

function changeBlockType(type: BlockType, block: UnionBlock): {
  block: UnionBlock;
  modifyBlockToken: ModifyBlockToken;
  historyBlockToken: HistoryBlockToken;
} | null {
  
  const kindOfType = checkKindOfBlockType(type);
  let newBlock: UnionBlock | null;

  if(checkKindOfBlockType(block.type) !== kindOfType) return null;

  newBlock = createBlock(Object.assign(block.getBlockData(), {
    type
  }));

  if(!newBlock) return null;

  return {
    block: newBlock,
    modifyBlockToken: new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(block.id, {
      type
    })),
    historyBlockToken: new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(block.id, {
      type: block.type
    }))
  };
}


export default {
  updateBlockListStagedProperty,
  insertBlockList,
  removeBlockList,
  changeBlockType
}