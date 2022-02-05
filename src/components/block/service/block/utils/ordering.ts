import { ResBlockService } from ".";
import { RawBlockData, UnionBlock, UnionBlockGenericType, UnionRawBlockData } from "../../../entities/block/type";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { RawBlockDataProps } from "../../../types";
import { ModifyBlockService } from "../../modify/block/ModifyBlockService";

function sortBlock(blockList: Array<UnionBlock>) {
  return blockList.concat().sort((a, b) => {
    if(a.position === b.position) {
      return 0
    }

    const aPosition = a.position.split(/-/);
    const bPosition = b.position.split(/-/);

    let length = 0;
    while(aPosition[length] && bPosition[length]) {
      const aNum = Number(aPosition[length]);
      const bNum = Number(bPosition[length]);

      if(aNum > bNum) {
        return 1;
      } else if(aNum < bNum) {
        return -1;
      }

      length++;
    }

    if(!aPosition[length] && !bPosition[length]) {
      return 0;
    } else {
      return aPosition[length]? 1 : -1;
    }
  });
}

function orderingBlock(blockList: Array<UnionBlock>): ResBlockService {
  if(!blockList[0]) return { blockList: [] }
  
  const newBlockList: Array<UnionBlock> = [];
  const modifyBlockTokenList: Array<ModifyBlockToken> = [];
  const historyBlockTokenList: Array<ModifyBlockToken> = [];
  const stackId: string[] = [];

  let blockListLength = blockList.length - 1;
  let index = 1;
  let stackIdLength = 0;
  let currentPosition = [1];
  let currentPositionLength = 0;
  
  const firstBlock = blockList[0];

  stackId.push(firstBlock.id);

  const preProps = firstBlock.updateBlockData<UnionBlockGenericType>({
    index: 0,
    parentId: "root",
    position: "1"
  });

  newBlockList.push(firstBlock);

  if(preProps.position !== "1") {
    modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(firstBlock.id, {
      position: "1"
    })));
    historyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(firstBlock.id, preProps)));
  }

  while(index <= blockListLength) {
    const block = blockList[index];

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

      historyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(block.id, {
        position: block.position
      })));

      modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(block.id, {
        position
      })));
      
    }

    block.updateBlockData({
      index,
      parentId: !stackIdLength? "root": stackId[stackIdLength - 1],
      position
    });

    newBlockList.push(block);

    index++;

  }

  return {
    blockList: newBlockList,
    modifyBlockTokenList: modifyBlockTokenList[0]? modifyBlockTokenList : undefined,
    historyBlockTokenList: historyBlockTokenList[0]? historyBlockTokenList : undefined
  };
}

export default {
  sortBlock,
  orderingBlock
}