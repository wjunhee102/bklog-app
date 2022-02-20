import { ModifyPageDataToken } from "../../../entities/modify/page/ ModifyPageDataToken";
import { COMMAND_UPDATE, ModifyData, ModifyPageGenericType, PageInfoProps, SET_PAGE } from "../../../entities/modify/type";
import { ModifyTokenService } from "../abstract/ModifyTokenService";
import { ModifyService } from "../ModifyService";
import { pushModifyDataToken } from "../utils";

export class ModifyPageService implements ModifyTokenService<ModifyPageDataToken> {
  private _tokenList: ModifyPageDataToken[] = [];

  private init(tokenList: ModifyPageDataToken[]) {
    this._tokenList = tokenList;
  }

  static setUpdateModifyData(pageInfoProps: PageInfoProps): ModifyData<ModifyPageGenericType> {
    return ModifyService.createModifyData("page", COMMAND_UPDATE, SET_PAGE, pageInfoProps);
  }

  constructor(tokenList: ModifyPageDataToken[], merge: boolean = false) {
    this.init(tokenList);
    if(merge) this.merge();
  }

  public merge() {
    if(!this._tokenList[0]) return this;

    const tokenList = pushModifyDataToken<ModifyPageDataToken>([] as ModifyPageDataToken[], this._tokenList);

    if(tokenList[0]) this._tokenList = tokenList;

    return this;
  }

  public push(...newTokenList: ModifyPageDataToken[]) {

    this._tokenList = pushModifyDataToken<ModifyPageDataToken>([] as ModifyPageDataToken[], newTokenList);

    return this;
  }

  public getTokenList() {
    return this._tokenList;
  }

  public regeneration() {
    return new ModifyPageService(this._tokenList);
  }

  public getData(): PageInfoProps | null {
    if(!this._tokenList[0]) return null;

    return this._tokenList[0].getData().payload;
  }
}