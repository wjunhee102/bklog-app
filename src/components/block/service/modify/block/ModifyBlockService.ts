import { ModifyBlockDataToken } from "../../../entities/modify/block/ModifyBlockData";
import { ModifyTokenService } from "../abstract/ModifyTokenService";
import { pushModifyBlockDataToken } from "./utils";

export class ModifyBlockService implements ModifyTokenService {
  private _tokenList: ModifyBlockDataToken[] = [];

  private init(tokenList: ModifyBlockDataToken[], merge: boolean = true) {
    this._tokenList = tokenList;
    if(merge) this.merge();
  }

  constructor(tokenList: ModifyBlockDataToken[]) {
    this.init(tokenList);
  }

  public merge() {
    if(!this._tokenList[0]) return this;

    const tokenList = pushModifyBlockDataToken([] as ModifyBlockDataToken[], this._tokenList);
    
    if(tokenList[0]) this._tokenList = tokenList;

    return this;
  }


  public push(...newTokenList: ModifyBlockDataToken[]) {
    
    this._tokenList = pushModifyBlockDataToken(this._tokenList, newTokenList);

    return this;
  }

  public getData() {
    return this._tokenList;
  }

  public regeneration() {
    return new ModifyBlockService(this._tokenList);
  }
}