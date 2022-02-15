import { UnionModifyDataToken } from "../../../entities/modify/type";
import { ModifyDataTokenServices, UnionModifyData } from "../type";

export abstract class ModifyTokenService<T extends UnionModifyDataToken = UnionModifyDataToken> {

  public abstract push: (...newTokenList: T[]) => this;

  public abstract merge: () => this;

  public abstract getTokenList: () => UnionModifyDataToken[];

  public abstract getData: () => UnionModifyData | null;

}