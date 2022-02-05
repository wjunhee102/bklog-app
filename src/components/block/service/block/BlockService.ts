import { Block } from "../../entities/block/abstract/Block";
import { BlockDataInitProps, UnionBlock, UnionBlockData, UnionBlockGenericType, UnionRawBlockData } from "../../entities/block/type";
import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { ModifyBlockService } from "../modify/block/ModifyBlockService";
import { createBlock, orderingBlock, ResBlockService } from "./utils";
import { sortBlock } from "./utils";

export class BlockService {
  private modifyBlockTokenList: Array<ModifyBlockToken> = [];
  private historyBlockTokenList: Array<ModifyBlockToken> = [];

  static createBlockDataList(
    rawBlockDataList: Array<BlockDataInitProps<UnionBlockGenericType>>
  ): {
    blockDataList: Array<UnionBlockData>;
    modifyBlockTokenList?: Array<ModifyBlockToken>;
  } {
    
    const blockDataList: Array<UnionBlockData> = [];
    const modifyBlockTokenList: Array<ModifyBlockToken> = [];

    for(const rawBlockData of rawBlockDataList) {
      const blockData = Block.createBlockData(rawBlockData.type, rawBlockData);

      if(blockData) {
        blockDataList.push(blockData);
      } else {
        const modifyBlockToken = new ModifyBlockToken(ModifyBlockService.setDeleteModifyData(rawBlockData.id));
        modifyBlockTokenList.push(modifyBlockToken);
      }

    }

    return {
      blockDataList,
      modifyBlockTokenList: modifyBlockTokenList[0]? modifyBlockTokenList : undefined
    }
  }

  static createBlock(blockData: UnionBlockData | UnionRawBlockData): UnionBlock | null {
    return createBlock(blockData);
  }

  static createBlockList(
    blockDataList: Array<UnionRawBlockData | UnionBlockData>
  ): Array<UnionBlock> {
    const blockList: Array<UnionBlock> = [];
    
    for(const blockData of blockDataList) {
      const block = this.createBlock(blockData);
      if(block) blockList.push(block);
    }

    return blockList;
  }

  constructor(private blockList: Array<UnionBlock>) {} 

  getBlockList(): Array<UnionBlock> {
    return this.blockList;
  }

  getData(): ResBlockService {
    return {
      blockList: this.blockList,
      modifyBlockTokenList: this.modifyBlockTokenList,
      historyBlockTokenList: this.historyBlockTokenList
    }
  }


  /**
   * position에 따라서 정렬합니다.
   */
  public sort(): BlockService {
    this.blockList = sortBlock(this.blockList);
    return this;
  }

  /**
   * 현재 배열 순서에 따라 position과 index를 선언합니다.
   */
  public ordering(): BlockService {
    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = orderingBlock(this.blockList);

    this.blockList = blockList;
    
    if(modifyBlockTokenList && historyBlockTokenList) {
      this.modifyBlockTokenList.push(...modifyBlockTokenList);
      this.historyBlockTokenList.push(...historyBlockTokenList);
    }

    return this;
  }


}