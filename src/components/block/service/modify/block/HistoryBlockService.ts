import { HistoryBlockToken } from "../../../entities/modify/block/HistoryBlockToken";
import { ModifyTokenService } from "../abstract/ModifyTokenService";
import { COMMAND_CREATE, COMMAND_DELETE, COMMAND_UPDATE, ModifyBlockGenericType, ModifyData, SET_BLOCK, UnionModifyDataToken } from "../../../entities/modify/type";
import { UnionBlockGenericType, RawBlockData, RawBlockDataProps, UnionRawBlockData, BlockDataProps, BlockData, UnionBlockData } from "../../../entities/block/type";
import { ModifyService } from "../ModifyService";
import { convertModifyBlockData, pushModifyBlockToken } from "./utils";
import { compareFunction, compareFunctionReverce } from "../utils";
import { HistoryBlockDataGeneticType } from "../type";

export class HistoryBlockService implements ModifyTokenService<HistoryBlockToken> {
  private _tokenList: HistoryBlockToken[] = [];

  static setCreateModifyData<G extends UnionBlockGenericType = UnionBlockGenericType>(
    blockData: BlockData<G> | RawBlockData<G> | UnionBlockData | UnionRawBlockData
  ): ModifyData<ModifyBlockGenericType<G>> {
    return ModifyService.createModifyData<ModifyBlockGenericType<G>>(blockData.id, COMMAND_CREATE, SET_BLOCK, blockData);
  }
  
  static setUpdateModifyData<G extends UnionBlockGenericType = UnionBlockGenericType>(
    blockId: string,
    blockDataProps: BlockDataProps<G> | RawBlockDataProps<G>
  ): ModifyData<ModifyBlockGenericType<G>> {
    return ModifyService.createModifyData(blockId, COMMAND_UPDATE, SET_BLOCK, blockDataProps);
  }

  static setDeleteModifyData(blockId: string): ModifyData<ModifyBlockGenericType<any>> {
    return ModifyService.createModifyData(blockId, COMMAND_DELETE, SET_BLOCK, {});
  }

  private init(tokenList: HistoryBlockToken[]) {
    this._tokenList = tokenList;
  }

  constructor(tokenList: HistoryBlockToken[], merge: boolean = false) {
    this.init(tokenList);
    if(merge) this.merge();
  }

  public sort(reverse: boolean = false) {
    if(!this._tokenList[0]) return this;

    this._tokenList.sort(!reverse? compareFunctionReverce : compareFunction);

    return this;
  }

  public merge(reverse: boolean = false) {
    if(!this._tokenList[0]) return this;

    const tokenList = pushModifyBlockToken([] as HistoryBlockToken[], this._tokenList, !reverse);

    if(tokenList[0]) this._tokenList = tokenList;

    return this;
  }

  public push(...newTokenList: HistoryBlockToken[]) {
    newTokenList.reverse();

    this._tokenList = pushModifyBlockToken(newTokenList, this._tokenList);

    return this;
  }

  public pushReverse(...newTokenList: HistoryBlockToken[]) {
    this._tokenList = pushModifyBlockToken(this._tokenList, newTokenList, true);
  }

  public getTokenList() {
    return this._tokenList;
  }

  public getData() {
    return convertModifyBlockData<HistoryBlockDataGeneticType>(this._tokenList, 8);
  }

}