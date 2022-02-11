import { UnionBlockGenericType, RawBlockData, RawBlockDataProps, UnionRawBlockData, BlockDataProps, BlockData, UnionBlockData } from "../../../entities/block/type";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { COMMAND_CREATE, COMMAND_DELETE, COMMAND_UPDATE, ModifyBlockGenericType, ModifyData, SET_BLOCK, UnionModifyBlockToken, UnionModifyDataToken } from "../../../entities/modify/type";
import { ModifyTokenService } from "../abstract/ModifyTokenService";
import { ModifyService } from "../ModifyService";
import { ModifyBlockDataGeneticType } from "../type";
import { compareFunction, compareFunctionReverce } from "../utils";
import { convertModifyBlockData, convertRawBlockData, pushModifyBlockToken } from "./utils";

export class ModifyBlockService implements ModifyTokenService<ModifyBlockToken> {
  private _tokenList: Array<ModifyBlockToken> = [];

  static setCreateModifyData<G extends UnionBlockGenericType = UnionBlockGenericType>(
    blockData: BlockData<G> | RawBlockData<G> | UnionBlockData | UnionRawBlockData
  ): ModifyData<ModifyBlockGenericType<G>> {
    return ModifyService.createModifyData<ModifyBlockGenericType<G>>(blockData.id, COMMAND_CREATE, SET_BLOCK, convertRawBlockData(blockData));
  }
  
  static setUpdateModifyData<G extends UnionBlockGenericType = UnionBlockGenericType>(
    blockId: string,
    blockDataProps: BlockDataProps<G> | RawBlockDataProps<G>
  ): ModifyData<ModifyBlockGenericType<G>> {
    return ModifyService.createModifyData(blockId, COMMAND_UPDATE, SET_BLOCK, convertRawBlockData(blockDataProps, true));
  }

  static setDeleteModifyData(blockId: string): ModifyData<ModifyBlockGenericType<any>> {
    return ModifyService.createModifyData(blockId, COMMAND_DELETE, SET_BLOCK, {});
  }

  private init(tokenList: Array<ModifyBlockToken>) {
    this._tokenList = tokenList;
  }

  constructor(tokenList: Array<ModifyBlockToken>, merge: boolean = false) {
    this.init(tokenList);
    if(merge) this.merge();
  }

  public sort(reverse: boolean = false) {
    if(!this._tokenList[0]) return this;
    
    this._tokenList.sort(!reverse? compareFunction : compareFunctionReverce)

    return this;
  }

  public merge(reverse: boolean = false) {
    if(!this._tokenList[0]) return this;

    const tokenList = pushModifyBlockToken([] as Array<ModifyBlockToken>, this._tokenList, reverse);
    
    if(tokenList[0]) this._tokenList = tokenList;

    return this;
  }


  public push(...newTokenList: Array<ModifyBlockToken>) {

    this._tokenList = pushModifyBlockToken(this._tokenList, newTokenList);

    return this;
  }

  public pushReverse(...newTokenList: Array<ModifyBlockToken>) {
    this._tokenList = pushModifyBlockToken(newTokenList, this._tokenList);

    return this;
  }

  public getTokenList() {
    return this._tokenList;
  }

  public getData() {
    return convertModifyBlockData<ModifyBlockDataGeneticType>(this._tokenList);
  }

}