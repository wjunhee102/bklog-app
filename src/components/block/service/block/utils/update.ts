import { checkKindOfBlockType, createBlock, createBlockIdMap, ResBlockService } from ".";
import { BlockDataProps, BlockType, StagedBlockData, UnionBlock, UnionBlockGenericType } from "../../../entities/block/type";
import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockService } from "../../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../../modify/block/ModifyBlockService";

const findBlock = (blockId: string) => (block: UnionBlock) => block.id === blockId;

function findBlockIndex(blockList: UnionBlock[], targetId: string) {
  return blockList.findIndex(findBlock(targetId));
}

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

      historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(newBlock.id, newBlock.type, preProps)));
      modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(newBlock.id, newBlock.type, props)));
      
    }

  }

  return {
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  }
}

function getPreviousId(blockList: UnionBlock[]): string {
  const length = blockList.length;
  let previousBlock: UnionBlock = blockList[0];

  for(let i = 1; i < length; i++) {
    const block = blockList[i];

    if(previousBlock.id === block.previousId) previousBlock = block;
  }
  
  return previousBlock.id;
}

function recolieBlockPreviousId(
  newBlockList: UnionBlock[], 
  targetBlock: UnionBlock
): {
  modifyBlockToken: ModifyBlockToken,
  historyBlockToken: HistoryBlockToken
} {
  const previousId = getPreviousId(newBlockList);

  const preProps = targetBlock.updateBlock({ previousId });

  return {
    modifyBlockToken: new ModifyBlockToken(
      ModifyBlockService
      .setUpdateModifyData(targetBlock.id, targetBlock.type, { previousId })
    ),
    historyBlockToken: new HistoryBlockToken(
      HistoryBlockService
      .setUpdateModifyData(targetBlock.id, targetBlock.type, preProps)
    )
  }
}

function insertBlockList(
  currentBlockList: UnionBlock[],
  toBeInsertedBlockList: UnionBlock[],
  targetIndex: number,
  keepCurrentBlockPosition: boolean = true
): UnionBlock[] {
  if(!currentBlockList[targetIndex]) throw Error("update.ts insertBlockList: not find block");

  const newBlockList: UnionBlock[] = currentBlockList.concat();

  if(keepCurrentBlockPosition) {
    newBlockList.splice(targetIndex, 1, currentBlockList[targetIndex], ...toBeInsertedBlockList);
  } else {
    newBlockList.splice(targetIndex, 1, ...toBeInsertedBlockList, currentBlockList[targetIndex]);
  }

  return newBlockList;
}

// function insertBlockList(
//   currentBlockList: UnionBlock[],
//   newBlockList: UnionBlock[],
//   targetId: string,
//   keepCurrentBlockPosition: boolean = true
// ): ResBlockService {
//   const blockList: UnionBlock[] = currentBlockList.concat();
//   const index = blockList.findIndex(block => block.id === targetId);
//   const nextIndex = index + 1;
//   const modifyBlockTokenList: ModifyBlockToken[] = [];
//   const historyBlockTokenList: HistoryBlockToken[] = [];

//   if(index === -1) throw new Error("update.ts line 59: not find block");
  
//   const targetBlock = currentBlockList[index];

//   if(keepCurrentBlockPosition) {
//     let isPrevious = targetBlock.id === newBlockList[0].previousId? true : false;

//     if(blockList[nextIndex]) {
//       const nextBlock = blockList[nextIndex];
  
//       let isPreviousNextBlock = targetBlock.id === nextBlock.previousId? true : false;
      
//       if(isPrevious === isPreviousNextBlock) {
        
//         const {
//           modifyBlockToken,
//           historyBlockToken
//         } = recolieBlockPreviousId(newBlockList, nextBlock);
        
//         modifyBlockTokenList.push(modifyBlockToken);
//         historyBlockTokenList.push(historyBlockToken);
//       }
      
//     }

//     blockList.splice(index, 1, currentBlockList[index], ...newBlockList);
//   } else {

//     if(index) {
//       const previousBlock = blockList[index - 1];

      


//     } else {
//       const preProps = newBlockList[0].updateBlock({
//         parentId: null,
//         previousId: null
//       });

//       modifyBlockTokenList.push(
//         new ModifyBlockToken(
//           ModifyBlockService
//           .setUpdateModifyData(newBlockList[0].id, newBlockList[0].type, {
//             parentId: null,
//             previousId: null
//           })
//         )
//       );
//       historyBlockTokenList.push(
//         new HistoryBlockToken(
//           HistoryBlockService
//           .setUpdateModifyData(newBlockList[0].id, newBlockList[0].type, preProps)
//         )
//       );
//     }

//     blockList.splice(index, 1, ...newBlockList, currentBlockList[index]);
//   }

//   return {
//     blockList,
//     modifyBlockTokenList: modifyBlockTokenList[0]? modifyBlockTokenList : undefined,
//     historyBlockTokenList: historyBlockTokenList[0]? historyBlockTokenList : undefined
//   }
// }

function removeBlockList(
  currentBlockList: UnionBlock[],
  removedBlockList: UnionBlock[]
): ResBlockService {
  
  const blockList: UnionBlock[] = currentBlockList.concat();
  const removedBlockIdMap = createBlockIdMap(removedBlockList); 
  const modifyBlockTokenList: ModifyBlockToken[] = [];
  const historyBlockTokenList: HistoryBlockToken[] = [
    ...removedBlockList
    .map(block => 
      new HistoryBlockToken(HistoryBlockService.setCreateModifyData(block.getBlockData()))
    )
  ];

  let startRemovedBlock: UnionBlock | null = null; 

  let isRemoved = false;

  for(const block of removedBlockList) {

    modifyBlockTokenList.push(
      new ModifyBlockToken(
        ModifyBlockService
        .setDeleteModifyData(block.id, block.type)
    ));

    const nextBlock = blockList[block.index + 1];
    
    if(removedBlockIdMap.has(nextBlock.id)) {
      if(isRemoved) continue;
      isRemoved = true;

      startRemovedBlock = block;
    } else {

      let blockDataProps: BlockDataProps<UnionBlockGenericType>;

      if(isRemoved) {
        if(!startRemovedBlock) continue;

        if(
          startRemovedBlock.parentId !== nextBlock.parentId 
          && startRemovedBlock.id !== nextBlock.previousId
        ) continue;

        blockDataProps = {
          previousId: block.previousId,
          parentId: block.parentId
        }

      } else {
        if(
          block.parentId !== nextBlock.parentId 
          && block.id !== nextBlock.previousId
        ) continue;

        blockDataProps = {
          previousId: block.previousId,
          parentId: block.parentId
        }
      }

      const preBlock = nextBlock.updateBlock(blockDataProps);

      modifyBlockTokenList.push(
        new ModifyBlockToken(
          ModifyBlockService
          .setUpdateModifyData(nextBlock.id, nextBlock.type, blockDataProps)
      ));
      historyBlockTokenList.push(
        new HistoryBlockToken(
          HistoryBlockService
          .setUpdateModifyData(nextBlock.id, nextBlock.type, preBlock)
      ));
    }

  }

  return {
    blockList: blockList.filter(block => !removedBlockIdMap.has(block.id)),
    modifyBlockTokenList,
    historyBlockTokenList
  }
}

function changeBlockType(type: BlockType, block: UnionBlock): {
  block: UnionBlock;
  modifyBlockToken: ModifyBlockToken;
  historyBlockToken: HistoryBlockToken;
} | null {

  if(checkKindOfBlockType(block.type) !== checkKindOfBlockType(type)) return null;

  const newBlock = createBlock(Object.assign(block.getBlockData(), {
    type
  }));

  if(!newBlock) return null;

  return {
    block: newBlock,
    modifyBlockToken: new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(block.id, type,{
      type
    })),
    historyBlockToken: new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(block.id, block.type,{
      type: block.type
    }))
  };
}


export default {
  updateBlockListStagedProperty,
  findBlock,
  findBlockIndex,
  recolieBlockPreviousId,
  insertBlockList,
  removeBlockList,
  changeBlockType
}