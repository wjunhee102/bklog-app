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
import { sortBlock, checkInstanceOfBlock, createBlock, insertBlockList, orderingBlock, removeBlockList, resetToTargetPosition, updateBlockListStagedProperty, setPosition, changeBlockType, createBlockIdMap, BlockIdMap } from "./utils";

/**
 * TODO
 * -
 * 현재 position 방식으로 블럭의 위치를 정하는 방식에서 
 * 단방향 연결리스트로 변경해야 함.
 * 
 */
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
   * target position에 맞춰 position을 덥어씌웁니다.
   * 원본 배열에 반영
   */
  static resetToTargetPosition(
    blockList: UnionBlock[],
    targetPosition: string
  ): [ UnionBlock[], HistoryBlockToken[] ] {
    return resetToTargetPosition(blockList, targetPosition);
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
  static setPosition(
    prePosition: string,
    targetPosition: string = "0"
  ): string {
    return setPosition(prePosition, targetPosition);
  }

  constructor(private blockList: UnionBlock[]) {} 

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
   * position에 따라서 정렬합니다.
   * 원본 배열에 반영
   */
  public sort(): BlockService {
    this.blockList = sortBlock(this.blockList);
    return this;
  }

  /**
   * 현재 배열 순서에 따라 position과 index를 선언합니다.
   * 원본 배열에 반영
   */
  public ordering(): BlockService {
    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = orderingBlock(this.blockList);

    this.blockList = blockList;

    if(modifyBlockTokenList) {
      this.modifyBlockTokenList.push(...modifyBlockTokenList);
    }

    if(historyBlockTokenList) {
      this.historyBlockTokenList.push(...historyBlockTokenList);
    }

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

    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = updateBlockListStagedProperty(this.blockList, stageBlockDataList);

    this.blockList = blockList;

    if(modifyBlockTokenList) {
      this.modifyBlockTokenList.push(...modifyBlockTokenList);
    }

    if(historyBlockTokenList) {
      this.historyBlockTokenList.push(...historyBlockTokenList);
    }

    return this;
  }

  /**
   * 새 block을 추가합니다.
   * 새 배열 반환
   */
  public addBlockInList(
    blockList: UnionBlock[], 
    targetPosition: string, 
    keepCurrentBlockPosition: boolean = true
  ): BlockService {
    
    const [ targetBlockList ] = BlockService.resetToTargetPosition(blockList, targetPosition);

    this.modifyBlockTokenList.push(...targetBlockList.map(block => new ModifyBlockToken(ModifyBlockService.setCreateModifyData(block.getRawBlockData()))));

    const newBlockList = insertBlockList(
      this.blockList, 
      targetBlockList,
      targetPosition,
      keepCurrentBlockPosition
    );

    this.historyBlockTokenList.push(...targetBlockList.map(block => new HistoryBlockToken(HistoryBlockService.setDeleteModifyData(block.id, block.type))));

    this.blockList = newBlockList;

    this.ordering();

    return this;
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

    const {
      blockList,
      modifyBlockTokenList,
      historyBlockTokenList
    } = removeBlockList(this.blockList, removedBlockList);

    this.blockList = blockList;

    if(modifyBlockTokenList) {
      this.modifyBlockTokenList.push(...modifyBlockTokenList);
    }

    if(historyBlockTokenList) {
      this.historyBlockTokenList.push(...historyBlockTokenList);
    }

    return this.ordering();
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
    console.log(preProps, newContents);
    this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(blockId, 
      block.type ,
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

    this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(newTextBlock.id, newTextBlock.type, {
      contents
    })));
    this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(TextBlock.id, TextBlock.type, preProps)))
    this.blockList = blockList;

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

    this.blockList[blockIndex] = block;
    this.modifyBlockTokenList.push(modifyBlockToken);
    this.historyBlockTokenList.push(historyBlockToken);

    this.blockList = this.blockList.concat();

    return this;
  }

  public changeBlockPosition(targetIdMap: BlockIdMap, targetPosition: string) {
    const [ removedBlockList, targetBlockList ] = BlockService.divideBlock(this.blockList, targetIdMap);
    const index = removedBlockList.findIndex(block => block.position === targetPosition) + 1;

    if(index === 0) return this;

    const containerBlockList = removedBlockList.filter(block => block.type === BLOCK_CONTAINER);
    const setedPosition = BlockService.setPosition(targetPosition, "0");
    const newBlockList = [...removedBlockList];
    
    const [ blockList, historyBlockTokenList ] = BlockService.resetToTargetPosition(targetBlockList, setedPosition);

    this.historyBlockTokenList.push(...historyBlockTokenList);

    newBlockList.splice(index, 0, ...blockList);

    if(containerBlockList[0]) {
      for(const block of containerBlockList) {
        const idx = newBlockList.findIndex(({ id }) => id === block.id) + 1;

        if(!newBlockList[idx] || newBlockList[idx].position.indexOf(block.position) !== 0) {
          this.historyBlockTokenList.push(new HistoryBlockToken(HistoryBlockService.setCreateModifyData(block.getBlockData())));
          this.modifyBlockTokenList.push(new ModifyBlockToken(ModifyBlockService.setDeleteModifyData(block.id, block.type)));
          newBlockList.splice(idx, 1);
        }

      }
    }

    this.blockList = newBlockList;

    return this.ordering();
  }

  public switchBlockList(
    targetIdMap: BlockIdMap,
    targetPosition: string,
    container: boolean = false
  ): BlockService {
    let position: string = targetPosition;

    if(container) {
      const blockList = this.blockList.concat();
      const containerBlockData = ContainerBlock.createBlockData({ position: targetPosition });
      
      if(!containerBlockData) return this;

      const containerBlock = new ContainerBlock(containerBlockData, null);

      const targetIndex = this.blockList.findIndex(block => block.position === targetPosition);

      blockList.splice(targetIndex, 0, containerBlock);

      position = targetPosition.split(/-/).concat('1').join('-');
      const preProps = blockList[targetIndex + 1].updateBlock({ position });

      this.historyBlockTokenList.push(
        new HistoryBlockToken(HistoryBlockService.setDeleteModifyData(containerBlock.id, containerBlock.type)),
        new HistoryBlockToken(HistoryBlockService.setUpdateModifyData(blockList[targetIndex + 1].id, blockList[targetIndex + 1].type, preProps))
      );
      this.modifyBlockTokenList.push(
        new ModifyBlockToken(ModifyBlockService.setCreateModifyData(containerBlock.getRawBlockData())),
        new ModifyBlockToken(ModifyBlockService.setUpdateModifyData(blockList[targetIndex + 1].id, blockList[targetIndex + 1].type, { position }))
      );

      this.blockList = blockList;
    }

    return this.changeBlockPosition(targetIdMap, targetPosition);
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

      if(!blockDataList[0]) return this.sort().ordering();

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
    
    return this.sort().ordering();
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

      if(!blockDataList[0]) return this.sort().ordering();

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

    return this.sort().ordering();
  }

}