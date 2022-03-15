import { Block } from "../../entities/block/abstract/Block";
import { ContainerBlock } from "../../entities/block/container/ContainerBlock";
import { BaseTextBlock } from "../../entities/block/text/BaseTextBlock";
import { changeStyleTextContents, mergeTextContents } from "../../entities/block/text/utils";
import { BlockData, BlockDataInitProps, BlockType, RawBlockData, StagedBlockData, UnionBlock, UnionBlockData, UnionBlockDataProps, UnionBlockGenericType, UnionRawBlockData } from "../../entities/block/type";
import { BLOCK_CONTAINER } from "../../entities/block/type/types/container";
import { BlockContentsText, OrderType, TextContentStyleType } from "../../entities/block/type/types/text";
import { Token } from "../../entities/block/utils/token";
import { HistoryBlockToken } from "../../entities/modify/block/HistoryBlockToken";
import { ModifyBlockToken } from "../../entities/modify/block/ModifyBlockToken";
import { HistoryBlockService } from "../modify/block/HistoryBlockService";
import { ModifyBlockService } from "../modify/block/ModifyBlockService";
import { HistoryBlockData, ModifyBlockData } from "../modify/type";
import { sortBlockList, resetToTargetPosition, checkInstanceOfBlock, createBlock, insertBlockList, positioningBlock, removeBlockList, updateBlockListStagedProperty, changeBlockType, createBlockIdMap, BlockIdMap, BlockPosition, ResBlockService, findBlockIndex } from "./utils";

/**
 * TODO
 * -
 * 현재 position 방식으로 블럭의 위치를 정하는 방식에서 
 * 단방향 연결리스트로 변경해야 함.
 * 
 */

const findBlock = (blockId: string) => (block: UnionBlock) => block.id === blockId;
export class BlockService {
  private modifyBlockTokenList: ModifyBlockToken[] = [];
  private historyBlockTokenList: HistoryBlockToken[] = [];

  static createBlockDataList(
    rawBlockDataList: BlockDataInitProps<UnionBlockGenericType>[]
  ): [ UnionBlockData[], ModifyBlockToken[] ] {
    
    const blockDataList: UnionBlockData[] = [];
    const modifyBlockTokenList: ModifyBlockToken[] = [];

    for(const rawBlockData of rawBlockDataList) {
      const blockData = Block.createBlockData(rawBlockData.type, rawBlockData);

      if(blockData) {
        blockDataList.push(blockData);
      } else {
        const modifyBlockToken = new ModifyBlockToken(ModifyBlockService.setDeleteModifyData(rawBlockData.id, rawBlockData.type));
        modifyBlockTokenList.push(modifyBlockToken);
      }

    }

    return [ blockDataList, modifyBlockTokenList ];
  }

  static createBlock(blockData: UnionBlockData | UnionRawBlockData): UnionBlock | null {
    return createBlock(blockData);
  }

  static createBlockList(
    blockDataList: (UnionRawBlockData | UnionBlockData)[]
  ): UnionBlock[] {
    const blockList: UnionBlock[] = [];
    
    for(const blockData of blockDataList) {
      const block = this.createBlock(blockData);
      if(block) blockList.push(block);
    }

    return blockList;
  }

  static copyBlockList(
    blockList: UnionBlock[]
  ): UnionBlock[] {
    return this.createBlockList(blockList.map(block => Object.assign({}, block.getBlockData(), {
      id: Token.getUUID()
    })));
  }

  /**
   * target id에 맞춰 block를 정렬합니다
   * 원본 배열에 반영
   */
  static resetToTargetPosition(
    blockList: UnionBlock[],
    targetBlockPosition: BlockPosition,
  ) {
    return resetToTargetPosition(blockList, targetBlockPosition);
  }

  /**
   * 하나의 타켓 block을 기점으로 blockList를 분리합니다.
   * 새 배열 반환
   */
  static divideBlock(
    blockList: UnionBlock[], 
    targetIdMap: BlockIdMap
  ): [ UnionBlock[], UnionBlock[] ] {
    const removedBlockList: UnionBlock[] = [];
    const targetBlockList: UnionBlock[] = [];

    for(const block of blockList) {
      if(targetIdMap.has(block.id)) {
        targetBlockList.push(block.regeneration({})[0]);
      } else {
        removedBlockList.push(block.regeneration({})[0]);
      }
    }

    return [ removedBlockList, targetBlockList ];
  }

  /**
   * target position에 맞춰 새 포지션을 반환 합니다.
   */
  // static setPosition(
  //   prePosition: string,
  //   targetPosition: string = "0"
  // ): string {
  //   return setPosition(prePosition, targetPosition);
  // }

  constructor(private blockList: UnionBlock[]) {} 

  private initResultData({
    blockList,
    modifyBlockTokenList,
    historyBlockTokenList
  }: ResBlockService) {
    this.blockList = blockList;

    if(modifyBlockTokenList && modifyBlockTokenList[0]) {
      this.modifyBlockTokenList.push(...modifyBlockTokenList);
    }

    if(historyBlockTokenList && historyBlockTokenList[0]) {
      this.historyBlockTokenList.push(...historyBlockTokenList);
    }

  }

  public getBlockList(): UnionBlock[] {
    return this.blockList;
  }

  public getData(): {
    blockList: UnionBlock[];
    modifyBlockTokenList: ModifyBlockToken[];
    historyBlockTokenList: HistoryBlockToken[];
  } {
    return {
      blockList: this.blockList,
      modifyBlockTokenList: new ModifyBlockService(this.modifyBlockTokenList).merge().getTokenList(),
      historyBlockTokenList: new HistoryBlockService(this.historyBlockTokenList).merge().getTokenList()
    }
  }

  /**
   * parentId, previousId에 따라서 정렬합니다.
   * 새 배열 반환
   */
  public sort(): BlockService {
    this.blockList = sortBlockList(this.blockList);
    return this;
  }

  /**
   * 현재 배열 순서에 따라 previousId와 parentId를 재조정합니다.
   * 원본 배열에 반영
   */
  public positioning(blockPosition: BlockPosition = {
    previousId: null,
    parentId: null
  }): BlockService {
    this.initResultData(positioningBlock(this.blockList, blockPosition));

    return this;
  }

  /**
   * block의 styleType, styles, contents를 업데이트 합니다.
   * 새 배열 반환
   */
  public updateBlockListStagedProperty<T extends UnionBlockGenericType = UnionBlockGenericType>(
    stageBlockDataList: StagedBlockData<T>[]
  ): BlockService {
    if(!stageBlockDataList[0]) return this;

    this.initResultData(updateBlockListStagedProperty(this.blockList, stageBlockDataList));

    return this;
  }

  /**
   * 새 block을 추가합니다.
   * 새 배열 반환
   */
  public addBlockInList(
    targetBlockList: UnionBlock[], 
    targetId: string, 
    previous: boolean,
    keepCurrentBlockPosition: boolean = true
  ): BlockService {
    const targetIndex = this.blockList.findIndex(findBlock(targetId));

    if(targetIndex === - 1) return this;
    const previousBlock = this.blockList[targetIndex];

    const blockPosition: BlockPosition = previous? {
      parentId: previousBlock.parentId,
      previousId: previousBlock.id
    } : {
      parentId: previousBlock.id,
      previousId: null
    }
    
    const { blockList } = BlockService.resetToTargetPosition(targetBlockList, blockPosition);

    this.modifyBlockTokenList.push(...blockList.map(block => new ModifyBlockToken(ModifyBlockService.setCreateModifyData(block.getRawBlockData()))));

    const newBlockList = insertBlockList(
      this.blockList, 
      targetBlockList,
      targetIndex,
      previous? keepCurrentBlockPosition : true
    );

    this.historyBlockTokenList.push(...targetBlockList.map(block => new HistoryBlockToken(HistoryBlockService.setDeleteModifyData(block.id, block.type))));

    this.blockList = newBlockList;

    return this.positioning();
  }

  /**
   * 지정한 block을 제거합니다.
   * 새 배열 반환
   */
  public removeBlockInList(
    blockInfo: UnionBlock[] | string[]
  ): BlockService {
    const removedBlockList: UnionBlock[] = [];
    
    if(typeof blockInfo[0] !== "string") {
      if(!checkInstanceOfBlock(blockInfo[0])) return this;
      removedBlockList.push(...blockInfo as UnionBlock[]);
    } else {
      const removedIdList = [...blockInfo as string[]];
      removedBlockList.push(...this.blockList.filter(block => removedIdList.includes(block.id)));
    }

    this.initResultData(removeBlockList(this.blockList, removedBlockList));

    return this.positioning();
  }

  /**
   * text block를 제거하고 contents를 다음 text block으로 넘겨줍니다.
   * 새 배열 반환
   */
  public removeTextBlockInLIst(
    targetIndex: number,
    toHandOverIndex: number,
    innerHTML: string
  ): BlockService {
    if(this.blockList[toHandOverIndex] instanceof BaseTextBlock === false) {
      return this;
    }

    const block: BaseTextBlock = this.blockList[toHandOverIndex] as BaseTextBlock;

    const contents = BaseTextBlock.parseHtmlContents(innerHTML);
    const blockId = block.id;
    const newContents = mergeTextContents(block.contents.map(content => content.concat()) as BlockContentsText, contents);

    const preProps = block.updateBlock({
      contents: newContents
    });
  
    this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(blockId, 
      block.type,
      { contents: newContents }
    )));

    this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(blockId, block.type, preProps)));

    return this.removeBlockInList([this.blockList[targetIndex]]);
  }

  /**
   * block의 style type을 변경합니다.
   * 새 배열 반환
   */
  public changeBlockStyleType(blockInfo: string | number, styleType: string): BlockService {
    if(this.blockList.length < 1) return this;

    const blockIndex = typeof blockInfo === "number"?
      blockInfo 
      : this.blockList.findIndex(block => block.id === blockInfo);
    
    if(blockIndex === -1) return this;

    const blockList = this.blockList.concat();

    const [ newBlock, preProps ] = blockList[blockIndex].regeneration({
      styleType
    });

    blockList[blockIndex] = newBlock;

    this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(newBlock.id, 
      newBlock.type, 
      {
        styleType
      }
    )));
    this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(blockList[blockIndex].id, blockList[blockIndex].type, preProps)))
    this.blockList = blockList;

    return this;
  }

  public changeTextBlockStyle(
    index: number, 
    styleType: TextContentStyleType,
    startPoint: number,
    endPoint: number,
    order: OrderType
  ): BlockService {
    if(this.blockList.length < 1) return this;
    if(this.blockList[index] instanceof BaseTextBlock === false) return this;

    const TextBlock: BaseTextBlock = this.blockList[index] as BaseTextBlock;

    const contents = changeStyleTextContents(
        TextBlock.contents, 
        styleType, 
        startPoint, 
        endPoint, 
        order
      );

    const [ newTextBlock, preProps ] = TextBlock.regeneration({
      contents
    });

    const blockList = this.blockList.concat();
    blockList[index] = newTextBlock;

    this.initResultData({
      blockList,
      modifyBlockTokenList: [new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(newTextBlock.id, newTextBlock.type, {
        contents
      }))],
      historyBlockTokenList: [new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(TextBlock.id, TextBlock.type, preProps))]
    });

    return this;
  }

  /**
   * block의 type을 변경합니다.
   * 새 배열 반환
   */
  public changeBlockType(blockInfo: string | number, type: BlockType): BlockService {
    if(this.blockList.length < 1) return this;

    const blockIndex = typeof blockInfo === "number"?
      blockInfo 
      : this.blockList.findIndex(block => block.id === blockInfo);
    
    if(blockIndex === -1) return this;

    const result = changeBlockType(type, this.blockList[blockIndex]);

    if(!result) return this;

    const { block, modifyBlockToken, historyBlockToken } = result;

    const blockList = this.blockList.concat();
    blockList[blockIndex] = block;

    this.initResultData({
      blockList,
      modifyBlockTokenList: [modifyBlockToken],
      historyBlockTokenList: [historyBlockToken]
    })

    return this;
  }

  public changeBlockPosition(targetIdMap: BlockIdMap, targetId: string, previous: boolean) {
    const [ removedBlockList, targetBlockList ] = BlockService.divideBlock(this.blockList, targetIdMap);
    const previousindex = findBlockIndex(removedBlockList, targetId);

    if(previousindex === -1) return this;

    const targetIndex: number = previousindex + 1;
    const containerBlockList = removedBlockList.filter(block => block.type === BLOCK_CONTAINER);
    const newBlockList = [...removedBlockList];
    const previousBlock = removedBlockList[previousindex];

    const blockPosition: BlockPosition = previous? {
      previousId: previousBlock.id,
      parentId: previousBlock.parentId
    }: {
      previousId: null,
      parentId: previousBlock.id
    }
    
    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = BlockService.resetToTargetPosition(targetBlockList, blockPosition);

    this.historyBlockTokenList.push(...historyBlockTokenList);
    this.modifyBlockTokenList.push(...modifyBlockTokenList);

    newBlockList.splice(targetIndex, 0, ...blockList);

    if(containerBlockList[0]) {
      for(const block of containerBlockList) {
        const idx = newBlockList.findIndex(({ parentId }) => parentId === block.id);

        if(idx === -1) {
          this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setCreateModifyData(block.getBlockData())));
          this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setDeleteModifyData(block.id, block.type)));
          newBlockList.splice(idx, 1);
        }

      }
    }

    this.blockList = newBlockList;

    return this.positioning();
  }

  public switchBlockList(
    targetIdMap: BlockIdMap,
    targetId: string,
    previous: boolean,
    container: boolean = false
  ): BlockService {

    if(container) {
      const blockList = this.blockList.concat();
      const containerBlockData = ContainerBlock.createBlockData(previous
        ? { previousId: targetId }
        : { parentId: targetId }
      );
      
      if(!containerBlockData) return this;

      const containerBlock = new ContainerBlock(containerBlockData, null);

      const targetIndex = findBlockIndex(this.blockList, targetId);

      blockList.splice(targetIndex, 0, containerBlock);

      this.historyBlockTokenList.push(
        new HistoryBlockToken(
          HistoryBlockService
          .setDeleteModifyData(containerBlock.id, containerBlock.type)
      ));
      this.modifyBlockTokenList.push(
        new ModifyBlockToken(
          ModifyBlockService
          .setCreateModifyData(containerBlock.getRawBlockData())
      ));

      this.blockList = blockList;
    }

    return this.changeBlockPosition(targetIdMap, targetId, previous);
  }

  public updateBlockList(modifyBlockData: ModifyBlockData): BlockService {
    let blockList = this.blockList.concat();

    if(modifyBlockData.update) {
      for(const data of modifyBlockData.update) {
        const index = blockList.findIndex(block => block.id === data.id);
        
        if(index !== -1) {
          let preProps: UnionBlockDataProps = {}; 

          if(data.payload.type) {
            const result = changeBlockType(data.payload.type, blockList[index]);

            if(result) {
              const { block, historyBlockToken } = result;
              blockList[index] = block;
              this.historyBlockTokenList.push(historyBlockToken);
            }
          }

          preProps = Object.assign(preProps, blockList[index].updateBlock(data.payload));
   
          this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(data.id, data.type, preProps)));
        } else {
          this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setDeleteModifyData(data.id, data.type)));
        }
        
      }
    }

    if(modifyBlockData.delete) {

      const [ newBlockList, removedBlockList ] = BlockService.divideBlock(blockList, createBlockIdMap(modifyBlockData.delete));

      blockList = newBlockList;

      this.historyBlockTokenList.push(...removedBlockList.map(block => 
        new HistoryBlockToken(HistoryBlockService.setCreateModifyData(block.getBlockData()))
      ));
    }

    if(modifyBlockData.create) {
      const [ blockDataList, modifyBlockTokenList ] = BlockService.createBlockDataList(modifyBlockData.create.map(data => data.payload as RawBlockData<UnionBlockGenericType>));

      if(modifyBlockTokenList) {
        this.modifyBlockTokenList.push(...modifyBlockTokenList);
      }

      if(!blockDataList[0]) return this.sort().positioning();

      const toBeCreatedBlockList = BlockService.createBlockList(blockDataList);
      
      for(const block of toBeCreatedBlockList) {
        const index = blockList.findIndex(preBlock => preBlock.id === block.id);

        if(index === -1) {
          blockList.push(block);
          this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setDeleteModifyData(block.id, block.type)));
        } else {
          const preProps = blockList[index].updateBlock(block.getRawBlockData());
          this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(blockList[index].id, blockList[index].type, preProps)));
        }
      }

    }

    this.blockList = blockList;
    
    return this.sort().positioning();
  }

  public restoreBlockList(historyBlockData: HistoryBlockData): BlockService {
    let blockList = this.blockList.concat();

    if(historyBlockData.update) {
      for(const data of historyBlockData.update) {
        const index = blockList.findIndex(block => block.id === data.id);

        if(index !== -1) {
          let preProps: UnionBlockDataProps = {}; 

          if(data.payload.type) {
            const result = changeBlockType(data.payload.type, blockList[index]);

            if(result) {
              const { block, modifyBlockToken, historyBlockToken } = result;
              
              blockList[index] = block;

              this.historyBlockTokenList.push(historyBlockToken);
              this.modifyBlockTokenList.push(modifyBlockToken);
            }
          }

          preProps = Object.assign(preProps, blockList[index].updateBlock(data.payload));

          this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(data.id, blockList[index].type, data.payload)));
          this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(data.id, data.type, preProps)));
        }

      } 
    }
    
    if(historyBlockData.delete) {

      const [ newBlockList, removedBlockList ] = BlockService.divideBlock(blockList, createBlockIdMap(historyBlockData.delete));

      blockList = newBlockList;

      this.modifyBlockTokenList.push(...removedBlockList.map(block => 
        new ModifyBlockToken(ModifyBlockService.setDeleteModifyData(block.id, block.type))
      ));
      this.historyBlockTokenList.push(...removedBlockList.map(block => 
        new HistoryBlockToken(HistoryBlockService.setCreateModifyData(block.getBlockData()))
      ));
    }

    if(historyBlockData.create) {
      const [ blockDataList, modifyBlockTokenList ] = BlockService.createBlockDataList(historyBlockData.create.map(data => data.payload  as BlockData<UnionBlockGenericType>));
    
      if(modifyBlockTokenList) {
        this.modifyBlockTokenList.push(...modifyBlockTokenList);
      }

      if(!blockDataList[0]) return this.sort().positioning();

      const toBeCreatedBlockList = BlockService.createBlockList(blockDataList);

      for(const block of toBeCreatedBlockList) {
        const index = blockList.findIndex(preBlock => preBlock.id === block.id);

        if(index === -1) {
          blockList.push(block);
          this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setCreateModifyData(block.getRawBlockData())));
          this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setDeleteModifyData(block.id, block.type)));
        } else {
          const preProps = blockList[index].updateBlock(block.getRawBlockData());
          this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(blockList[index].id, blockList[index].type, preProps)));
          this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(block.id, block.type, block.getRawBlockData())));
        }
      }
    
    }

    this.blockList = blockList;

    return this.sort().positioning();
  }

}