import { ModifyDataTokens } from "../../../entities/modify/type";
import { ModifyDataTokenServices } from "../type";

export abstract class ModifyTokenService<T extends ModifyDataTokens = ModifyDataTokens> {

  public abstract push: (...newTokenList: T[]) => this;

  public abstract merge: () => this;

  public abstract getData: () => ModifyDataTokens[];

  public abstract regeneration: () => ModifyDataTokenServices;

}