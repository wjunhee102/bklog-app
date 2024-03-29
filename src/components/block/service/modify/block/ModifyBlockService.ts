import { UnionBlockGenericType, RawBlockData, RawBlockDataProps, UnionRawBlockData, BlockDataProps, BlockData, UnionBlockData, BlockType } from "../../../entities/block/type";
import { ModifyBlockToken } from "../../../entities/modify/block/ModifyBlockToken";
import { COMMAND_CREATE, COMMAND_DELETE, COMMAND_UPDATE, ModifyBlockGenericType, ModifyData, SET_BLOCK } from "../../../entities/modify/type";
import { ModifyTokenService } from "../abstract/ModifyTokenService";
import { ModifyService } from "../ModifyService";
import { ModifyBlockDataGenericType } from "../type";
import { compareFunction, compareFunctionReverce } from "../utils";
import { convertModifyBlockData, convertRawBlockData, pushModifyBlockToken } from "./utils";

export class ModifyBlockService implements ModifyTokenService<ModifyBlockToken> {
  private _tokenList: ModifyBlockToken[] = [];

  static setCreateModifyData<G extends UnionBlockGenericType = UnionBlockGenericType>(
    blockData: BlockData<G> | RawBlockData<G> | UnionBlockData | UnionRawBlockData
  ): ModifyData<ModifyBlockGenericType<G>> {
    return ModifyService.createModifyData<ModifyBlockGenericType<G>>(blockData.id, blockData.type, COMMAND_CREATE, SET_BLOCK, convertRawBlockData(blockData) as RawBlockData<G>);
  }
  
  static setUpdateModifyData<G extends UnionBlockGenericType = UnionBlockGenericType>(
    blockId: string,
    type: G["type"],
    blockDataProps: BlockDataProps<G> | RawBlockDataProps<G>
  ): ModifyData<ModifyBlockGenericType<G>> {
    return ModifyService.createModifyData(blockId, type, COMMAND_UPDATE, SET_BLOCK, convertRawBlockData(blockDataProps, true));
  }

  static setDeleteModifyData(blockId: string, type: BlockType): ModifyData<ModifyBlockGenericType<any>> {
    return ModifyService.createModifyData(blockId, type, COMMAND_DELETE, SET_BLOCK, {
      type
    });
  }

  private init(tokenList: ModifyBlockToken[]) {
    this._tokenList = tokenList;
  }

  constructor(tokenList: ModifyBlockToken[], merge: boolean = false) {
    this.init(tokenList);
    if(merge) this.merge();
  }

  public sort(reverse: boolean = false) {
    if(!this._tokenList[0]) return this;
    
    this._tokenList.sort(!reverse? compareFunction : compareFunctionReverce);

    return this;
  }

  public merge(reverse: boolean = false) {
    if(!this._tokenList[0]) return this;

    const tokenList = pushModifyBlockToken([] as ModifyBlockToken[], this._tokenList, reverse);
    
    if(tokenList[0]) this._tokenList = tokenList;

    return this;
  }


  public push(...newTokenList: ModifyBlockToken[]) {

    this._tokenList = pushModifyBlockToken(this._tokenList, newTokenList);

    return this;
  }

  public pushReverse(...newTokenList: ModifyBlockToken[]) {
    this._tokenList = pushModifyBlockToken(newTokenList, this._tokenList);

    return this;
  }

  public getTokenList() {
    return this._tokenList;
  }

  public getData() {
    return convertModifyBlockData<ModifyBlockDataGenericType>(this._tokenList);
  }

}