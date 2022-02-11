import { ResBlockService } from ".";
import { BlockDataProps, StagedBlockData, UnionBlock } from "../../../entities/block/type";
import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockService } from "../../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../../modify/block/ModifyBlockService";


function updateBlockListStagedProperty(
  preBlockList: Array<UnionBlock>,
  stagedBlockDataList: Array<StagedBlockData>
): ResBlockService {
  const blockList = preBlockList.concat();
  const modifyBlockTokenList: Array<ModifyBlockToken> = [];
  const historyBlockTokenList: Array<HistoryBlockToken> = [];

  for(const { id, index, styleType, styles, contents } of stagedBlockDataList) {

    if(blockList[index] && id === blockList[index].id) {
      const [ newBlock, preProps ] = blockList[index].regeneration({ styleType, styles, contents });

      blockList[index] = newBlock;

      historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(newBlock.id, preProps)));
      modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(newBlock.id, {
        styleType,
        styles,
        contents
      })));
    }

  }

  return {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  }
}

function insertBlockList(
  currentBlockList: Array<UnionBlock>,
  newBlockList: Array<UnionBlock>,
  targetPosition: string,
  currentBlockFrontPosition: boolean = true
): Array<UnionBlock> {
  const blockList: Array<UnionBlock> = currentBlockList.concat();
  const index = blockList.findIndex(block => block.position === targetPosition);

  if(currentBlockFrontPosition) {
    blockList.splice(index, 1, currentBlockList[index], ...newBlockList);
  } else {
    blockList.splice(index, 1, ...newBlockList, currentBlockList[index]);
  }

  return blockList;
}

function removeBlockList(
  currentBlockList: Array<UnionBlock>,
  removedBlockList: Array<UnionBlock>
): ResBlockService {
  const blockList: Array<UnionBlock> = currentBlockList.concat();
  const removedIdList: Array<string> = removedBlockList.map(block => block.id);
  const modifyBlockTokenList: Array<ModifyBlockToken> = [];
  const historyBlockTokenList: Array<HistoryBlockToken> = [
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

export default {
  updateBlockListStagedProperty,
  insertBlockList,
  removeBlockList
}